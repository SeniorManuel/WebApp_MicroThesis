import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: 'Frontend',  

  plugins: [react()],

  build: {
    outDir: 'Frontend/dist', 
    emptyOutDir: true, 
  },

  resolve: {
    alias: {
      '@': '/Frontend/src', 
    },
  },
})
