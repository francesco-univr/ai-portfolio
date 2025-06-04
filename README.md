# Guida al Portfolio per Ricercatore IA

## Panoramica

Questo documento fornisce istruzioni dettagliate su come modificare e personalizzare il tuo portfolio di ricerca in intelligenza artificiale. Il sito è stato sviluppato utilizzando React con TypeScript, Tailwind CSS e varie librerie per animazioni e visualizzazioni 3D.

## Struttura del Progetto

```
ai-portfolio/
├── public/                  # File statici accessibili pubblicamente
├── src/
│   ├── assets/              # Risorse statiche (immagini, animazioni)
│   ├── components/          # Componenti React riutilizzabili
│   │   ├── ui/              # Componenti UI di base
│   │   ├── layout/          # Componenti di layout (Header, Footer)
│   │   └── sections/        # Sezioni principali del sito
│   ├── lib/                 # Utility e configurazioni
│   │   └── data/            # File di dati modificabili
│   ├── App.tsx              # Componente principale dell'applicazione
│   └── main.tsx             # Entry point
```

## Come Modificare i Contenuti

### Informazioni Personali

Per modificare le informazioni personali, apri il file `src/lib/data/profile.ts` e aggiorna i dati secondo le tue esigenze:

```typescript
export const profileData = {
  name: "Dr. Nome Cognome",
  title: "Ricercatore in Intelligenza Artificiale",
  specialization: "Deep Learning & Computer Vision",
  bio: "La tua biografia professionale...",
  avatar: "/path/to/image.jpg",
  socialLinks: [
    { platform: "LinkedIn", url: "https://linkedin.com/..." },
    { platform: "GitHub", url: "https://github.com/..." },
    // Altri link social
  ],
};
```

### Progetti

Per modificare i progetti, apri il file `src/components/sections/Projects.tsx` e aggiorna l'array `projectsData`:

```typescript
const projectsData: Project[] = [
  {
    id: 1,
    title: "Titolo del Progetto",
    description: "Descrizione del progetto...",
    image: "URL dell'immagine",
    tags: ["Tag1", "Tag2", "Tag3"],
    link: "URL del progetto"
  },
  // Altri progetti
];
```

### Timeline

Per modificare la timeline, apri il file `src/components/sections/Timeline.tsx` e aggiorna l'array `timelineData`:

```typescript
const timelineData: TimelineItem[] = [
  {
    year: "2025",
    title: "Titolo dell'evento",
    description: "Descrizione dell'evento...",
  },
  // Altri eventi
];
```

### Statistiche di Ricerca

Per modificare le statistiche e i grafici, apri il file `src/components/sections/ResearchStats.tsx` e aggiorna gli array `researchData` e `impactData`:

```typescript
const researchData = [
  { name: "Area di Ricerca 1", value: 40 },
  { name: "Area di Ricerca 2", value: 30 },
  // Altre aree
];

const impactData = [
  { name: "2020", citations: 45, publications: 2 },
  { name: "2021", citations: 78, publications: 3 },
  // Altri anni
];
```

## Personalizzazione del Tema

### Colori

Per modificare i colori del tema, apri il file `tailwind.config.js` e aggiorna la sezione `colors`:

```javascript
colors: {
  'deep-blue': '#050A30',
  'midnight': '#0A1128',
  'cyber-black': '#080C24',
  'electric-purple': '#9D4EDD',
  'neon-purple': '#B14AED',
  'cyber-green': '#00F5D4',
  'neon-blue': '#4CC9F0',
  // Altri colori
},
```

### Font

Per modificare i font, aggiorna la sezione `fontFamily` nel file `tailwind.config.js`:

```javascript
fontFamily: {
  'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
  'mono': ['IBM Plex Mono', 'ui-monospace', 'monospace'],
  'display': ['Montserrat', 'ui-sans-serif', 'system-ui'],
},
```

## Esecuzione Locale

Per eseguire il sito localmente:

1. Assicurati di avere Node.js installato
2. Naviga alla directory del progetto
3. Installa le dipendenze: `pnpm install`
4. Avvia il server di sviluppo: `pnpm run dev`
5. Apri il browser all'indirizzo: `http://localhost:5173`

## Build per la Produzione

Per creare una build ottimizzata per la produzione:

1. Esegui il comando: `pnpm run build`
2. I file ottimizzati saranno disponibili nella cartella `dist`

## Librerie Principali Utilizzate

- **React + TypeScript**: Framework principale
- **Tailwind CSS**: Styling e responsive design
- **Framer Motion**: Animazioni e transizioni fluide
- **Three.js / React Three Fiber**: Rendering 3D e WebGL
- **Recharts**: Visualizzazioni dati e grafici
- **GSAP**: Animazioni avanzate

## Supporto e Assistenza

Per qualsiasi domanda o assistenza, non esitare a contattarmi. Sarò felice di aiutarti a personalizzare ulteriormente il tuo portfolio o a risolvere eventuali problemi.
