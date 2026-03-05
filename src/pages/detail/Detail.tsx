import { useParams, useNavigate } from 'react-router-dom';
import { useEventBySlug } from '../../entities/event/model/useEventBySlug';
import { Badge } from '../../entities/event/ui/badge/Badge';

export const Detail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const event = useEventBySlug(slug);

  // Fallback caso o slug não exista ou ocorra erro de digitação na URL
  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-zinc-400">
        <p className="mb-4 text-lg font-medium">Jornada não encontrada.</p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
        >
          Voltar para Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <header className="mb-12 space-y-6">
        <div className="flex items-center gap-4">
          <Badge>{event.category}</Badge>
          <span className="text-xs font-mono text-zinc-500 uppercase">{event.institution}</span>
        </div>

        <h1 className="text-5xl font-extrabold text-white tracking-tight leading-tight">
          {event.title}
        </h1>

        <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl">
          {event.description}
        </p>
      </header>

      {/* Grade de Conteúdo / Ementa do Bootcamp */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
          <span className="w-8 h-px bg-brand-primary"></span>
          Ementa da Formação
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {event.content.curriculum.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-5 bg-zinc-900/40 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-colors"
            >
              <span className="text-brand-primary font-mono font-bold text-lg">
                {(index + 1).toString().padStart(2, '0')}
              </span>
              <span className="text-zinc-300 font-medium">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer da Página */}
      <footer className="mt-16 pt-8 border-t border-zinc-800">
        <button
          onClick={() => navigate(-1)}
          className="text-zinc-500 hover:text-brand-primary transition-colors flex items-center gap-2"
        >
          ← Retornar à trilha principal
        </button>
      </footer>
    </div>
  );
};