// src/pages/detail/Detail.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { useEventBySlug } from '../../entities/event/model/useEventBySlug';
import { Badge } from '../../entities/event/ui/badge/Badge';

import { VideoPlayer } from '../../shared/ui/videoPlayer/VideoPlayer';
import { EventGallery } from '../../shared/ui/eventGallery/EventGallery';

export const Detail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { event, loading } = useEventBySlug(slug);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-zinc-500 font-mono animate-pulse">
        Carregando dados da ByteClass...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-zinc-400">
        <h2 className="text-2xl font-bold mb-2 text-white">Jornada não encontrada</h2>
        <button onClick={() => navigate('/')} className="px-6 py-2 bg-zinc-800 text-white rounded-full border border-zinc-700">
          Voltar para Home
        </button>
      </div>
    );
  }

  // Normalização do status para os componentes compartilhados
  const currentStatus = event.status === 'concluido' ? 'completed' : 'desired';

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 animate-in fade-in duration-700 font-sans">
      {/* Botão Voltar */}
      <button onClick={() => navigate(-1)} className="mb-8 flex items-center gap-2 text-zinc-500 hover:text-brand-primary transition-colors group">
        <span className="group-hover:-translate-x-1 transition-transform">←</span> Voltar
      </button>

      {/* Header */}
      <header className="mb-12 space-y-6">
        <div className="flex items-center gap-3">
          <Badge>{event.category}</Badge>
          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${currentStatus === 'completed'
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
            : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
            }`}>
            {currentStatus === 'completed' ? '✓ Concluído' : '★ Desejado'}
          </span>
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter">{event.title}</h1>
        <p className="text-xl text-zinc-400 leading-relaxed max-w-3xl">{event.description}</p>
      </header>

      {/* --- SOLUÇÃO TÓPICO 4.3: MEDIA CENTER --- */}
      <section className="mb-16 space-y-10">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-zinc-100 italic tracking-tight">Media Center</h2>
          <div className="h-px flex-grow bg-zinc-800"></div>
        </div>

        {/* Acesso corrigido via event.content.videoUrl */}
        {event.content.videoUrl && (
          <div className="w-full">
            <VideoPlayer url={event.content.videoUrl} status={event.status === 'concluido' ? 'completed' : 'desired'} />
          </div>
        )}

        {/* Acesso corrigido via event.content.gallery */}
        {event.content.gallery && event.content.gallery.length > 0 && (
          <div className="pt-4">
            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-[0.2em] mb-4">
              Highlights da Jornada
            </h3>
            <EventGallery media={event.content.gallery} />
          </div>
        )}
      </section>
      {/* ---------------------------------------- */}

      {/* Seção de Currículo (Já existente) */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-zinc-100">
            {currentStatus === 'completed' ? 'O que eu aprendi' : 'O que pretendo aprender'}
          </h2>
          <div className="h-px flex-grow bg-zinc-800"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {event.content.curriculum.map((item, index) => (
            <div key={index} className="flex items-center gap-4 p-5 bg-zinc-900/40 border border-zinc-800 rounded-2xl">
              <span className="text-brand-primary font-mono font-bold">{(index + 1).toString().padStart(2, '0')}</span>
              <span className="text-zinc-300 font-medium">{item}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};