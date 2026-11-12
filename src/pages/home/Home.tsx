/* Home.tsx — listagem dos eventos, separada entre concluídos e metas de estudo, com filtro na URL. */

import { useSearchParams } from "react-router-dom";
import { useEvents } from "../../entities/event/model/useEvents";
import { EventCard } from "../../entities/event/ui/EventCard";
import { useDocumentTitle } from "./../../shared/ui/lib/hooks/useDocumentTitle";
import {
  EventFilter,
  FILTRO_VAZIO,
  filtrarEventos,
  filtroAtivo,
  filtroParaParametros,
  lerFiltro,
  type FiltroEventos,
} from "../../features/event-filter";

export const Home = () => {
  const { events, isLoading, error } = useEvents();
  useDocumentTitle("Eventos");
  const [parametros, setParametros] = useSearchParams();
  const filtro = lerFiltro(parametros);

  /* replace: trocar de filtro não empilha histórico; o Voltar do detalhe cai na Home já filtrada. */
  const aplicarFiltro = (novo: FiltroEventos) => setParametros(filtroParaParametros(novo), { replace: true });

  const concluidos = events.filter((evento) => evento.status === "concluido");
  const metas = events.filter((evento) => evento.status === "desejado");
  const visiveis = filtrarEventos(events, filtro);

  if (isLoading) {
    return (
      /* Ocupa a tela inteira enquanto carrega: com h-64 o rodapé aparecia no meio da tela do celular
         e saltava quando os eventos chegavam (CLS 0,52 com rede lenta, #79). */
      <div className="flex justify-center items-center min-h-screen" aria-live="polite">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-brand-primary" />
        <span className="sr-only">Carregando eventos</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4 text-center" role="alert">
        <p className="text-zinc-300 text-lg">{error}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="px-6 py-3 rounded-xl border border-zinc-700 text-zinc-200 hover:bg-zinc-800 transition-colors"
        >
          Tentar de novo
        </button>
      </div>
    );
  }

  return (
    <section>
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">Eventos learnTECH</h1>
        <p className="text-zinc-400 mt-2 text-lg">
          Bootcamps, formações e encontros que atravessaram minha jornada técnica —{" "}
          <span className="text-emerald-400 font-semibold">{concluidos.length} concluídos</span> e{" "}
          <span className="text-amber-400 font-semibold">{metas.length} no radar</span>.
        </p>
      </header>

      <EventFilter eventos={events} filtro={filtro} aoMudar={aplicarFiltro} />

      <p className="sr-only" aria-live="polite">
        {visiveis.length === 1 ? "1 evento encontrado" : `${visiveis.length} eventos encontrados`}
      </p>

      {visiveis.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-4 py-16 text-center border border-dashed border-zinc-800 rounded-3xl">
          <p className="text-zinc-300 text-lg">Nenhum evento com essa busca ou esses filtros.</p>
          <button
            type="button"
            onClick={() => aplicarFiltro(FILTRO_VAZIO)}
            className="px-6 py-3 rounded-xl border border-zinc-700 text-zinc-200 hover:bg-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            Limpar filtros
          </button>
        </div>
      )}

      {visiveis.length > 0 && filtroAtivo(filtro) && (
        <div className="mb-8 -mt-6">
          <button
            type="button"
            onClick={() => aplicarFiltro(FILTRO_VAZIO)}
            className="text-sm text-zinc-400 underline underline-offset-4 hover:text-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
          >
            Limpar filtros
          </button>
        </div>
      )}

      {[
        { titulo: "Concluídos", lista: visiveis.filter((evento) => evento.status === "concluido") },
        { titulo: "Metas de estudo", lista: visiveis.filter((evento) => evento.status === "desejado") },
      ]
        .filter((grupo) => grupo.lista.length > 0)
        .map((grupo) => (
          <div key={grupo.titulo} className="mb-16 last:mb-0">
            <div className="flex items-center gap-6 mb-8">
              <h2 className="text-2xl font-bold text-zinc-100 tracking-tight">{grupo.titulo}</h2>
              <span className="text-sm font-mono text-zinc-400">{grupo.lista.length}</span>
              <div className="h-px flex-grow bg-zinc-800/60" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
              {grupo.lista.map((evento) => (
                <EventCard key={evento.id} event={evento} />
              ))}
            </div>
          </div>
        ))}
    </section>
  );
};

/* Fim de Home.tsx */
