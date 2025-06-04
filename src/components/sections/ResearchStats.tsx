import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const researchData = [
  { name: 'Deep Learning', value: 40 },
  { name: 'Computer Vision', value: 30 },
  { name: 'NLP', value: 20 },
  { name: 'Reinforcement Learning', value: 10 },
];

const impactData = [
  { name: '2020', citations: 45, publications: 2 },
  { name: '2021', citations: 78, publications: 3 },
  { name: '2022', citations: 120, publications: 4 },
  { name: '2023', citations: 230, publications: 5 },
  { name: '2024', citations: 310, publications: 6 },
  { name: '2025', citations: 420, publications: 4 },
];

const COLORS = ['#9D4EDD', '#4CC9F0', '#00F5D4', '#7209B7'];

const AnimatedPieChart = () => {
  const chartRef = useRef(null);
  const isInView = useInView(chartRef, { once: false, amount: 0.5 });
  
  return (
    <motion.div 
      ref={chartRef}
      className="h-64 w-full"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.8 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={researchData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            innerRadius={40}
            fill="#8884d8"
            dataKey="value"
            animationBegin={0}
            animationDuration={1500}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {researchData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(15, 23, 42, 0.8)', 
              borderColor: '#9D4EDD',
              borderRadius: '8px',
              color: 'white'
            }} 
          />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

const AnimatedBarChart = () => {
  const chartRef = useRef(null);
  const isInView = useInView(chartRef, { once: false, amount: 0.5 });
  
  return (
    <motion.div 
      ref={chartRef}
      className="h-64 w-full"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.8 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={impactData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
          <XAxis dataKey="name" stroke="#9D4EDD" />
          <YAxis stroke="#9D4EDD" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(15, 23, 42, 0.8)', 
              borderColor: '#9D4EDD',
              borderRadius: '8px',
              color: 'white'
            }} 
          />
          <Bar dataKey="citations" fill="#4CC9F0" animationDuration={1500} />
          <Bar dataKey="publications" fill="#00F5D4" animationDuration={1500} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

const ResearchStats: React.FC = () => {
  return (
    <section id="research" className="section relative py-24">
      <div className="absolute inset-0 cyber-grid opacity-10" />
      
      <div className="mb-16 text-center">
        <motion.h2 
          className="gradient-text mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Impatto della Ricerca
        </motion.h2>
        <motion.p 
          className="subtitle max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Visualizzazione dell'impatto e delle aree di ricerca principali
        </motion.p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="glass p-6 rounded-lg">
          <h3 className="text-xl font-display text-white mb-6 text-center">Aree di Ricerca</h3>
          <AnimatedPieChart />
        </div>
        
        <div className="glass p-6 rounded-lg">
          <h3 className="text-xl font-display text-white mb-6 text-center">Pubblicazioni e Citazioni</h3>
          <AnimatedBarChart />
        </div>
      </div>
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          className="glass p-6 rounded-lg text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          whileHover={{ y: -5, boxShadow: '0 0 15px rgba(157, 78, 221, 0.5)' }}
        >
          <div className="text-4xl font-display text-cyber-green mb-2">24</div>
          <div className="text-gray-300">Pubblicazioni</div>
        </motion.div>
        
        <motion.div 
          className="glass p-6 rounded-lg text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          whileHover={{ y: -5, boxShadow: '0 0 15px rgba(76, 201, 240, 0.5)' }}
        >
          <div className="text-4xl font-display text-neon-blue mb-2">1200+</div>
          <div className="text-gray-300">Citazioni</div>
        </motion.div>
        
        <motion.div 
          className="glass p-6 rounded-lg text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          whileHover={{ y: -5, boxShadow: '0 0 15px rgba(177, 74, 237, 0.5)' }}
        >
          <div className="text-4xl font-display text-neon-purple mb-2">8</div>
          <div className="text-gray-300">Premi Ricevuti</div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResearchStats;
