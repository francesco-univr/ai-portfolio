import * as tf from '@tensorflow/tfjs';

export interface ResearchFeatures {
  publication_velocity: number; // papers per year
  citation_trajectory: number[]; // last n years citations
  collaboration_network_centrality: number;
  venue_impact_factor: number;
  semantic_novelty_score: number;
  author_h_index: number;
  trending_keywords_overlap: number;
}

export interface ImpactForecast {
  citations_6_months: { value: number; confidence: number };
  citations_1_year: { value: number; confidence: number };
  h_index_future: { value: number; confidence: number };
  breakthrough_probability: number;
}

// -------------------------------------------------------------
// Very lightweight regression model – placeholder for real model
// -------------------------------------------------------------

let model: tf.LayersModel | null = null;

const buildModel = () => {
  const m = tf.sequential();
  m.add(tf.layers.dense({ units: 16, activation: 'relu', inputShape: [20] }));
  m.add(tf.layers.dense({ units: 8, activation: 'relu' }));
  m.add(tf.layers.dense({ units: 3, activation: 'linear' }));
  m.compile({ optimizer: 'adam', loss: 'meanSquaredError' });
  return m;
};

export const loadOrCreateModel = async (): Promise<tf.LayersModel> => {
  if (model) return model;
  try {
    // Attempt to load from IndexedDB (browser) – optional
    model = await tf.loadLayersModel('indexeddb://impact-predictor');
  } catch (_) {
    model = buildModel();
  }
  return model;
};

// Helper to pad / normalize citation trajectory
const processFeatures = (f: ResearchFeatures): tf.Tensor => {
  const trajectoryPadded = [...f.citation_trajectory];
  while (trajectoryPadded.length < 12) trajectoryPadded.unshift(0);
  const inputArr = [
    f.publication_velocity,
    ...trajectoryPadded.slice(-12),
    f.collaboration_network_centrality,
    f.venue_impact_factor,
    f.semantic_novelty_score,
    f.author_h_index,
    f.trending_keywords_overlap
  ];
  return tf.tensor([inputArr]);
};

export const predictImpact = async (features: ResearchFeatures): Promise<ImpactForecast> => {
  const m = await loadOrCreateModel();
  const input = processFeatures(features);
  const prediction = m.predict(input) as tf.Tensor;
  const [cit6m, cit1y, hIndex] = Array.from(prediction.dataSync() as Float32Array);

  return {
    citations_6_months: {
      value: Math.max(0, Math.round(cit6m)),
      confidence: 0.6
    },
    citations_1_year: {
      value: Math.max(0, Math.round(cit1y)),
      confidence: 0.6
    },
    h_index_future: {
      value: Math.max(0, Math.round(hIndex)),
      confidence: 0.5
    },
    breakthrough_probability: Math.min(1, Math.max(0, (cit1y - cit6m) / 100))
  };
};