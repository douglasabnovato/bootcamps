// Orçamento do JS inicial (issue #73): soma, em gzip, os scripts que o index.html carrega
// (o <script type="module"> e os <link rel="modulepreload">) e falha acima do limite.
// Uso: npm run build && npm run orcamento
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

const LIMITE_KB = Number(process.env.ORCAMENTO_JS_KB ?? 100);
const dist = process.argv[2] ?? "dist";

const html = readFileSync(join(dist, "index.html"), "utf8");
const scripts = [
  ...html.matchAll(/<script[^>]+type="module"[^>]+src="([^"]+)"/g),
  ...html.matchAll(/<link[^>]+rel="modulepreload"[^>]+href="([^"]+)"/g),
].map((m) => m[1]);

if (scripts.length === 0) {
  console.error("✖ nenhum script encontrado no index.html: rode o build antes");
  process.exit(1);
}

let total = 0;
for (const src of new Set(scripts)) {
  const kb = gzipSync(readFileSync(join(dist, src.replace(/^\//, "")))).length / 1024;
  total += kb;
  console.log(`  ${kb.toFixed(1).padStart(6)} KB gzip  ${src}`);
}

const resumo = `JS inicial: ${total.toFixed(1)} KB gzip (limite ${LIMITE_KB} KB)`;
if (total > LIMITE_KB) {
  console.error(`✖ ${resumo}`);
  process.exit(1);
}
console.log(`✔ ${resumo}`);
