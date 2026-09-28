/* learntechContent.ts — cliente da API learntech-content: busca com tempo limite e resolve caminhos /media/ para URL absoluta. */

export const API_URL: string = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");
const TEMPO_LIMITE_MS = 5000;

/* Busca GET /v1/{caminho}; rejeita quando a API não está configurada, responde erro ou passa do tempo limite. */
export async function buscarRecurso<T>(caminho: string): Promise<T> {
  if (!API_URL) throw new Error("VITE_API_URL não configurada");
  const controle = new AbortController();
  const timer = setTimeout(() => controle.abort(), TEMPO_LIMITE_MS);
  try {
    const r = await fetch(`${API_URL}/v1/${caminho}`, { signal: controle.signal });
    if (!r.ok) throw new Error(`${r.status} em ${caminho}`);
    return (await r.json()) as T;
  } finally {
    clearTimeout(timer);
  }
}

/* Percorre o dado e troca toda string /media/... pela URL completa na API. */
export function resolverMidia<T>(valor: T): T {
  if (typeof valor === "string") return (valor.startsWith("/media/") ? `${API_URL}${valor}` : valor) as T;
  if (Array.isArray(valor)) return valor.map((v) => resolverMidia(v)) as T;
  if (valor && typeof valor === "object") {
    return Object.fromEntries(Object.entries(valor).map(([k, v]) => [k, resolverMidia(v)])) as T;
  }
  return valor;
}

/* Injeta uma vez o script de identificação do ecossistema (nome e e-mail, sem login). */
export function carregarIdentificacao(): void {
  if (!API_URL || document.getElementById("learntech-sdk")) return;
  const s = document.createElement("script");
  s.id = "learntech-sdk";
  s.src = `${API_URL}/sdk/identificacao.js`;
  s.defer = true;
  s.dataset.projeto = "bootcamps";
  s.dataset.privacidade = "https://learn-tech-pied.vercel.app/privacy";
  document.head.appendChild(s);
}

/* Fim de learntechContent.ts */
