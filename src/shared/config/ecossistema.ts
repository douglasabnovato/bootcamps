/* ecossistema.ts — endereço público de cada site do ecossistema learnTECH e o resolvedor de relacionados.
   A API (learntech-content, scripts/lib/conteudo.ts → SITES e indiceDoEcossistema) já publica url e titulo prontos;
   a cópia local (events.data.ts) traz só { tipo, id }. Este resolvedor é a reserva para a seção "Veja também"
   não sumir sem a API. O ideal é o gerador de cópias exportar url e titulo e este arquivo virar só fallback. */

export const ECOSSISTEMA = {
  "learn-tech": "https://learn-tech-pied.vercel.app",
  bootcamps: "https://bootcamps-dun.vercel.app",
  career: "https://douglasabnovato.github.io/career",
  tools: "https://douglasabnovato.github.io/tools",
} as const;

export type ProjetoEcossistema = keyof typeof ECOSSISTEMA;

export interface RelacionadoBruto {
  tipo: string;
  id: string;
  projeto?: string;
  titulo?: string;
  url?: string;
}

export interface RelacionadoResolvido {
  tipo: string;
  id: string;
  projeto: string;
  titulo: string;
  url: string;
  /* Caminho dentro deste próprio site (eventos), para navegar sem abrir aba nova. */
  caminhoInterno?: string;
}

const TIPOS_CAREER = ["empresas", "vagas", "perfis"];
const TIPOS_TOOLS = ["ferramentas", "hospedagens"];

/* "escolher-formacao-dev" → "Escolher formacao dev": rótulo provisório quando a cópia não traz o título. */
function slugParaTexto(slug: string): string {
  const texto = slug.replace(/[-_]+/g, " ").trim();
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

/* Monta projeto e URL a partir de tipo + id. Tipo desconhecido devolve null (o item não aparece). */
function montarAlvo(
  tipo: string,
  id: string,
): { projeto: ProjetoEcossistema; url: string; rotulo: string; caminhoInterno?: string } | null {
  const idUrl = encodeURIComponent(id);
  if (tipo === "programas") {
    // A cópia não traz o categoryFilter do programa, então não dá para montar /program/<categoria>/<id>: vai ao catálogo.
    return { projeto: "learn-tech", url: `${ECOSSISTEMA["learn-tech"]}/programs`, rotulo: `Programa ${id} no catálogo` };
  }
  if (tipo === "blog") {
    return { projeto: "learn-tech", url: `${ECOSSISTEMA["learn-tech"]}/blog/${idUrl}`, rotulo: `Artigo: ${slugParaTexto(id)}` };
  }
  if (tipo === "eventos") {
    return {
      projeto: "bootcamps",
      url: `${ECOSSISTEMA.bootcamps}/event/${idUrl}`,
      rotulo: slugParaTexto(id),
      caminhoInterno: `/event/${idUrl}`,
    };
  }
  if (TIPOS_CAREER.includes(tipo)) {
    return { projeto: "career", url: `${ECOSSISTEMA.career}/detalhe.html?tipo=${tipo}&id=${idUrl}`, rotulo: slugParaTexto(id) };
  }
  if (TIPOS_TOOLS.includes(tipo)) {
    return { projeto: "tools", url: `${ECOSSISTEMA.tools}/detalhe.html?id=${idUrl}`, rotulo: slugParaTexto(id) };
  }
  return null;
}

/* Usa url/titulo/projeto da API quando existirem; senão, monta a partir de tipo + id.
   `tituloLocal` permite trocar o rótulo provisório por um título conhecido (ex.: nome de outro evento). */
export function resolverRelacionado(
  relacionado: RelacionadoBruto,
  tituloLocal?: (tipo: string, id: string) => string | undefined,
): RelacionadoResolvido | null {
  const alvo = montarAlvo(relacionado.tipo, relacionado.id);
  const url = relacionado.url ?? alvo?.url;
  if (!url) return null;

  return {
    tipo: relacionado.tipo,
    id: relacionado.id,
    projeto: relacionado.projeto ?? alvo?.projeto ?? "",
    titulo: relacionado.titulo ?? tituloLocal?.(relacionado.tipo, relacionado.id) ?? alvo?.rotulo ?? relacionado.id,
    url,
    // Só navega por dentro quando a URL é a montada aqui (ou aponta para este mesmo site).
    caminhoInterno: alvo?.caminhoInterno && url === alvo.url ? alvo.caminhoInterno : undefined,
  };
}

/* Resolve a lista inteira, descartando o que não tem destino e repetições de tipo + id. */
export function resolverRelacionados(
  relacionados: RelacionadoBruto[] | undefined,
  tituloLocal?: (tipo: string, id: string) => string | undefined,
): RelacionadoResolvido[] {
  const vistos = new Set<string>();
  const saida: RelacionadoResolvido[] = [];
  for (const r of relacionados ?? []) {
    const chave = `${r.tipo}:${r.id}`;
    if (vistos.has(chave)) continue;
    const resolvido = resolverRelacionado(r, tituloLocal);
    if (!resolvido) continue;
    vistos.add(chave);
    saida.push(resolvido);
  }
  return saida;
}

/* Fim de ecossistema.ts */
