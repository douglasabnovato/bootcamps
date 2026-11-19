/* prerender.mjs — grava dist/event/<slug>/index.html para cada evento e dist/404.html (issue #71).
   A lógica está em src/shared/seo/prerender.ts (testada); o Node 22 roda o .ts direto, sem compilar.
   Os eventos vêm de src/entities/event/api/events.data.ts, a cópia gerada da API (npm run copias).
   Uso: node scripts/prerender.mjs  (roda sozinho no npm run build) */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { events } from "../src/entities/event/api/events.data.ts";
import { montarPagina404, montarPaginaDoEvento } from "../src/shared/seo/prerender.ts";

const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");
const html = fs.readFileSync(path.join(DIST, "index.html"), "utf8");

for (const evento of events) {
  const pasta = path.join(DIST, "event", evento.slug);
  fs.mkdirSync(pasta, { recursive: true });
  fs.writeFileSync(path.join(pasta, "index.html"), montarPaginaDoEvento(html, evento));
}
fs.writeFileSync(path.join(DIST, "404.html"), montarPagina404(html));

console.log(`prerender: ${events.length} páginas em dist/event/<slug>/index.html e dist/404.html`);
