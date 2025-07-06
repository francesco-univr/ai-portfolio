# AI Portfolio – Enterprise Research Platform

## 📦 Installation & Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ai-portfolio.git
   cd ai-portfolio
   ```
2. **Install dependencies (PNPM recommended)**
   ```bash
   pnpm install
   ```
3. **Create a new `.env` file** based on `.env.example` and populate:
   - `VITE_OPENAI_API_KEY` – your OpenAI key
   - `VITE_SUPABASE_URL` & `VITE_SUPABASE_ANON_KEY` – Supabase project credentials
4. **Run the dev servers**
   ```bash
   # Front-end (Vite)
   pnpm dev

   # In another terminal – Vercel serverless emulator
   npx vercel dev
   ```
5. Open `http://localhost:5173` – the Impact Predictor now calls the serverless endpoint.

---

## 🔌 Environment Variables (`.env`)
| Variable | Description |
|----------|-------------|
| `VITE_OPENAI_API_KEY` | OpenAI secret key for semantic analysis |
| `VITE_SUPABASE_URL`   | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon/public key |

> **Note**: Environment variables prefixed with `VITE_` are exposed to the browser at build-time.

---

## 📚 API Reference

### `POST /api/impact-predict`
Predict future citation metrics.

**Request Body** (`ResearchFeatures`)
```jsonc
{
  "publication_velocity": 3,
  "citation_trajectory": [5,10,15,20,25,30],
  "collaboration_network_centrality": 0.5,
  "venue_impact_factor": 2.3,
  "semantic_novelty_score": 0.7,
  "author_h_index": 12,
  "trending_keywords_overlap": 0.4
}
```

**Response**
```jsonc
{
  "citations_6_months": { "value": 42, "confidence": 0.6 },
  "citations_1_year":  { "value": 78, "confidence": 0.6 },
  "h_index_future":    { "value": 18, "confidence": 0.5 },
  "breakthrough_probability": 0.22
}
```

---

### `POST /api/semantic-analyze`
Extract key research concepts using OpenAI.

**Request Body**
```jsonc
{ "text": "<raw abstract, paper, or profile text>" }
```

**Response** – `ConceptEvolution[]`
```jsonc
[
  {
    "concept": "Graph Neural Networks",
    "timeline": [ { "date": "2020", "relevance_score": 0.8, "context": "..." } ],
    "trend_direction": "emerging",
    "related_concepts": ["GNN", "Deep Graph" ]
  }
]
```

---

## ☁️ Deployment Guide (Vercel + Supabase)

1. **Create Supabase Project**
   - Enable Row Level Security.
   - Add tables: `publications`, `citations`, `researchers`, etc.
   - Activate Realtime on desired tables.
2. **Store environment variables** in Vercel project settings:
   - `VITE_OPENAI_API_KEY`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. **Deploy**
   ```bash
   vercel --prod
   ```
4. Edge Functions will be auto-built from `api/` directory per `vercel.json`.

---

## 🗺️ Implementation Roadmap

| Phase | Duration | Milestones |
|-------|----------|------------|
| **1. Foundation** | Week 1-2 | Core architecture, 3D graph, Monaco editor, Tailwind setup |
| **2. AI Services** | Week 3-4 | Impact predictor (serverless TF), Semantic analyzer (OpenAI), Supabase schema |
| **3. WASM + Performance** | Week 5-6 | Graph WASM module, virtual scrolling, lazy loading |
| **4. Advanced Features** | Week 7-8 | Collaboration recommender, realtime dashboard, SEO & A11y audits |
| **5. Launch & Scale** | Week 9-10 | CI/CD, monitoring & analytics, production rollout |

---

## 👩‍💻 Contributing
1. Fork the repo & create feature branches
2. Follow ESLint/Prettier rules (`pnpm lint`)
3. Write tests (`pnpm test`) – new components require coverage ≥80%
4. Submit PRs with clear description & screenshots

---

## 📜 License
MIT