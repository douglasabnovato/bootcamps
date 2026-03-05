import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Isso permite importar como '@/entities/...' ao invés de caminhos relativos
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // Garante que o servidor reinicie se houver mudanças profundas
    watch: {
      usePolling: true,
    },
  },
})