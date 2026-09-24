/* Detail.tsx — página do evento: capa, mídia, edições, ementa e chamada final. */

import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

import { useEventBySlug } from '../../entities/event/model/useEventBySlug';
import { Badge } from '../../entities/event/ui/badge/Badge';
import { useDocumentTitle } from './../../shared/ui/lib/hooks/useDocumentTitle';

import { DetailSkeleton } from './DetailSkeleton';
import { NotFound } from '../notFound/NotFound';

import { VideoPlayer } from '../../shared/ui/videoPlayer/VideoPlayer';
import { PDFViewerButton } from '../../shared/ui/pdf/PDFViewerButton';
import { EventGallery } from '../../shared/ui/eventGallery/EventGallery';
import { CTAButton } from '../../shared/ui/ctaButton/CTAButton';

export const Detail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { event, loading } = useEventBySlug(slug);
  useDocumentTitle(event ? event.title : 'Carregando');

  if (loading) return <DetailSkeleton />;
  if (!event) return <NotFound />;

  const concluido = event.status === 'concluido';

  return (
    <>
      <Helmet>
        <title>{event.title} | learnTECH</title>
        <meta name="description" content={event.description} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${event.title} — Bootcamps learnTECH`} />
        <meta property="og:description" content={event.description} />
        <meta property="og:image" content={event.coverImage} />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={event.title} />
        <meta name="twitter:image" content={event.coverImage} />
      </Helmet>

      <article className="max-w-5xl mx-auto pb-24">
        <header>
          <motion.div
            layoutId={`card-${event.id}`}
            className="relative w-full aspect-[16/10] md:aspect-[16/7] overflow-hidden rounded-3xl border border-zinc-800/60"
          >
            <motion.img
              layoutId={`image-${event.id}`}
              src={event.coverImage}
              alt={event.altText}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/10" />

            <button
              onClick={() => navigate(-1)}
              aria-label="Voltar para a listagem"
              className="absolute top-5 left-5 px-4 py-2.5 bg-black/50 backdrop-blur-xl rounded-full text-sm text-white border border-white/10 hover:bg-brand-primary hover:text-zinc-950 hover:border-brand-primary transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-4 focus-visible:ring-offset-zinc-950"
            >
              <span className="group-hover:-translate-x-1 inline-block transition-transform">←</span> Voltar
            </button>

            <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge>{event.category}</Badge>
                <span
                  className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.15em] border ${
                    concluido
                      ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                      : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                  }`}
                >
                  {concluido ? '✓ Concluído' : '★ Meta de estudo'}
                </span>
                <span className="text-zinc-400 font-mono text-xs border-l border-zinc-700 pl-3">
                  {event.institution}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.95] drop-shadow-2xl">
                {event.title}
              </h1>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5, ease: 'easeOut' }}
            className="mt-10 text-lg md:text-xl text-zinc-400 leading-relaxed font-light"
          >
            {event.content.longDescription || event.description}
          </motion.p>
        </header>

        {(event.content.videoUrl || (event.content.gallery && event.content.gallery.length > 0)) && (
          <section aria-labelledby="media-title" className="mt-20 space-y-10">
            <div className="flex items-center gap-6">
              <h2 id="media-title" className="text-2xl md:text-3xl font-bold text-zinc-100 tracking-tight">
                Media Center
              </h2>
              <div className="h-px flex-grow bg-zinc-800/60" />
            </div>

            {event.content.videoUrl && (
              <VideoPlayer url={event.content.videoUrl} title={`Vídeo: ${event.title}`} isCompleted={concluido} />
            )}

            {event.content.gallery && event.content.gallery.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.3em] mb-6">
                  Highlights da jornada
                </h3>
                <EventGallery media={event.content.gallery} />
              </div>
            )}
          </section>
        )}

        {event.content.editions && event.content.editions.length > 0 && (
          <section aria-labelledby="editions-title" className="mt-20 space-y-10">
            <div className="flex items-center gap-6">
              <h2 id="editions-title" className="text-2xl md:text-3xl font-bold text-zinc-100 tracking-tight">
                Edições
              </h2>
              <div className="h-px flex-grow bg-zinc-800/60" />
            </div>

            <ol className="relative border-l border-zinc-800 pl-8 space-y-10">
              {event.content.editions.map((edicao) => {
                const realizada = edicao.status === 'realizado';
                return (
                  <li key={edicao.year} className="relative">
                    <span
                      className={`absolute -left-[41px] top-1.5 w-4 h-4 rounded-full border-2 ${
                        realizada
                          ? 'bg-emerald-500/20 border-emerald-500'
                          : 'bg-amber-500/20 border-amber-500'
                      }`}
                      aria-hidden="true"
                    />
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="font-mono text-xl font-black text-white">{edicao.year}</span>
                      <span
                        className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                          realizada
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        }`}
                      >
                        {realizada ? 'Realizada' : 'Anunciada'}
                      </span>
                    </div>
                    <p className="text-zinc-400 leading-relaxed">{edicao.highlight}</p>
                  </li>
                );
              })}
            </ol>
          </section>
        )}

        {event.content.curriculum.length > 0 && (
          <section aria-labelledby="curriculum-title" className="mt-20 space-y-10">
            <div className="flex items-center gap-6">
              <h2 id="curriculum-title" className="text-2xl md:text-3xl font-bold text-zinc-100 tracking-tight">
                {concluido ? 'Ementa dominada' : 'Plano de estudos'}
              </h2>
              <div className="h-px flex-grow bg-zinc-800/60" />
            </div>

            <ol className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {event.content.curriculum.map((item, index) => (
                <li
                  key={item}
                  className="flex items-start gap-4 p-5 bg-zinc-900/40 border border-zinc-800/50 rounded-2xl hover:bg-zinc-900/60 transition-colors"
                >
                  <span className="text-brand-primary font-mono text-base font-black shrink-0 pt-0.5">
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                  <span className="text-zinc-200 leading-relaxed">{item}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        <section aria-labelledby="cta-title" className="mt-24">
          <div className="bg-zinc-900/30 rounded-3xl p-10 md:p-16 text-center space-y-8 border border-zinc-800/60">
            <div className="space-y-3">
              <h2 id="cta-title" className="text-3xl md:text-4xl font-black text-white tracking-tight">
                {concluido ? 'Explorar esse ecossistema' : 'Pronto para conhecer?'}
              </h2>
              <p className="text-zinc-500 text-lg max-w-2xl mx-auto font-light">
                Acesse a plataforma oficial da{' '}
                <span className="text-zinc-300 font-bold">{event.institution}</span> para conferir os
                conteúdos e programas de formação.
              </p>
            </div>

            <div className="max-w-md mx-auto space-y-4">
              <CTAButton url={event.content.officialLink} isCompleted={concluido} />

              {event.content.certificate && (
                <PDFViewerButton
                  pdfUrl={event.content.certificate}
                  label="Ver certificado"
                  titulo={`Certificado — ${event.title}`}
                />
              )}

              {event.content.links && event.content.links.length > 0 && (
                <div className="flex flex-wrap gap-3 justify-center pt-2">
                  {event.content.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full border border-zinc-700 text-zinc-300 text-sm font-medium hover:bg-zinc-800 transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </article>
    </>
  );
};

/* Fim de Detail.tsx */
