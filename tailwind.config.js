/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'deep-blue': '#050A30',
        'midnight': '#0A1128',
        'cyber-black': '#080C24',
        'electric-purple': '#9D4EDD',
        'neon-purple': '#B14AED',
        'cyber-green': '#00F5D4',
        'neon-blue': '#4CC9F0',
        'dark-surface': '#0F172A',
        'dark-surface-lighter': '#1E293B',
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
        'mono': ['IBM Plex Mono', 'ui-monospace', 'monospace'],
        'display': ['Montserrat', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        'neon-purple': '0 0 5px rgba(177, 74, 237, 0.5), 0 0 20px rgba(177, 74, 237, 0.3)',
        'neon-green': '0 0 5px rgba(0, 245, 212, 0.5), 0 0 20px rgba(0, 245, 212, 0.3)',
        'neon-blue': '0 0 5px rgba(76, 201, 240, 0.5), 0 0 20px rgba(76, 201, 240, 0.3)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(177, 74, 237, 0.5), 0 0 20px rgba(177, 74, 237, 0.3)' },
          '100%': { boxShadow: '0 0 10px rgba(177, 74, 237, 0.8), 0 0 30px rgba(177, 74, 237, 0.5)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cyber-grid': 'linear-gradient(to right, #1E293B 1px, transparent 1px), linear-gradient(to bottom, #1E293B 1px, transparent 1px)',
      },
      backgroundSize: {
        'cyber-grid': '30px 30px',
      },
    },
  },
  plugins: [],
}
