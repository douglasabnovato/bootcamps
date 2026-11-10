/* index.ts — API pública da feature de filtro de eventos (Home). */

export { EventFilter } from "./ui/EventFilter";
export {
  BUSCA_MAXIMA,
  FILTRO_VAZIO,
  ROTULO_CATEGORIA,
  buscarEventos,
  filtrarEventos,
  filtroAtivo,
  filtroParaParametros,
  lerFiltro,
  type FiltroEventos,
} from "./model/filtrarEventos";
