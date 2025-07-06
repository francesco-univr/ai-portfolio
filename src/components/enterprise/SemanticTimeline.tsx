import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

// ---------------------------------------------------------------------------------------------------------------------
// Data types
// ---------------------------------------------------------------------------------------------------------------------

export interface SemanticEvent {
  date: Date;
  type: 'publication' | 'breakthrough' | 'collaboration' | 'award';
  title: string;
  description: string;
  keywords: string[];
  sentimentScore: number; // -1 -> 1
  impactLevel: 'low' | 'medium' | 'high' | 'revolutionary';
}

// ---------------------------------------------------------------------------------------------------------------------
// Mock data – replace with real semantic analysis pipeline
// ---------------------------------------------------------------------------------------------------------------------

const MOCK_EVENTS: SemanticEvent[] = [
  {
    date: new Date('2023-02-15'),
    type: 'publication',
    title: 'Graph Neural Networks for Citation Prediction',
    description: 'Published in NeurIPS. Introduces a novel GNN architecture for citation forecasting.',
    keywords: ['GNN', 'citations', 'forecasting'],
    sentimentScore: 0.2,
    impactLevel: 'high'
  },
  {
    date: new Date('2023-09-01'),
    type: 'breakthrough',
    title: 'State-of-the-art results on arXiv dataset',
    description: 'Model surpasses previous benchmarks by 5%.',
    keywords: ['arXiv', 'benchmark'],
    sentimentScore: 0.4,
    impactLevel: 'revolutionary'
  },
  {
    date: new Date('2024-01-10'),
    type: 'collaboration',
    title: 'Collaboration with MIT AI Lab',
    description: 'Joint project on scalable graph ML.',
    keywords: ['collaboration', 'MIT'],
    sentimentScore: 0.1,
    impactLevel: 'medium'
  }
];

// ---------------------------------------------------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------------------------------------------------

export const SemanticTimeline: React.FC = () => {
  return (
    <div className="w-full h-full p-6 overflow-y-auto bg-cyber-black/80 rounded-xl text-white backdrop-blur">
      <h2 className="text-2xl font-semibold mb-6 text-neon-blue">Semantic Research Timeline</h2>
      <div className="relative pl-6">
        {/* Vertical line */}
        <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gray-700" />
        {MOCK_EVENTS.sort((a, b) => b.date.getTime() - a.date.getTime()).map((event, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="mb-8 relative"
          >
            {/* Marker */}
            <span className="absolute -left-2 top-2 w-4 h-4 rounded-full bg-electric-purple border-2 border-white" />
            <div className="bg-midnight p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-2 text-sm text-gray-400">
                <span>{format(event.date, 'PPP')}</span>
                <span className="capitalize">{event.type}</span>
              </div>
              <h3 className="text-lg font-semibold mb-1 text-cyber-green">{event.title}</h3>
              <p className="text-sm text-gray-200 mb-2">{event.description}</p>
              <div className="flex gap-2 flex-wrap text-xs">
                {event.keywords.map((kw) => (
                  <span key={kw} className="px-2 py-1 bg-gray-800 rounded">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SemanticTimeline;