/* prerender.ts — HTML próprio por evento, gerado depois do `vite build` (issue #71).
 *
 * Buscadores e prévias de link (WhatsApp, LinkedIn) leem só o HTML inicial. Cada evento ganha
 * dist/event/<slug>/index.html: o index.html do build com título, descrição, Open Graph, canonical e
 * JSON-LD do próprio evento. O React carrega por cima, igual às outras rotas.
 *
 * Funções puras (testadas em prerender.test.ts); quem grava os arquivos é scripts/prerender.mjs.
 * Este módulo só usa `import type`, para o Node rodar o .ts direto (remoção de tipos).
 */
import type { BootcampEvent, EventEdition } from "../../entities/event/model/types";

export const SITE_URL = "https://bootcamps-dun.vercel.app";

export const urlDoEvento = (slug: string) => `${SITE_URL}/event/${slug}`;

const escapar = (texto: string) => texto.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* Descrição curta para metatags: buscadores cortam por volta de 160 caracteres. */
export function resumir(texto: string, limite = 160): string {
  const limpo = texto.replace(/\s+/g, " ").trim();
  if (limpo.length <= limite) return limpo;
  const corte = limpo.slice(0, limite - 1);
  return `${corte.slice(0, corte.lastIndexOf(" ")).replace(/[,;:.\s]+$/, "")}…`;
}

const ehDataIso = (valor?: string) => !!valor && /^\d{4}-\d{2}-\d{2}/.test(valor);

const eventoDaEdicao = (evento: BootcampEvent, edicao: EventEdition) => ({
  "@type": "Event",
  name: edicao.numero ? `${evento.title} ${edicao.year} (${edicao.numero}ª edição)` : `${evento.title} ${edicao.year}`,
  description: resumir(edicao.highlight || evento.description, 300),
  /* Sem data completa, o ano (ISO 8601 reduzido) mantém o tipo certo; só a data completa habilita o resultado rico do Google. */
  startDate: ehDataIso(edicao.data) ? edicao.data : edicao.year,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: edicao.local?.nome ?? evento.institution,
    address: edicao.local?.cidade ?? "Brasil",
  },
  image: [edicao.image || evento.coverImage],
  organizer: { "@type": "Organization", name: evento.institution, url: evento.content.officialLink || undefined },
  url: urlDoEvento(evento.slug),
});

/**
 * Dados estruturados: cada edição (evento com edições, como Minas Summit e CodeXperience) vira um `Event`;
 * formações sem edição (bootcamps, cursos) viram `Course`, com a instituição como provedora.
 */
export function jsonLdDoEvento(evento: BootcampEvent): Record<string, unknown> {
  const comData = (evento.content.editions ?? []).filter((e) => ehDataIso(e.data) || /^\d{4}$/.test(e.year));
  const curso = {
    "@type": "Course",
    name: evento.title,
    description: resumir(evento.description, 300),
    provider: { "@type": "Organization", name: evento.institution, sameAs: evento.content.officialLink || undefined },
    image: evento.coverImage,
    inLanguage: "pt-BR",
    url: urlDoEvento(evento.slug),
  };
  const nos = comData.length ? comData.map((e) => eventoDaEdicao(evento, e)) : [curso];
  return { "@context": "https://schema.org", "@graph": nos };
}

/* Troca o content de uma metatag (aceita a tag quebrada em várias linhas); falha alto se ela sumir do index.html. */
function trocarMeta(html: string, atributo: "name" | "property", nome: string, valor: string): string {
  const re = new RegExp(`(<meta\\s+${atributo}="${nome}"\\s+content=")[^"]*(")`);
  if (!re.test(html)) throw new Error(`prerender: <meta ${atributo}="${nome}"> não encontrada no index.html`);
  return html.replace(re, `$1${escapar(valor)}$2`);
}

function trocarCanonical(html: string, url: string): string {
  const re = /(<link\s+rel="canonical"\s+href=")[^"]*(")/;
  if (!re.test(html)) throw new Error('prerender: <link rel="canonical"> não encontrado no index.html');
  return html.replace(re, `$1${url}$2`);
}

/* JSON dentro de <script>: "<" vira < para nenhum texto fechar a tag. */
const jsonParaScript = (dados: unknown) => JSON.stringify(dados).replace(/</g, "\\u003c");

export function montarPaginaDoEvento(html: string, evento: BootcampEvent): string {
  const url = urlDoEvento(evento.slug);
  const descricao = resumir(evento.description);
  let saida = html.replace(/<title>[^<]*<\/title>/, `<title>${escapar(evento.title)} | learnTECH</title>`);
  saida = trocarMeta(saida, "name", "description", descricao);
  saida = trocarMeta(saida, "property", "og:title", `${evento.title} — Bootcamps learnTECH`);
  saida = trocarMeta(saida, "property", "og:description", descricao);
  saida = trocarMeta(saida, "property", "og:url", url);
  saida = trocarMeta(saida, "property", "og:image", evento.coverImage);
  saida = trocarCanonical(saida, url);
  const extras = [
    `    <meta property="og:image:alt" content="${escapar(evento.altText)}" />`,
    `    <script type="application/ld+json">${jsonParaScript(jsonLdDoEvento(evento))}</script>`,
  ].join("\n");
  return saida.replace("</head>", `${extras}\n  </head>`);
}

/* 404.html: o próprio index.html (o React mostra o NotFound), com noindex e sem canonical. A Vercel serve com status 404. */
export function montarPagina404(html: string): string {
  if (!html.includes("</head>")) throw new Error("prerender: </head> não encontrado no index.html");
  return html
    .replace(/\s*<link\s+rel="canonical"[^>]*>/, "")
    .replace(/<title>[^<]*<\/title>/, "<title>Página não encontrada | learnTECH</title>")
    .replace("</head>", '    <meta name="robots" content="noindex" />\n  </head>');
}
