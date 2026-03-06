import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Mapeamento absoluto para a pasta src
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173, // Fixar a porta ajuda na consistência do desenvolvimento
    watch: {
      usePolling: true, // Mantemos o polling para garantir que mudanças em containers ou WSL sejam detectadas
    },
  },
});
