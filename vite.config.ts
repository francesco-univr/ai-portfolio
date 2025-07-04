import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/ai-portfolio/', // IMPORTANTE: aggiungi il nome del tuo repository
  plugins: [react()],
})