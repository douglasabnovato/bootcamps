/* Home.tsx — listagem dos eventos, separada entre concluídos e metas de estudo. */

import { useEvents } from '../../entities/event/model/useEvents';
import { EventCard } from '../../entities/event/ui/EventCard';
import { useDocumentTitle } from './../../shared/ui/lib/hooks/useDocumentTitle';

export const Home = () => {
  const { events, isLoading, error } = useEvents();
  useDocumentTitle('Eventos');

  const concluidos = events.filter((evento) => evento.status === 'concluido');
  const metas = events.filter((evento) => evento.status === 'desejado');

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64" aria-live="polite">
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
          Bootcamps, formações e encontros que atravessaram minha jornada técnica —{' '}
          <span className="text-emerald-400 font-semibold">{concluidos.length} concluídos</span> e{' '}
          <span className="text-amber-400 font-semibold">{metas.length} no radar</span>.
        </p>
      </header>

      {[
        { titulo: 'Concluídos', lista: concluidos },
        { titulo: 'Metas de estudo', lista: metas },
      ]
        .filter((grupo) => grupo.lista.length > 0)
        .map((grupo) => (
          <div key={grupo.titulo} className="mb-16 last:mb-0">
            <div className="flex items-center gap-6 mb-8">
              <h2 className="text-2xl font-bold text-zinc-100 tracking-tight">{grupo.titulo}</h2>
              <span className="text-sm font-mono text-zinc-500">{grupo.lista.length}</span>
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
