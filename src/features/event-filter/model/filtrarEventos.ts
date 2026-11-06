/* filtrarEventos.ts — regra pura do filtro da Home: status e categoria, lidos da URL e aplicados à lista. */

import { ROTULO_CATEGORIA, type BootcampEvent, type EventCategory, type EventStatus } from "../../../entities/event/model/types";

export { ROTULO_CATEGORIA };

export type FiltroStatus = "todos" | EventStatus;
export type FiltroCategoria = "todas" | EventCategory;

export interface FiltroEventos {
  status: FiltroStatus;
  categoria: FiltroCategoria;
}

export const FILTRO_VAZIO: FiltroEventos = { status: "todos", categoria: "todas" };

const STATUS_VALIDOS: readonly EventStatus[] = ["concluido", "desejado"];
const CATEGORIAS_VALIDAS: readonly EventCategory[] = ["frontend", "backend", "fullstack", "mobile", "outros"];

/* Lê ?status=&categoria= da URL; valor desconhecido vira "todos"/"todas" em vez de esvaziar a lista. */
export function lerFiltro(parametros: URLSearchParams): FiltroEventos {
  const status = parametros.get("status");
  const categoria = parametros.get("categoria");
  return {
    status: STATUS_VALIDOS.includes(status as EventStatus) ? (status as EventStatus) : "todos",
    categoria: CATEGORIAS_VALIDAS.includes(categoria as EventCategory) ? (categoria as EventCategory) : "todas",
  };
}

/* Devolve os parâmetros da URL para o filtro, omitindo o que for "todos"/"todas" (URL limpa no padrão). */
export function filtroParaParametros(filtro: FiltroEventos): Record<string, string> {
  const parametros: Record<string, string> = {};
  if (filtro.status !== "todos") parametros.status = filtro.status;
  if (filtro.categoria !== "todas") parametros.categoria = filtro.categoria;
  return parametros;
}

export function filtroAtivo(filtro: FiltroEventos): boolean {
  return filtro.status !== "todos" || filtro.categoria !== "todas";
}

/* Aplica status e categoria juntos, sem mudar a ordem original da lista. */
export function filtrarEventos(eventos: BootcampEvent[], filtro: FiltroEventos): BootcampEvent[] {
  return eventos.filter(
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
