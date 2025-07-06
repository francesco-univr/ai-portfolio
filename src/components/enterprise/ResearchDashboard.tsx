import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

interface RealTimeMetrics {
  citationsToday: number;
  profileViews: number;
  collaborationRequests: number;
  codeExecutions: number;
}

// ---------------------------------------------------------------------------------------------------------------------
// Mock websocket feed
// ---------------------------------------------------------------------------------------------------------------------

const useMockRealtimeFeed = (): RealTimeMetrics => {
  const [metrics, setMetrics] = useState<RealTimeMetrics>({
    citationsToday: 3,
    profileViews: 120,
    collaborationRequests: 1,
    codeExecutions: 5
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        citationsToday: prev.citationsToday + (Math.random() < 0.3 ? 1 : 0),
        profileViews: prev.profileViews + Math.floor(Math.random() * 5),
        collaborationRequests: prev.collaborationRequests + (Math.random() < 0.1 ? 1 : 0),
        codeExecutions: prev.codeExecutions + Math.floor(Math.random() * 2)
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return metrics;
};

// ---------------------------------------------------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------------------------------------------------

export const ResearchDashboard: React.FC = () => {
  const metrics = useMockRealtimeFeed();

  const tiles = [
    {
      label: 'Citations Today',
      value: metrics.citationsToday,
      color: 'text-neon-blue'
    },
    { label: 'Profile Views', value: metrics.profileViews, color: 'text-cyber-green' },
    {
      label: 'Collaboration Requests',
      value: metrics.collaborationRequests,
      color: 'text-electric-purple'
    },
    { label: 'Code Executions', value: metrics.codeExecutions, color: 'text-red-400' }
  ];

  return (
    <div className="w-full h-full p-6 bg-cyber-black/80 rounded-xl text-white backdrop-blur">
      <h2 className="text-2xl font-semibold mb-4 text-neon-blue">Real-time Research Dashboard</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((tile) => (
          <motion.div
            key={tile.label}
            layout
            className="bg-midnight p-4 rounded-lg shadow relative overflow-hidden"
          >
            <div className="absolute -right-2 -top-2 opacity-10">
              <TrendingUp size={64} />
            </div>
            <p className="text-sm text-gray-400 mb-1">{tile.label}</p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={tile.value}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.3 }}
                className={`text-3xl font-bold ${tile.color}`}
              >
                {tile.value}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ResearchDashboard;