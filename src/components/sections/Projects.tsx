import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
}

const projectsData: Project[] = [
  {
    id: 1,
    title: "NeuralVision AI",
    description: "Sistema di visione artificiale avanzato per il riconoscimento di pattern complessi in immagini mediche, con applicazioni nella diagnosi precoce.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    tags: ["Computer Vision", "Deep Learning", "Healthcare"],
    link: "#"
  },
  {
    id: 2,
    title: "QuantumNLP",
    description: "Framework innovativo per l'elaborazione del linguaggio naturale che utilizza principi di calcolo quantistico per migliorare la comprensione semantica.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485",
    tags: ["NLP", "Quantum Computing", "Semantics"],
    link: "#"
  },
  {
    id: 3,
    title: "AutoML Platform",
    description: "Piattaforma di machine learning automatizzato che ottimizza la selezione di modelli e iperparametri per problemi di apprendimento supervisionato.",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb",
    tags: ["AutoML", "Optimization", "Cloud Computing"],
    link: "#"
  },
  {
    id: 4,
    title: "Reinforcement Learning in Robotics",
    description: "Applicazione di tecniche di apprendimento per rinforzo per il controllo autonomo di sistemi robotici in ambienti non strutturati.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    tags: ["Reinforcement Learning", "Robotics", "Automation"],
    link: "#"
  },
];

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  return (
    <motion.div 
      className="project-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-black to-transparent z-10" />
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-display text-white mb-2">{project.title}</h3>
        <p className="text-gray-300 text-sm mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, idx) => (
            <span key={idx} className="skill-badge">{tag}</span>
          ))}
        </div>
        <motion.a 
          href={project.link} 
          className="text-electric-purple inline-flex items-center gap-2 hover:text-neon-purple transition-colors"
          whileHover={{ x: 5 }}
        >
          Esplora progetto
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.a>
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % projectsData.length);
  };
  
  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length);
  };
  
  return (
    <section id="projects" className="section relative py-24">
      <div className="absolute inset-0 bg-gradient-radial from-deep-blue/20 to-cyber-black opacity-50" />
      
      <div className="mb-16 text-center relative z-10">
        <motion.h2 
          className="gradient-text mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Progetti di Ricerca
        </motion.h2>
        <motion.p 
          className="subtitle max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Esplora i miei progetti di ricerca più significativi nel campo dell'intelligenza artificiale
        </motion.p>
      </div>
      
      {/* Desktop view - Grid */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 relative z-10">
        {projectsData.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
      
      {/* Mobile view - Carousel */}
      <div className="md:hidden relative z-10">
        <div className="overflow-hidden">
          <motion.div 
            className="flex"
            animate={{ x: `-${activeIndex * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {projectsData.map((project, index) => (
              <div key={project.id} className="w-full flex-shrink-0 px-4">
                <ProjectCard project={project} index={0} />
              </div>
            ))}
          </motion.div>
        </div>
        
        {/* Carousel controls */}
        <div className="flex justify-between mt-6">
          <motion.button 
            onClick={prevSlide}
            className="w-10 h-10 rounded-full bg-dark-surface-lighter flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
          
          <div className="flex gap-2">
            {projectsData.map((_, index) => (
              <button 
                key={index}
                className={`w-2 h-2 rounded-full ${index === activeIndex ? 'bg-electric-purple' : 'bg-dark-surface-lighter'}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
          
          <motion.button 
            onClick={nextSlide}
            className="w-10 h-10 rounded-full bg-dark-surface-lighter flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
