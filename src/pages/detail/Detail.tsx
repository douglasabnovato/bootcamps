// src/pages/detail/Detail.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

import { useEventBySlug } from '../../entities/event/model/useEventBySlug';
import { Badge } from '../../entities/event/ui/badge/Badge';
import { useDocumentTitle } from './../../shared/ui/lib/hooks/useDocumentTitle';

import { DetailSkeleton } from './DetailSkeleton';
import { NotFound } from '../notFound/NotFound';

// Shared Components
import { VideoPlayer } from '../../shared/ui/videoPlayer/VideoPlayer';
import { EventGallery } from '../../shared/ui/eventGallery/EventGallery';
import { CTAButton } from '../../shared/ui/ctaButton/CTAButton';

export const Detail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { event, loading } = useEventBySlug(slug);
  useDocumentTitle(event ? event.title : "Carregando Jornada...");

  if (loading) return <DetailSkeleton />;
  if (!event) return <NotFound />;

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-zinc-400">
        <h2 className="text-2xl font-bold mb-4 text-white">Jornada não encontrada</h2>
        <button
          onClick={() => navigate('/')}
          className="px-8 py-3 bg-zinc-800 text-white rounded-full border border-zinc-700 hover:bg-zinc-700 transition-all"
        >
          Voltar para Home
        </button>
      </div>
    );
  }

  const currentStatus = event.status === 'concluido' ? 'completed' : 'desired';

  return (
    <>
      <Helmet>
        <title>{event.title} | learnTECH</title>
        <meta name="description" content={event.description} />

        {/* Open Graph / Facebook / LinkedIn */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${event.title} - Projeto Bootcamps`} />
        <meta property="og:description" content={event.description} />
        <meta property="og:image" content={event.coverImage} />
        <meta property="og:url" content={window.location.href} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={event.title} />
        <meta name="twitter:image" content={event.coverImage} />
      </Helmet>
      <main className="min-h-screen bg-zinc-950 font-sans pb-32">
        <header>
          <motion.div
            layoutId={`card-${event.id}`}
            className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden"
          >
            <motion.img
              layoutId={`image-${event.id}`}
              src={event.coverImage}
              alt={event.altText}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

            <button
              onClick={() => navigate(-1)}
              aria-label="Voltar para a listagem"
              className="absolute top-8 left-8 p-4 bg-black/40 backdrop-blur-xl rounded-full text-white border border-white/10 hover:bg-brand-primary hover:border-brand-primary transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-4 focus-visible:ring-offset-zinc-950"
            >
              <span className="group-hover:-translate-x-1 inline-block transition-transform">←</span> Voltar
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
            className="max-w-5xl mx-auto px-6 -mt-32 relative z-10"
          >
            <div className="flex items-center gap-4">
              <Badge>{event.category}</Badge>
              <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.15em] border ${currentStatus === 'completed'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                }`}>
                {currentStatus === 'completed' ? '✓ Bootcamp Concluído' : '★ Meta de Estudo'}
              </span>
              <span className="text-zinc-500 font-mono text-sm border-l border-zinc-800 pl-4">
                {event.institution}
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] drop-shadow-2xl">
              {event.title}
            </h1>

            <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed max-w-4xl font-light">
              {event.content.longDescription || event.description}
            </p>
          </motion.div>
        </header>
        <motion.div>
          <section aria-labelledby="media-title" className="mb-24 space-y-12">
            <div className="flex items-center gap-6">
              <h2 className="text-3xl font-bold text-zinc-100 italic tracking-tight">Media Center</h2>
              <div className="h-px flex-grow bg-zinc-800/50"></div>
            </div>

            {event.content.videoUrl && (
              <div className="w-full">
                <VideoPlayer url={event.content.videoUrl} status={currentStatus} />
              </div>
            )}

            {event.content.gallery && event.content.gallery.length > 0 && (
              <div className="pt-6">
                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.3em] mb-8">
                  Highlights da Jornada
                </h3>
                <EventGallery media={event.content.gallery} />
              </div>
            )}
          </section>

          <section aria-labelledby="curriculum-title" className="mb-24 space-y-10">
            <div className="flex items-center gap-6">
              <h2 className="text-3xl font-bold text-zinc-100">
                {currentStatus === 'completed' ? 'Ementa Dominada' : 'Plano de Estudos'}
              </h2>
              <div className="h-px flex-grow bg-zinc-800/50"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {event.content.curriculum.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-5 p-6 bg-zinc-900/40 border border-zinc-800/50 rounded-3xl hover:bg-zinc-900/60 transition-colors"
                >
                  <span className="text-brand-primary font-mono text-lg font-black">
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                  <span className="text-zinc-200 text-lg font-medium">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="pt-10">
            <div className="relative p-1 bg-gradient-to-b from-zinc-700/50 to-transparent rounded-[3rem]">
              <div className="bg-zinc-950 rounded-[2.8rem] p-12 md:p-20 text-center space-y-10 border border-zinc-800/50">
                <div className="space-y-4">
                  <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    {currentStatus === 'completed'
                      ? "Explorar esse Ecossistema"
                      : "Pronto para Conhecer?"}
                  </h3>
                  <p className="text-zinc-500 text-lg max-w-2xl mx-auto font-light">
                    Acesse a plataforma oficial da <span className="text-zinc-300 font-bold">{event.institution}</span> para conferir os conteúdos e programas de formação.
                  </p>
                </div>

                <div className="max-w-md mx-auto">
                  <CTAButton
                    url={event.content.officialLink}
                    status={currentStatus}
                  />
                </div>
              </div>
            </div>
          </section>
        </motion.div>
      </main>
    </>
  );
};