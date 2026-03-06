import { useParams, useNavigate } from 'react-router-dom';
import { useEventBySlug } from '../../entities/event/model/useEventBySlug';
import { Badge } from '../../entities/event/ui/badge/Badge';

export const Detail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // AQUI ESTÁ A CHAVE: O hook agora retorna um objeto com o estado de loading
  const { event, loading } = useEventBySlug(slug);

  // 1. Enquanto a "API" está processando os 300ms de delay
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-zinc-500 font-mono animate-pulse">
        Carregando dados da ByteClass...
      </div>
    );
  }

  // 2. Só verificamos se o evento existe APÓS o carregamento terminar
  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-zinc-400 font-sans">
        <h2 className="text-2xl font-bold mb-2 text-white">Jornada não encontrada</h2>
        <p className="mb-6 opacity-60">Verifique o slug ou retorne à listagem principal.</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-zinc-800 text-white rounded-full hover:bg-zinc-700 transition-all border border-zinc-700"
        >
          Voltar para Home
        </button>
      </div>
    );
  }

  const isConcluido = event.status === 'concluido';
  const statusTheme = isConcluido
    ? { label: '✓ Concluído', styles: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' }
    : { label: '★ Desejado', styles: 'bg-amber-500/10 text-amber-400 border-amber-500/20' };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 animate-in fade-in duration-700 font-sans">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2 text-zinc-500 hover:text-brand-primary transition-colors group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span>
        Voltar
      </button>

      <header className="mb-16 space-y-6">
        <div className="flex items-center gap-3">
          <Badge>{event.category}</Badge>
          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${statusTheme.styles}`}>
            {statusTheme.label}
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter">
          {event.title}
        </h1>

        <p className="text-xl text-zinc-400 leading-relaxed max-w-3xl">
          {event.description}
        </p>
      </header>

      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-zinc-100">
            {isConcluido ? 'O que eu aprendi' : 'O que pretendo aprender'}
          </h2>
          <div className="h-px flex-grow bg-zinc-800"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {event.content.curriculum.map((item, index) => (
            <div key={index} className="flex items-center gap-4 p-5 bg-zinc-900/40 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-colors">
              <span className="text-brand-primary font-mono font-bold">
                {(index + 1).toString().padStart(2, '0')}
              </span>
              <span className="text-zinc-300 font-medium">{item}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};