# Struttura del Progetto Portfolio IA

## Organizzazione delle Cartelle

```
ai-portfolio/
├── public/                  # File statici accessibili pubblicamente
│   ├── fonts/               # Font personalizzati
│   └── models/              # Modelli 3D e risorse WebGL
├── src/
│   ├── assets/              # Risorse statiche
│   │   ├── images/          # Immagini e icone
│   │   └── animations/      # File di animazione (Lottie, etc.)
│   ├── components/          # Componenti React riutilizzabili
│   │   ├── ui/              # Componenti UI di base (shadcn/ui)
│   │   ├── layout/          # Componenti di layout (Header, Footer, etc.)
│   │   ├── sections/        # Sezioni principali del sito
│   │   │   ├── Hero/        # Sezione Hero con animazioni 3D
│   │   │   ├── About/       # Sezione informazioni personali
│   │   │   ├── Projects/    # Sezione progetti con slide interattive
│   │   │   ├── Timeline/    # Timeline orizzontale con hover effects
│   │   │   ├── Research/    # Sezione ricerca con infografiche
│   │   │   ├── Publications/# Pubblicazioni e riconoscimenti
│   │   │   └── Contact/     # Sezione contatti con CTA
│   │   └── 3d/              # Componenti 3D e WebGL
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility e configurazioni
│   │   ├── animations.ts    # Configurazioni e utility per animazioni
│   │   ├── theme.ts         # Configurazione del tema e colori
│   │   └── data/            # File di dati modificabili dall'utente
│   │       ├── profile.ts   # Dati del profilo personale
│   │       ├── projects.ts  # Dati dei progetti
│   │       ├── timeline.ts  # Dati della timeline
│   │       └── research.ts  # Dati della ricerca e pubblicazioni
│   ├── App.tsx              # Componente principale dell'applicazione
│   ├── main.tsx             # Entry point
│   └── index.css            # Stili globali e configurazione Tailwind
```

## Componenti Principali

### Layout
- **Header**: Navigazione principale con effetti di glassmorphism
- **Footer**: Informazioni di contatto e social media
- **Layout**: Wrapper per tutte le pagine con effetti di transizione

### Sezioni
- **Hero**: Sezione principale con animazioni 3D di reti neurali e presentazione
- **About**: Informazioni personali con design minimalista ed elegante
- **Projects**: Progetti di ricerca con slide interattive e hover effects
- **Timeline**: Timeline orizzontale scrollabile con animazioni al passaggio del mouse
- **Research**: Aree di ricerca con grafici animati e infografiche
- **Publications**: Pubblicazioni accademiche e riconoscimenti
- **Contact**: Modulo di contatto con CTA evidenti

### Componenti 3D e Interattivi
- **NeuralNetworkModel**: Modello 3D interattivo di una rete neurale
- **ParticleBackground**: Sfondo animato con particelle per la sezione Hero
- **DataVisualization**: Componenti per visualizzazioni dati interattive
- **AnimatedCharts**: Grafici animati per rappresentare l'impatto della ricerca

## Struttura dei Dati

Tutti i dati del sito saranno facilmente modificabili attraverso file TypeScript dedicati nella cartella `lib/data/`. Ogni file esporterà oggetti o array con i dati specifici per ciascuna sezione.

### Esempio di struttura dati (profile.ts)
```typescript
export const profileData = {
  name: "Dr. Nome Cognome",
  title: "Ricercatore in Intelligenza Artificiale",
  specialization: "Deep Learning & Computer Vision",
  bio: "Breve biografia professionale...",
  avatar: "/path/to/image.jpg",
  socialLinks: [
    { platform: "LinkedIn", url: "https://linkedin.com/..." },
    { platform: "GitHub", url: "https://github.com/..." },
    { platform: "Twitter", url: "https://twitter.com/..." },
    // Altri link social
  ],
  // Altri dati del profilo
};
```

## Librerie e Tecnologie

- **React + TypeScript**: Framework principale
- **Tailwind CSS**: Styling e responsive design
- **Framer Motion**: Animazioni e transizioni fluide
- **Three.js / React Three Fiber**: Rendering 3D e WebGL
- **Recharts / D3.js**: Visualizzazioni dati e grafici
- **shadcn/ui**: Componenti UI di base
- **Lucide Icons**: Set di icone
- **GSAP**: Animazioni avanzate
