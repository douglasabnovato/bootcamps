import { useParams, useNavigate } from 'react-router-dom';
import { useEventBySlug } from '../../entities/event/model/useEventBySlug';
import { Badge } from '../../entities/event/ui/badge/Badge';

export const Detail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const event = useEventBySlug(slug);

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-zinc-400">
        <h2 className="text-2xl font-bold mb-2">Evento não encontrado</h2>
        <p className="mb-6 opacity-60 text-center max-w-xs">
          Esta jornada ainda não foi mapeada no ecossistema learnTECH.
        </p>
        <button 
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-zinc-800 text-white rounded-full hover:bg-zinc-700 transition-all border border-zinc-700"
        >
          Voltar para Home
        </button>
      </div>
    );
  }

  // Lógica de diferenciação de Status
  const isConcluido = event.status === 'concluido';
  
  const statusTheme = isConcluido 
    ? {
        label: '✓ Concluído',
        styles: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        title: 'O que eu aprendi'
      }
    : {
        label: '★ Desejado',
        styles: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        title: 'O que pretendo aprender'
      };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 animate-in fade-in duration-700">
      
      {/* Navegação Voltar */}
      <button 
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2 text-zinc-500 hover:text-brand-primary transition-colors group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span>
        Voltar para a jornada
      </button>

      <header className="mb-16 space-y-6">
        <div className="flex items-center gap-3">
          <Badge>{event.category}</Badge>
          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${statusTheme.styles}`}>
            {statusTheme.label}
          </span>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter">
            {event.title}
          </h1>
          <p className="text-sm font-mono text-zinc-500 uppercase tracking-widest">
            By <span className="text-zinc-300">{event.institution}</span>
          </p>
        </div>
        
        <p className="text-xl text-zinc-400 leading-relaxed max-w-3xl">
          {event.description}
        </p>
      </header>

      {/* Seção de Ementa */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-zinc-100">{statusTheme.title}</h2>
          <div className="h-px flex-grow bg-zinc-800"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {event.content.curriculum.map((item, index) => (
            <div 
              key={index} 
              className="flex items-center gap-4 p-5 bg-zinc-900/40 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-all"
            >
              <span className="text-brand-primary font-mono font-bold text-lg">
                {(index + 1).toString().padStart(2, '0')}
              </span>
              <span className="text-zinc-300 font-medium">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Detalhes Profundos e Link Oficial */}
      <section className="mt-20 pt-12 border-t border-zinc-900 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Sobre o treinamento</h3>
          <p className="text-zinc-400 leading-relaxed italic">
            "{event.content.longDescription}"
          </p>
        </div>
        
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Links e Recursos</h3>
          <a 
            href={event.content.officialLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-zinc-100 text-black font-bold rounded-xl hover:bg-brand-primary transition-all"
          >
            Site Oficial ↗
          </a>
          {event.content.videoUrl && (
            <a 
              href={event.content.videoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-center text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Ver vídeo de apresentação
            </a>
          )}
        </div>
      </section>
    </div>
  );
};