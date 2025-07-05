import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import * as d3 from 'd3';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface ResearchNode {
  id: string;
  type: 'publication' | 'project' | 'collaborator' | 'institution' | 'concept';
  title: string;
  year: number;
  citations: number;
  impact_score: number;
  connections: string[];
  position: [number, number, number];
  velocity: [number, number, number];
  metadata: {
    authors?: string[];
    venue?: string;
    keywords?: string[];
    abstract?: string;
    url?: string;
    doi?: string;
  };
  color: string;
  size: number;
  cluster_id?: number;
}

interface ResearchEdge {
  source: string;
  target: string;
  weight: number;
  type: 'citation' | 'collaboration' | 'conceptual' | 'temporal';
  metadata?: {
    strength?: number;
    date?: Date;
    context?: string;
  };
}

interface GraphLayout {
  algorithm: 'force-directed' | 'hierarchical' | 'circular' | 'grid';
  physics: {
    charge: number;
    linkDistance: number;
    gravity: number;
    damping: number;
  };
  clustering: {
    enabled: boolean;
    method: 'louvain' | 'leiden' | 'modularity';
    resolution: number;
  };
}

interface FilterState {
  yearRange: [number, number];
  minCitations: number;
  nodeTypes: Set<string>;
  keywords: string[];
  searchTerm: string;
}

// ============================================================================
// GRAPH PHYSICS ENGINE
// ============================================================================

class GraphPhysicsEngine {
  private nodes: Map<string, ResearchNode> = new Map();
  private edges: ResearchEdge[] = [];
  private simulation: d3.Simulation<ResearchNode, ResearchEdge>;
  private layout: GraphLayout;

  constructor(layout: GraphLayout) {
    this.layout = layout;
    this.simulation = d3.forceSimulation<ResearchNode>()
      .force('link', d3.forceLink<ResearchNode, ResearchEdge>()
        .id(d => d.id)
        .distance(layout.physics.linkDistance)
        .strength(0.1)
      )
      .force('charge', d3.forceManyBody()
        .strength(layout.physics.charge)
        .distanceMax(200)
      )
      .force('center', d3.forceCenter(0, 0, 0))
      .force('collision', d3.forceCollide()
        .radius(d => d.size * 2)
        .strength(0.7)
      )
      .alphaDecay(0.0228)
      .velocityDecay(layout.physics.damping);
  }

  updateNodes(nodes: ResearchNode[]) {
    this.nodes.clear();
    nodes.forEach(node => {
      if (!node.position) {
        node.position = [
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100
        ];
      }
      if (!node.velocity) {
        node.velocity = [0, 0, 0];
      }
      this.nodes.set(node.id, node);
    });

    this.simulation.nodes(Array.from(this.nodes.values()));
  }

  updateEdges(edges: ResearchEdge[]) {
    this.edges = edges;
    const linkForce = this.simulation.force('link') as d3.ForceLink<ResearchNode, ResearchEdge>;
    linkForce.links(edges);
  }

  start() {
    this.simulation.restart();
  }

  stop() {
    this.simulation.stop();
  }

  tick(): ResearchNode[] {
    this.simulation.tick();
    return Array.from(this.nodes.values());
  }

  // Community detection using Louvain algorithm
  detectCommunities(): Map<string, number> {
    const communities = new Map<string, number>();
    const nodeArray = Array.from(this.nodes.values());
    
    // Simplified community detection - in production, use proper Louvain implementation
    const numCommunities = Math.ceil(Math.sqrt(nodeArray.length));
    nodeArray.forEach((node, index) => {
      communities.set(node.id, index % numCommunities);
    });

    return communities;
  }
}

// ============================================================================
// 3D NODE COMPONENT
// ============================================================================

interface Node3DProps {
  node: ResearchNode;
  isSelected: boolean;
  isHovered: boolean;
  onClick: (node: ResearchNode) => void;
  onHover: (node: ResearchNode | null) => void;
}

const Node3D: React.FC<Node3DProps> = ({ node, isSelected, isHovered, onClick, onHover }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Update position from physics simulation
      meshRef.current.position.set(...node.position);
      
      // Animate hover and selection effects
      const targetScale = isSelected ? 1.5 : isHovered ? 1.2 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      
      // Gentle floating animation
      const time = state.clock.getElapsedTime();
      meshRef.current.position.y += Math.sin(time * 2 + node.position[0]) * 0.01;
    }
  });

  const getNodeGeometry = () => {
    switch (node.type) {
      case 'publication':
        return <sphereGeometry args={[node.size, 16, 16]} />;
      case 'project':
        return <boxGeometry args={[node.size * 2, node.size * 2, node.size * 2]} />;
      case 'collaborator':
        return <octahedronGeometry args={[node.size]} />;
      case 'institution':
        return <cylinderGeometry args={[node.size, node.size, node.size * 2]} />;
      case 'concept':
        return <tetrahedronGeometry args={[node.size]} />;
      default:
        return <sphereGeometry args={[node.size, 8, 8]} />;
    }
  };

  const getNodeMaterial = () => {
    const baseColor = node.color;
    const emissiveIntensity = isSelected ? 0.5 : isHovered ? 0.3 : 0.1;
    
    return (
      <meshStandardMaterial
        color={baseColor}
        emissive={baseColor}
        emissiveIntensity={emissiveIntensity}
        metalness={0.6}
        roughness={0.4}
        transparent={true}
        opacity={0.9}
      />
    );
  };

  return (
    <group>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick(node);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          onHover(node);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          onHover(null);
          document.body.style.cursor = 'auto';
        }}
      >
        {getNodeGeometry()}
        {getNodeMaterial()}
      </mesh>
      
      {/* Node label */}
      {(isSelected || isHovered) && (
        <Html position={[node.position[0], node.position[1] + node.size * 2, node.position[2]]}>
          <div className="bg-black bg-opacity-75 text-white p-2 rounded text-xs max-w-48">
            <div className="font-semibold">{node.title}</div>
            <div className="text-gray-300">{node.year} • {node.citations} citations</div>
          </div>
        </Html>
      )}
    </group>
  );
};

// ============================================================================
// 3D EDGE COMPONENT
// ============================================================================

interface Edge3DProps {
  edge: ResearchEdge;
  nodes: Map<string, ResearchNode>;
}

const Edge3D: React.FC<Edge3DProps> = ({ edge, nodes }) => {
  const lineRef = useRef<THREE.Line>(null);
  
  const sourceNode = nodes.get(edge.source);
  const targetNode = nodes.get(edge.target);
  
  if (!sourceNode || !targetNode) return null;

  const points = [
    new THREE.Vector3(...sourceNode.position),
    new THREE.Vector3(...targetNode.position)
  ];

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  
  const getEdgeColor = () => {
    switch (edge.type) {
      case 'citation': return '#4CC9F0';
      case 'collaboration': return '#9D4EDD';
      case 'conceptual': return '#00F5D4';
      case 'temporal': return '#FFB700';
      default: return '#ffffff';
    }
  };

  useFrame(() => {
    if (lineRef.current && sourceNode && targetNode) {
      const positions = lineRef.current.geometry.attributes.position.array as Float32Array;
      positions[0] = sourceNode.position[0];
      positions[1] = sourceNode.position[1];
      positions[2] = sourceNode.position[2];
      positions[3] = targetNode.position[0];
      positions[4] = targetNode.position[1];
      positions[5] = targetNode.position[2];
      lineRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <line ref={lineRef} geometry={geometry}>
      <lineBasicMaterial 
        color={getEdgeColor()} 
        transparent={true} 
        opacity={0.6}
        linewidth={edge.weight * 2}
      />
    </line>
  );
};

// ============================================================================
// FILTER CONTROLS
// ============================================================================

interface FilterControlsProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  availableYears: [number, number];
  nodeTypes: string[];
}

const FilterControls: React.FC<FilterControlsProps> = ({
  filters,
  onFiltersChange,
  availableYears,
  nodeTypes
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      className="absolute top-4 left-4 bg-black bg-opacity-75 backdrop-blur p-4 rounded-lg text-white min-w-64 z-10"
    >
      <h3 className="text-lg font-semibold mb-4 text-cyber-green">Graph Filters</h3>
      
      {/* Search */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Search</label>
        <input
          type="text"
          value={filters.searchTerm}
          onChange={(e) => onFiltersChange({ ...filters, searchTerm: e.target.value })}
          className="w-full p-2 bg-gray-800 rounded text-white text-sm"
          placeholder="Search titles, authors..."
        />
      </div>

      {/* Year Range */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Year Range</label>
        <div className="flex gap-2">
          <input
            type="number"
            value={filters.yearRange[0]}
            onChange={(e) => onFiltersChange({
              ...filters,
              yearRange: [parseInt(e.target.value), filters.yearRange[1]]
            })}
            min={availableYears[0]}
            max={availableYears[1]}
            className="w-full p-2 bg-gray-800 rounded text-white text-sm"
          />
          <input
            type="number"
            value={filters.yearRange[1]}
            onChange={(e) => onFiltersChange({
              ...filters,
              yearRange: [filters.yearRange[0], parseInt(e.target.value)]
            })}
            min={availableYears[0]}
            max={availableYears[1]}
            className="w-full p-2 bg-gray-800 rounded text-white text-sm"
          />
        </div>
      </div>

      {/* Citations Threshold */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Min Citations: {filters.minCitations}
        </label>
        <input
          type="range"
          value={filters.minCitations}
          onChange={(e) => onFiltersChange({
            ...filters,
            minCitations: parseInt(e.target.value)
          })}
          min={0}
          max={1000}
          className="w-full"
        />
      </div>

      {/* Node Types */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Node Types</label>
        <div className="space-y-2">
          {nodeTypes.map(type => (
            <label key={type} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.nodeTypes.has(type)}
                onChange={(e) => {
                  const newTypes = new Set(filters.nodeTypes);
                  if (e.target.checked) {
                    newTypes.add(type);
                  } else {
                    newTypes.delete(type);
                  }
                  onFiltersChange({ ...filters, nodeTypes: newTypes });
                }}
                className="mr-2"
              />
              <span className="text-sm capitalize">{type}</span>
            </label>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================================
// NODE DETAILS PANEL
// ============================================================================

interface NodeDetailsPanelProps {
  node: ResearchNode | null;
  onClose: () => void;
}

const NodeDetailsPanel: React.FC<NodeDetailsPanelProps> = ({ node, onClose }) => {
  if (!node) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="absolute top-4 right-4 bg-black bg-opacity-90 backdrop-blur p-6 rounded-lg text-white max-w-md z-10"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-cyber-green">Node Details</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white"
        >
          ×
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <span className="text-sm font-medium text-gray-300">Title:</span>
          <p className="text-white">{node.title}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-sm font-medium text-gray-300">Type:</span>
            <p className="text-white capitalize">{node.type}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-300">Year:</span>
            <p className="text-white">{node.year}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-sm font-medium text-gray-300">Citations:</span>
            <p className="text-white">{node.citations}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-300">Impact Score:</span>
            <p className="text-white">{node.impact_score.toFixed(2)}</p>
          </div>
        </div>

        {node.metadata.authors && (
          <div>
            <span className="text-sm font-medium text-gray-300">Authors:</span>
            <p className="text-white text-sm">{node.metadata.authors.join(', ')}</p>
          </div>
        )}

        {node.metadata.keywords && (
          <div>
            <span className="text-sm font-medium text-gray-300">Keywords:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {node.metadata.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-electric-purple text-xs rounded"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}

        {node.metadata.abstract && (
          <div>
            <span className="text-sm font-medium text-gray-300">Abstract:</span>
            <p className="text-white text-sm mt-1 max-h-32 overflow-y-auto">
              {node.metadata.abstract}
            </p>
          </div>
        )}

        {node.metadata.url && (
          <div>
            <a
              href={node.metadata.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-electric-purple hover:bg-neon-purple rounded text-sm transition-colors"
            >
              View Publication
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const ResearchGraphNetwork3D: React.FC = () => {
  const [nodes, setNodes] = useState<ResearchNode[]>([]);
  const [edges, setEdges] = useState<ResearchEdge[]>([]);
  const [selectedNode, setSelectedNode] = useState<ResearchNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<ResearchNode | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [filters, setFilters] = useState<FilterState>({
    yearRange: [2020, 2025],
    minCitations: 0,
    nodeTypes: new Set(['publication', 'project', 'collaborator']),
    keywords: [],
    searchTerm: ''
  });

  const physicsEngine = useRef<GraphPhysicsEngine>();
  const animationRef = useRef<number>();

  const layout: GraphLayout = {
    algorithm: 'force-directed',
    physics: {
      charge: -300,
      linkDistance: 50,
      gravity: 0.1,
      damping: 0.9
    },
    clustering: {
      enabled: true,
      method: 'louvain',
      resolution: 1.0
    }
  };

  // Initialize physics engine
  useEffect(() => {
    physicsEngine.current = new GraphPhysicsEngine(layout);
    
    // Load initial data
    loadResearchData();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Mock data loader - in production, replace with real API calls
  const loadResearchData = async () => {
    try {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock research data
      const mockNodes: ResearchNode[] = [
        {
          id: 'pub-1',
          type: 'publication',
          title: 'Deep Learning for Medical Image Analysis',
          year: 2023,
          citations: 45,
          impact_score: 8.5,
          connections: ['pub-2', 'collab-1'],
          position: [0, 0, 0],
          velocity: [0, 0, 0],
          metadata: {
            authors: ['Dr. Smith', 'You'],
            venue: 'Nature Medicine',
            keywords: ['deep learning', 'medical imaging', 'CNN'],
            abstract: 'A comprehensive study on applying deep learning techniques to medical image analysis...'
          },
          color: '#9D4EDD',
          size: 3
        },
        {
          id: 'pub-2',
          type: 'publication',
          title: 'AI Ethics in Healthcare',
          year: 2023,
          citations: 78,
          impact_score: 9.2,
          connections: ['pub-1', 'concept-1'],
          position: [0, 0, 0],
          velocity: [0, 0, 0],
          metadata: {
            authors: ['You', 'Dr. Johnson'],
            venue: 'AI Ethics Journal',
            keywords: ['AI ethics', 'healthcare', 'bias'],
            abstract: 'Exploring ethical considerations in AI-powered healthcare systems...'
          },
          color: '#4CC9F0',
          size: 4
        },
        {
          id: 'collab-1',
          type: 'collaborator',
          title: 'Dr. Sarah Smith',
          year: 2023,
          citations: 0,
          impact_score: 7.8,
          connections: ['pub-1', 'inst-1'],
          position: [0, 0, 0],
          velocity: [0, 0, 0],
          metadata: {
            keywords: ['medical imaging', 'machine learning']
          },
          color: '#00F5D4',
          size: 2.5
        },
        {
          id: 'inst-1',
          type: 'institution',
          title: 'Stanford Medical School',
          year: 2023,
          citations: 0,
          impact_score: 9.5,
          connections: ['collab-1'],
          position: [0, 0, 0],
          velocity: [0, 0, 0],
          metadata: {},
          color: '#FFB700',
          size: 3.5
        },
        {
          id: 'concept-1',
          type: 'concept',
          title: 'Explainable AI',
          year: 2023,
          citations: 0,
          impact_score: 8.0,
          connections: ['pub-2'],
          position: [0, 0, 0],
          velocity: [0, 0, 0],
          metadata: {
            keywords: ['explainability', 'interpretability', 'transparency']
          },
          color: '#FF6B6B',
          size: 2
        }
      ];

      const mockEdges: ResearchEdge[] = [
        {
          source: 'pub-1',
          target: 'pub-2',
          weight: 0.8,
          type: 'citation',
          metadata: { strength: 0.8 }
        },
        {
          source: 'pub-1',
          target: 'collab-1',
          weight: 0.9,
          type: 'collaboration',
          metadata: { strength: 0.9 }
        },
        {
          source: 'collab-1',
          target: 'inst-1',
          weight: 0.7,
          type: 'collaboration',
          metadata: { strength: 0.7 }
        },
        {
          source: 'pub-2',
          target: 'concept-1',
          weight: 0.6,
          type: 'conceptual',
          metadata: { strength: 0.6 }
        }
      ];

      setNodes(mockNodes);
      setEdges(mockEdges);
      
      // Update physics engine
      if (physicsEngine.current) {
        physicsEngine.current.updateNodes(mockNodes);
        physicsEngine.current.updateEdges(mockEdges);
        physicsEngine.current.start();
        
        // Start animation loop
        const animate = () => {
          const updatedNodes = physicsEngine.current!.tick();
          setNodes([...updatedNodes]);
          animationRef.current = requestAnimationFrame(animate);
        };
        animate();
      }
      
    } catch (err) {
      setError('Failed to load research data');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter nodes based on current filters
  const filteredNodes = useMemo(() => {
    return nodes.filter(node => {
      if (!filters.nodeTypes.has(node.type)) return false;
      if (node.year < filters.yearRange[0] || node.year > filters.yearRange[1]) return false;
      if (node.citations < filters.minCitations) return false;
      if (filters.searchTerm && !node.title.toLowerCase().includes(filters.searchTerm.toLowerCase())) return false;
      return true;
    });
  }, [nodes, filters]);

  const availableYears: [number, number] = useMemo(() => {
    if (nodes.length === 0) return [2020, 2025];
    const years = nodes.map(n => n.year);
    return [Math.min(...years), Math.max(...years)];
  }, [nodes]);

  const nodeTypes = useMemo(() => {
    return Array.from(new Set(nodes.map(n => n.type)));
  }, [nodes]);

  const nodesMap = useMemo(() => {
    const map = new Map<string, ResearchNode>();
    filteredNodes.forEach(node => map.set(node.id, node));
    return map;
  }, [filteredNodes]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-cyber-black text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-electric-purple mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold">Loading Research Graph...</h2>
          <p className="text-gray-400">Analyzing publications and collaborations</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-cyber-black text-white">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-400">Error Loading Graph</h2>
          <p className="text-gray-400 mt-2">{error}</p>
          <button
            onClick={loadResearchData}
            className="mt-4 px-6 py-2 bg-electric-purple hover:bg-neon-purple rounded transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-cyber-black to-deep-blue overflow-hidden">
      {/* Filter Controls */}
      <FilterControls
        filters={filters}
        onFiltersChange={setFilters}
        availableYears={availableYears}
        nodeTypes={nodeTypes}
      />

      {/* Node Details Panel */}
      <AnimatePresence>
        {selectedNode && (
          <NodeDetailsPanel
            node={selectedNode}
            onClose={() => setSelectedNode(null)}
          />
        )}
      </AnimatePresence>

      {/* Stats Panel */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-4 left-4 bg-black bg-opacity-75 backdrop-blur p-4 rounded-lg text-white z-10"
      >
        <h3 className="text-sm font-semibold mb-2 text-cyber-green">Graph Statistics</h3>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-gray-300">Nodes:</span>
            <span className="ml-2 text-white">{filteredNodes.length}</span>
          </div>
          <div>
            <span className="text-gray-300">Edges:</span>
            <span className="ml-2 text-white">{edges.length}</span>
          </div>
          <div>
            <span className="text-gray-300">Total Citations:</span>
            <span className="ml-2 text-white">{nodes.reduce((sum, n) => sum + n.citations, 0)}</span>
          </div>
          <div>
            <span className="text-gray-300">Avg Impact:</span>
            <span className="ml-2 text-white">
              {(nodes.reduce((sum, n) => sum + n.impact_score, 0) / nodes.length).toFixed(1)}
            </span>
          </div>
        </div>
      </motion.div>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 100], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          zoomSpeed={0.6}
          panSpeed={0.8}
          rotateSpeed={0.4}
        />

        {/* Render Nodes */}
        {filteredNodes.map(node => (
          <Node3D
            key={node.id}
            node={node}
            isSelected={selectedNode?.id === node.id}
            isHovered={hoveredNode?.id === node.id}
            onClick={setSelectedNode}
            onHover={setHoveredNode}
          />
        ))}

        {/* Render Edges */}
        {edges.map((edge, index) => (
          <Edge3D
            key={`${edge.source}-${edge.target}-${index}`}
            edge={edge}
            nodes={nodesMap}
          />
        ))}
      </Canvas>
    </div>
  );
};