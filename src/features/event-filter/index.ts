/* index.ts — API pública da feature de filtro de eventos (Home). */

export { EventFilter } from "./ui/EventFilter";
export {
  FILTRO_VAZIO,
  ROTULO_CATEGORIA,
  filtrarEventos,
  filtroAtivo,
  filtroParaParametros,
  lerFiltro,
  type FiltroEventos,
} from "./model/filtrarEventos";
