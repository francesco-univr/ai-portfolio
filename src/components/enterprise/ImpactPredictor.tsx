import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';

// ---------------------------------------------------------------------------------------------------------------------
// Type Definitions
// ---------------------------------------------------------------------------------------------------------------------

export interface ImpactPrediction {
  label: string; // e.g. "6 months", "1 year"
  value: number; // predicted citations
  confidence: number; // 0-1 range
}

// ---------------------------------------------------------------------------------------------------------------------
// Mock Prediction Service – replace with real ML inference API when available
// ---------------------------------------------------------------------------------------------------------------------

const callImpactApi = async (): Promise<ImpactPrediction[]> => {
  const res = await fetch('/api/impact-predict', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      publication_velocity: 3,
      citation_trajectory: [5, 10, 15, 20, 25, 30],
      collaboration_network_centrality: 0.5,
      venue_impact_factor: 2.3,
      semantic_novelty_score: 0.7,
      author_h_index: 12,
      trending_keywords_overlap: 0.4
    })
  });

  if (!res.ok) throw new Error('API request failed');

  const data = await res.json();
  return [
    { label: '6 months', value: data.citations_6_months.value, confidence: data.citations_6_months.confidence },
    { label: '1 year', value: data.citations_1_year.value, confidence: data.citations_1_year.confidence },
    { label: 'Future H-index', value: data.h_index_future.value, confidence: data.h_index_future.confidence }
  ];
};

// ---------------------------------------------------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------------------------------------------------

export const ImpactPredictor: React.FC = () => {
  const [predictions, setPredictions] = useState<ImpactPrediction[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPredictions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await callImpactApi();
      setPredictions(data);
    } catch (err) {
      console.error(err);
      setError('Unable to fetch impact predictions.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPredictions();
  }, []);

  // Prepare chart data
  const chartData = predictions?.map((p, idx) => ({
    name: p.label,
    Citations: p.value,
    Confidence: p.confidence * 100,
    idx
  }));

  return (
    <div className="w-full h-full p-6 bg-cyber-black/80 rounded-xl text-white backdrop-blur">
      <h2 className="text-2xl font-semibold mb-4 text-cyber-green">Impact Predictor</h2>

      {loading && <p className="text-sm text-gray-400">Loading predictions…</p>}
      {error && <p className="text-sm text-red-400">{error}</p>}

      {predictions && (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2d2d42" />
            <XAxis dataKey="name" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip
              contentStyle={{ background: '#101012', borderColor: '#4CC9F0' }}
              labelStyle={{ color: '#4CC9F0' }}
            />
            <Line type="monotone" dataKey="Citations" stroke="#4CC9F0" strokeWidth={2} dot />
          </LineChart>
        </ResponsiveContainer>
      )}

      <div className="mt-6 flex gap-3">
        <button
          onClick={fetchPredictions}
          className="px-4 py-2 bg-neon-purple/90 hover:bg-neon-purple rounded disabled:opacity-60"
          disabled={loading}
        >
          Refresh
        </button>
        <button
          onClick={() => setPredictions(null)}
          className="px-4 py-2 bg-red-600/80 hover:bg-red-600 rounded"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default ImpactPredictor;