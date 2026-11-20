import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import type { Plugin } from "vite";

/* Pré-carregamento por rota (Decisão LIDER D19, 20/11/2026). Todas as páginas saem do mesmo index.html (as de evento
   são cópias dele, feitas por scripts/prerender.mjs), então um script curto no head olha o caminho e faz
   modulepreload do pedaço de JavaScript da página e do que ele importa, sem esperar o index.js pedir.
   Medido no preview (celular, cache frio): evento de 3,2 para 3,0 s. */
const ROTAS = [
  { teste: String.raw`p==="/"`, pagina: /pages[\\/]home[\\/]Home\.tsx$/i },
  { teste: String.raw`/^\/event\/[^/]+\/?$/.test(p)`, pagina: /pages[\\/]detail[\\/]Detail\.tsx$/i },
];

const preloadPorRota = (): Plugin => ({
  name: "preload-por-rota",
  apply: "build",
  transformIndexHtml: {
    order: "post",
    handler(html, { bundle }) {
      const chunks = Object.values(bundle ?? {}).flatMap((c) => (c.type === "chunk" ? [c] : []));
      const entrada = chunks.find((c) => c.isEntry);
      const jaCarregados = new Set([entrada?.fileName, ...(entrada?.imports ?? [])]);
      const partes = ROTAS.map((r) => {
        const pagina = chunks.find((c) => r.pagina.test(c.facadeModuleId ?? ""));
        if (!pagina) throw new Error(`preload-por-rota: pedaço não encontrado para ${r.pagina}`);
        const modulos = [pagina.fileName, ...pagina.imports].filter((f) => !jaCarregados.has(f)).map((f) => "/" + f);
        return `if(${r.teste}){m(${JSON.stringify(modulos)})}`;
      });
      const script = `(function(){var p=location.pathname;function m(hs){hs.forEach(function(h){var e=document.createElement("link");e.rel="modulepreload";e.href=h;document.head.appendChild(e)})}${partes.join("else ")}})()`;
      return { html, tags: [{ tag: "script", children: script, injectTo: "head-prepend" }] };
    },
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), preloadPorRota()],
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
