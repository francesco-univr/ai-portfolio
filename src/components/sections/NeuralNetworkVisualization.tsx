import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const NeuralNetworkModel = () => {
  const modelRef = useRef<THREE.Group>(null);
  
  // Simulazione di un modello di rete neurale con sfere e connessioni
  type Node = { id: number; position: [number, number, number] };
  type Edge = { source: number; target: number };

  const { nodes, edges } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    const layers = [4, 8, 8, 4]; // Struttura della rete: input, hidden, hidden, output
    const layerDistance = 2;
    
    // Creazione dei nodi
    let nodeId = 0;
    layers.forEach((nodeCount, layerIndex) => {
      const layerX = layerIndex * layerDistance - (layers.length - 1) * layerDistance / 2;
      for (let i = 0; i < nodeCount; i++) {
        const y = i * 1.2 - (nodeCount - 1) * 0.6;
        nodes.push({ id: nodeId++, position: [layerX, y, 0] });
      }
    });
    
    // Creazione delle connessioni tra i nodi
    let startNode = 0;
    for (let layer = 0; layer < layers.length - 1; layer++) {
      for (let i = 0; i < layers[layer]; i++) {
        const sourceId = startNode + i;
        for (let j = 0; j < layers[layer + 1]; j++) {
          const targetId = startNode + layers[layer] + j;
          edges.push({ source: sourceId, target: targetId });
        }
      }
      startNode += layers[layer];
    }
    
    return { nodes, edges };
  }, []);
  
  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.002;
    }
  });
  
  return (
    <group ref={modelRef}>
      {/* Nodi */}
      {nodes.map((node) => (
        <mesh key={node.id} position={node.position}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial 
            color="#9D4EDD" 
            emissive="#9D4EDD" 
            emissiveIntensity={0.4}
            metalness={0.3}
            roughness={0.4}
          />
        </mesh>
      ))}
      
      {/* Connessioni usando Line da drei */}
      {edges.map((edge, idx) => {
        const sourcePos = nodes[edge.source].position;
        const targetPos = nodes[edge.target].position;
        
        return (
          <Line
            key={idx}
            points={[sourcePos, targetPos]}
            color="#4CC9F0"
            lineWidth={2}
            transparent={true}
            opacity={0.6}
          />
        );
      })}
    </group>
  );
};

const NeuralNetworkVisualization: React.FC = () => {
  return (
    <section id="neural-network" className="section relative py-24">
      <div className="absolute inset-0 bg-gradient-radial from-deep-blue/20 to-cyber-black opacity-50" />
      
      <div className="mb-16 text-center relative z-10">
        <motion.h2 
          className="gradient-text mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Visualizzazione Rete Neurale
        </motion.h2>
        <motion.p 
          className="subtitle max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Esplora il modello 3D interattivo di una rete neurale
        </motion.p>
      </div>
      
      <div className="glass rounded-lg overflow-hidden h-[500px] relative z-10">
        <Canvas 
          camera={{ position: [0, 0, 10], fov: 50 }}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
          }}
        >
          <ambientLight intensity={0.5} />
          <spotLight 
            position={[10, 10, 10]} 
            angle={0.15} 
            penumbra={1} 
            intensity={1} 
            castShadow 
          />
          <NeuralNetworkModel />
          <OrbitControls 
            enablePan={false}
            enableDamping={true}
            dampingFactor={0.05}
            minDistance={5}
            maxDistance={15}
          />
          <Environment preset="city" />
        </Canvas>
        
        <div className="absolute bottom-4 left-4 glass p-3 rounded-md text-sm">
          <p className="text-cyber-green font-mono">Interagisci con il modello:</p>
          <ul className="text-gray-300 mt-2 space-y-1">
            <li>• Ruota: Trascina con il mouse</li>
            <li>• Zoom: Scorri con la rotellina</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default NeuralNetworkVisualization;
