/* filtrarEventos.ts — regra pura do filtro da Home: status, categoria e busca por texto, lidos da URL e aplicados à lista. */

import { ROTULO_CATEGORIA, type BootcampEvent, type EventCategory, type EventStatus } from "../../../entities/event/model/types";

export { ROTULO_CATEGORIA };

export type FiltroStatus = "todos" | EventStatus;
export type FiltroCategoria = "todas" | EventCategory;

export interface FiltroEventos {
  status: FiltroStatus;
  categoria: FiltroCategoria;
  /* Texto digitado na busca (título e instituição). Ausente ou só espaços = sem busca. */
  busca?: string;
}

/* Limite da busca vinda da URL: evita um ?q= gigante. */
export const BUSCA_MAXIMA = 100;

export const FILTRO_VAZIO: FiltroEventos = { status: "todos", categoria: "todas" };

const STATUS_VALIDOS: readonly EventStatus[] = ["concluido", "desejado"];
const CATEGORIAS_VALIDAS: readonly EventCategory[] = ["frontend", "backend", "fullstack", "mobile", "outros"];

/* Lê ?status=&categoria=&q= da URL; valor desconhecido vira "todos"/"todas" em vez de esvaziar a lista. */
export function lerFiltro(parametros: URLSearchParams): FiltroEventos {
  const status = parametros.get("status");
  const categoria = parametros.get("categoria");
  const busca = (parametros.get("q") ?? "").slice(0, BUSCA_MAXIMA);
  const filtro: FiltroEventos = {
    status: STATUS_VALIDOS.includes(status as EventStatus) ? (status as EventStatus) : "todos",
    categoria: CATEGORIAS_VALIDAS.includes(categoria as EventCategory) ? (categoria as EventCategory) : "todas",
  };
  if (busca.trim()) filtro.busca = busca;
  return filtro;
}

/* Devolve os parâmetros da URL para o filtro, omitindo o que for "todos"/"todas" (URL limpa no padrão). */
export function filtroParaParametros(filtro: FiltroEventos): Record<string, string> {
  const parametros: Record<string, string> = {};
  if (filtro.status !== "todos") parametros.status = filtro.status;
  if (filtro.categoria !== "todas") parametros.categoria = filtro.categoria;
  if (filtro.busca?.trim()) parametros.q = filtro.busca.slice(0, BUSCA_MAXIMA);
  return parametros;
}

export function filtroAtivo(filtro: FiltroEventos): boolean {
  return filtro.status !== "todos" || filtro.categoria !== "todas" || Boolean(filtro.busca?.trim());
}

/* Minúsculas e sem acento: "Formação" e "FORMACAO" viram "formacao". */
export function normalizarTexto(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

/* Busca por título e instituição, sem diferença de acento e caixa. Cada palavra precisa aparecer em algum dos dois. */
export function buscarEventos(eventos: BootcampEvent[], busca: string | undefined): BootcampEvent[] {
  const termos = normalizarTexto(busca ?? "")
    .split(/\s+/)
    .filter(Boolean);
  if (termos.length === 0) return eventos;
  return eventos.filter((evento) => {
    const alvo = normalizarTexto(`${evento.title} ${evento.institution}`);
    return termos.every((termo) => alvo.includes(termo));
  });
}

/* Aplica status, categoria e busca juntos, sem mudar a ordem original da lista. */
export function filtrarEventos(eventos: BootcampEvent[], filtro: FiltroEventos): BootcampEvent[] {
  return buscarEventos(eventos, filtro.busca).filter(
    (evento) =>
      (filtro.status === "todos" || evento.status === filtro.status) &&
      (filtro.categoria === "todas" || evento.category === filtro.categoria),
  );
}

/* Contagem por categoria respeitando o status escolhido, na ordem do schema e só com categorias presentes. */
export function contarPorCategoria(eventos: BootcampEvent[], status: FiltroStatus): { categoria: EventCategory; total: number }[] {
  const daLista = filtrarEventos(eventos, { status, categoria: "todas" });
  return CATEGORIAS_VALIDAS.map((categoria) => ({
    categoria,
    total: daLista.filter((evento) => evento.category === categoria).length,
  })).filter((item) => eventos.some((evento) => evento.category === item.categoria));
}

/* Contagem por status respeitando a categoria escolhida. */
export function contarPorStatus(eventos: BootcampEvent[], categoria: FiltroCategoria): Record<FiltroStatus, number> {
  const daLista = filtrarEventos(eventos, { status: "todos", categoria });
  return {
    todos: daLista.length,
    concluido: daLista.filter((evento) => evento.status === "concluido").length,
    desejado: daLista.filter((evento) => evento.status === "desejado").length,
  };
}

/* Fim de filtrarEventos.ts */
