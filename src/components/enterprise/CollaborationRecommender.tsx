import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { nanoid } from 'nanoid';

// ---------------------------------------------------------------------------------------------------------------------
// Data Types
// ---------------------------------------------------------------------------------------------------------------------

export interface CollaboratorProfile {
  id: string;
  name: string;
  affiliation: string;
  interests: string[];
  hIndex: number;
  complementarityScore: number; // 0-1
  availabilityScore: number; // 0-1
}

// ---------------------------------------------------------------------------------------------------------------------
// Mock algorithm – replace with real ML powered recommender
// ---------------------------------------------------------------------------------------------------------------------

const MOCK_PROFILES: CollaboratorProfile[] = [
  {
    id: nanoid(),
    name: 'Alice Smith',
    affiliation: 'MIT',
    interests: ['Graph ML', 'NLP', 'Citations'],
    hIndex: 24,
    complementarityScore: 0.85,
    availabilityScore: 0.6
  },
  {
    id: nanoid(),
    name: 'Bob Johnson',
    affiliation: 'Stanford',
    interests: ['Computer Vision', 'Embeddings'],
    hIndex: 32,
    complementarityScore: 0.78,
    availabilityScore: 0.75
  },
  {
    id: nanoid(),
    name: 'Chen Li',
    affiliation: 'Tsinghua University',
    interests: ['Recommender Systems', 'Graph Databases'],
    hIndex: 18,
    complementarityScore: 0.9,
    availabilityScore: 0.55
  }
];

const fetchRecommendations = async (): Promise<CollaboratorProfile[]> => {
  await new Promise((r) => setTimeout(r, 400));
  return MOCK_PROFILES;
};

// ---------------------------------------------------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------------------------------------------------

export const CollaborationRecommender: React.FC = () => {
  const [profiles, setProfiles] = useState<CollaboratorProfile[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setProfiles(await fetchRecommendations());
      setLoading(false);
    })();
  }, []);

  return (
    <div className="w-full h-full p-6 overflow-y-auto bg-cyber-black/80 rounded-xl text-white backdrop-blur">
      <h2 className="text-2xl font-semibold mb-4 text-electric-purple">Recommended Collaborators</h2>
      {loading && <p className="text-sm text-gray-400">Loading…</p>}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {profiles.map((profile, idx) => (
          <motion.div
            key={profile.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-midnight rounded-lg p-4 shadow-lg"
          >
            <h3 className="text-lg font-semibold text-cyber-green mb-1">
              {profile.name}
            </h3>
            <p className="text-sm text-gray-400 mb-2">{profile.affiliation}</p>
            <p className="text-xs mb-2">
              <span className="font-semibold text-neon-blue">h-index:</span> {profile.hIndex}
            </p>
            <div className="flex flex-wrap gap-1 mb-3 text-xs">
              {profile.interests.map((i) => (
                <span key={i} className="px-2 py-1 bg-gray-800 rounded">
                  {i}
                </span>
              ))}
            </div>
            <div className="text-xs text-gray-300">
              <p>
                Complementarity: {(profile.complementarityScore * 100).toFixed(0)}%
              </p>
              <p>
                Availability: {(profile.availabilityScore * 100).toFixed(0)}%
              </p>
            </div>
            <button className="mt-3 w-full px-3 py-2 bg-neon-purple/80 hover:bg-neon-purple rounded text-sm">
              Send Proposal
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CollaborationRecommender;