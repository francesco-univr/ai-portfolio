import React from 'react';
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import Timeline from './components/sections/Timeline';
import Projects from './components/sections/Projects';
import ResearchStats from './components/sections/ResearchStats';
import NeuralNetworkVisualization from './components/sections/NeuralNetworkVisualization';
import Contact from './components/sections/Contact';

function App() {
  return (
    <div className="bg-cyber-black min-h-screen">
      <Header />
      <main>
        <Hero />
        <Timeline />
        <Projects />
        <ResearchStats />
        <NeuralNetworkVisualization />
        <Contact />
      </main>
      <footer className="py-8 text-center text-gray-400 text-sm">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} AI Researcher Portfolio. Tutti i diritti riservati.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
