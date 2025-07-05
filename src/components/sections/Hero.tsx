import React, { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const NeuralParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 2000;
  
  const { positions, basePositions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const basePositions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    // Generate random positions and colors for particles
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = (Math.random() - 0.5) * 5;
      const y = (Math.random() - 0.5) * 5;
      const z = (Math.random() - 0.5) * 5;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      basePositions[i3] = x;
      basePositions[i3 + 1] = y;
      basePositions[i3 + 2] = z;
      
      colors[i3] = Math.random() * 0.3 + 0.7; // R: purple-blue
      colors[i3 + 1] = Math.random() * 0.2; // G: low
      colors[i3 + 2] = Math.random() * 0.5 + 0.5; // B: high
    }
    
    return { positions, basePositions, colors };
  }, [count]);
  
  useFrame(({ clock }: { clock: THREE.Clock }) => {
    if (!particlesRef.current) return;
    
    const time = clock.getElapsedTime();
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const bx = basePositions[i3];
      const by = basePositions[i3 + 1];

      positions[i3]     = bx + Math.cos(time + bx * 2) * 0.2;
      positions[i3 + 1] = by + Math.sin(time + by * 2) * 0.2;
      // z remains constant for subtle depth
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
          usage={THREE.DynamicDrawUsage}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

const AnimatedSphere: React.FC = () => {
  const sphereRef = useRef<THREE.Mesh>(null);

  // gentle rotation
  useFrame(({ clock }: { clock: THREE.Clock }) => {
    if (sphereRef.current) {
      const t = clock.getElapsedTime();
      sphereRef.current.rotation.y = t * 0.4;
      sphereRef.current.rotation.x = Math.sin(t * 0.2) * 0.2;
    }
  });

  return (
    <Sphere ref={sphereRef} args={[1, 100, 100]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color="#9D4EDD"
        attach="material"
        distort={0.45}
        speed={2.5}
        roughness={0.25}
        metalness={0.75}
      />
    </Sphere>
  );
};

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-deep-blue to-cyber-black z-0" />
      
      {/* 3D Neural Network Background */}
      <div className="absolute inset-0 z-10">
        <Canvas 
          camera={{ position: [0, 0, 5], fov: 75 }}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
          }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <NeuralParticles />
          <AnimatedSphere />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            enableRotate={true} 
            autoRotate 
            autoRotateSpeed={0.5}
            enableDamping={true}
            dampingFactor={0.05}
          />
        </Canvas>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-20 relative">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h4 className="text-cyber-green font-mono mb-2">Intelligenza Artificiale & Ricerca Avanzata</h4>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="gradient-text mb-6">
              Esplorando i confini dell'intelligenza artificiale
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="subtitle mb-8">
              Ricercatore specializzato in deep learning, computer vision e sistemi di intelligenza artificiale avanzati. 
              Sviluppo soluzioni innovative per affrontare le sfide più complesse del nostro tempo.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <motion.button
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Esplora Progetti
            </motion.button>
            
            <motion.button
              className="btn btn-outline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contattami
            </motion.button>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5L12 19M12 19L19 12M12 19L5 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;
