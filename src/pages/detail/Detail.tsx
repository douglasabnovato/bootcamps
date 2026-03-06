// src/pages/detail/Detail.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEventBySlug } from '../../entities/event/model/useEventBySlug';
import { Badge } from '../../entities/event/ui/badge/Badge';
import { VideoPlayer } from '../../shared/ui/videoPlayer/VideoPlayer';
import { EventGallery } from '../../shared/ui/eventGallery/EventGallery';

export const Detail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { event, loading } = useEventBySlug(slug);

  if (loading || !event) return <div className="text-zinc-500 p-20 text-center font-mono">ByteClass Loading...</div>;

  const currentStatus = event.status === 'concluido' ? 'completed' : 'desired';

  return (
    <div className="min-h-screen bg-zinc-950 font-sans pb-20">
      {/* 4.4 Transition Header */}
      <motion.div layoutId={`card-${event.id}`} className="relative w-full h-[50vh] overflow-hidden">
        <motion.img 
          layoutId={`image-${event.id}`}
          src={event.coverImage} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent" />
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-8 left-8 p-3 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-brand-primary transition-colors"
        >
          ← Voltar
        </button>
      </motion.div>

      {/* Conteúdo com Entrada Suave */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="max-w-4xl mx-auto px-6 -mt-20 relative z-10"
      >
        <header className="mb-12 space-y-6">
          <div className="flex items-center gap-3">
            <Badge>{event.category}</Badge>
            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
              currentStatus === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
            }`}>
              {currentStatus === 'completed' ? '✓ Concluído' : '★ Desejado'}
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black text-white tracking-tighter leading-none">{event.title}</h1>
          <p className="text-xl text-zinc-400 leading-relaxed max-w-3xl">{event.description}</p>
        </header>

        {/* 4.3 Media Center Integrado */}
        <section className="mb-16 space-y-10">
          <div className="flex items-center gap-4"><h2 className="text-2xl font-bold text-zinc-100 italic">Media Center</h2><div className="h-px flex-grow bg-zinc-800"></div></div>
          {event.content.videoUrl && <VideoPlayer url={event.content.videoUrl} status={currentStatus} />}
          {event.content.gallery && <EventGallery media={event.content.gallery} />}
        </section>

        {/* Currículo */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold text-zinc-100">{currentStatus === 'completed' ? 'O que eu aprendi' : 'O que pretendo aprender'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {event.content.curriculum.map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-5 bg-zinc-900/40 border border-zinc-800 rounded-2xl">
                <span className="text-brand-primary font-mono font-bold">{(index + 1).toString().padStart(2, '0')}</span>
                <span className="text-zinc-300 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </section>
      </motion.div>
    </div>
  );
};