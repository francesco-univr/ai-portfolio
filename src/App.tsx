import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Layout Components
import Header from './components/layout/Header';

// Original Portfolio Components
import Hero from './components/sections/Hero';
import NeuralNetworkVisualization from './components/sections/NeuralNetworkVisualization';
import Timeline from './components/sections/Timeline';
import Projects from './components/sections/Projects';
import ResearchStats from './components/sections/ResearchStats';
import Contact from './components/sections/Contact';

// Enterprise Components
import { ResearchGraphNetwork3D } from './components/enterprise/ResearchGraphNetwork3D';

// Styles
import './App.css';

type ViewMode = 'portfolio' | 'enterprise';

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('portfolio');

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'portfolio' ? 'enterprise' : 'portfolio');
  };

  // Portfolio View
  const PortfolioView = () => (
    <div className="min-h-screen bg-cyber-black" style={{ height: 'auto', overflow: 'visible' }}>
      <Header />
      <main>
        <Hero />
        <NeuralNetworkVisualization />
        <Timeline />
        <Projects />
        <ResearchStats />
        <Contact />
      </main>
    </div>
  );

  // Enterprise View
  const EnterpriseView = () => (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <ResearchGraphNetwork3D />
    </div>
  );

  return (
    <div className="relative min-h-screen bg-cyber-black">
      {/* Mode Toggle Button */}
      <motion.div
        className="fixed top-4 right-4 z-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.button
          onClick={toggleViewMode}
          className="glass p-3 rounded-lg text-white font-medium shadow-lg border border-electric-purple/30 hover:border-electric-purple/60 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'rgba(26, 26, 46, 0.8)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <div className="flex items-center gap-2">
            {viewMode === 'portfolio' ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span>Enterprise Mode</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Portfolio Mode</span>
              </>
            )}
          </div>
        </motion.button>
      </motion.div>

      {/* Mode Indicator */}
      <motion.div
        className="fixed bottom-4 left-4 z-40"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <div 
          className="glass p-3 rounded-lg"
          style={{
            background: 'rgba(26, 26, 46, 0.8)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <div className="flex items-center gap-3">
            <div 
              className={`w-3 h-3 rounded-full`}
              style={{
                backgroundColor: viewMode === 'portfolio' ? '#00f5d4' : '#8b5cf6'
              }}
            />
            <span className="text-white text-sm font-medium">
              {viewMode === 'portfolio' ? 'Portfolio Personale' : 'Piattaforma Enterprise'}
            </span>
          </div>
        </div>
      </motion.div>

      {/* View Content with Smooth Transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {viewMode === 'portfolio' ? <PortfolioView /> : <EnterpriseView />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
