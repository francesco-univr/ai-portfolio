import { VercelRequest, VercelResponse } from '@vercel/node';

interface ResearchFeatures {
  publication_velocity: number;
  citation_trajectory: number[];
  collaboration_network_centrality: number;
  venue_impact_factor: number;
  semantic_novelty_score: number;
  author_h_index: number;
  trending_keywords_overlap: number;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const features: ResearchFeatures = req.body;

  // BASIC heuristic implementation (replace with trained TF model)
  const base =
    features.publication_velocity * 1.2 +
    features.venue_impact_factor * 2 +
    features.collaboration_network_centrality * 1.5 +
    features.semantic_novelty_score * 2 +
    features.trending_keywords_overlap;

  const sumCitations = features.citation_trajectory.reduce((s, v) => s + v, 0);

  const citations6m = base + sumCitations * 0.1;
  const citations1y = base * 1.5 + sumCitations * 0.2;
  const futureHIndex = features.author_h_index + citations1y * 0.05;

  return res.json({
    citations_6_months: { value: Math.round(citations6m), confidence: 0.6 },
    citations_1_year: { value: Math.round(citations1y), confidence: 0.6 },
    h_index_future: { value: Math.round(futureHIndex), confidence: 0.5 },
    breakthrough_probability: Math.min(1, (citations1y - citations6m) / 100)
  });
}