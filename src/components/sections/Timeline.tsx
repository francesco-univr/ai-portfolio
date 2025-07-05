import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon?: string;
}

const timelineData: TimelineItem[] = [
  {
    year: '2025',
    title: 'Riconoscimento Internazionale',
    description: 'Premio per la ricerca innovativa nel campo dell\'intelligenza artificiale applicata alla medicina personalizzata.',
  },
  {
    year: '2024',
    title: 'Pubblicazione Rivoluzionaria',
    description: 'Articolo pubblicato su Nature AI riguardante nuovi algoritmi di apprendimento profondo.',
  },
  {
    year: '2023',
    title: 'Collaborazione con Stanford',
    description: 'Progetto di ricerca congiunto sui sistemi di visione artificiale avanzati.',
  },
  {
    year: '2022',
    title: 'Brevetto Tecnologico',
    description: 'Deposito di un brevetto per un nuovo sistema di elaborazione del linguaggio naturale.',
  },
  {
    year: '2021',
    title: 'Dottorato in AI',
    description: 'Conseguimento del dottorato in Intelligenza Artificiale con lode.',
  },
  {
    year: '2020',
    title: 'Prima Pubblicazione',
    description: 'Prima pubblicazione scientifica su algoritmi di machine learning.',
  },
];

const TimelineItem: React.FC<{ item: TimelineItem; index: number }> = ({ item, index }) => {
  return (
    <motion.div 
      className="timeline-item"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-electric-purple flex items-center justify-center shadow-neon-purple">
        <span className="text-white font-mono text-sm">{item.year}</span>
      </div>
      <h3 className="text-xl font-display text-white mb-2 mt-4">{item.title}</h3>
      <p className="text-gray-300 text-sm">{item.description}</p>
    </motion.div>
  );
};

const Timeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ 
    container: containerRef,
  });
  
  const backgroundX = useTransform(scrollXProgress, [0, 1], ['0%', '-100%']);
  
  return (
    <section id="timeline" className="section relative overflow-hidden py-24">
      <motion.div
        className="absolute inset-0 cyber-grid opacity-20"
        style={{ backgroundPosition: backgroundX }}
      />
      
      <div className="mb-16 text-center">
        <motion.h2 
          className="gradient-text mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Percorso Professionale
        </motion.h2>
        <motion.p 
          className="subtitle max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Un viaggio attraverso le tappe più significative della mia carriera nella ricerca sull'intelligenza artificiale
        </motion.p>
      </div>
      
      <div className="relative">
        {/* Timeline track */}
        <div className="absolute top-32 left-0 right-0 h-1 bg-dark-surface-lighter">
          <motion.div
            className="absolute top-0 left-0 h-full bg-electric-purple"
            style={{ width: scrollXProgress, maxWidth: '100%' }}
          />
        </div>
        
        {/* Scrollable container */}
        <div 
          ref={containerRef}
          className="flex gap-8 overflow-x-auto pb-10 pt-10 px-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-electric-purple scrollbar-track-dark-surface"
          style={{ scrollbarWidth: 'thin' }}
        >
          {/* Initial spacer */}
          <div className="flex-shrink-0 w-[10vw]" />
          
          {/* Timeline items */}
          {timelineData.map((item, index) => (
            <div key={index} className="snap-center">
              <TimelineItem item={item} index={index} />
            </div>
          ))}
          
          {/* End spacer */}
          <div className="flex-shrink-0 w-[10vw]" />
        </div>
      </div>
      
      {/* Scroll indicators */}
      <div className="flex justify-between mt-8 px-4">
        <motion.div 
          className="text-electric-purple flex items-center gap-2"
          animate={{ x: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="hidden sm:inline">Scorri a sinistra</span>
        </motion.div>
        
        <motion.div 
          className="text-electric-purple flex items-center gap-2"
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <span className="hidden sm:inline">Scorri a destra</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default Timeline;
