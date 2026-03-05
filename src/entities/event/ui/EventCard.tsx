// src/entities/event/ui/EventCard.tsx
import { Link } from 'react-router-dom';
import type { BootcampEvent } from '../model/types';
import { Badge } from './badge/Badge';

interface EventCardProps {
  event: BootcampEvent;
}

export const EventCard = ({ event }: EventCardProps) => {
  return (
    <Link
      to={`/event/${event.slug}`}
      className="group relative flex flex-col h-full bg-zinc-900/40 border border-zinc-800/50 rounded-3xl overflow-hidden transition-all duration-500 hover:border-brand-primary/40 hover:shadow-[0_0_30px_-10px_rgba(0,209,255,0.2)]"
    >
      {/* Container da Imagem com Overlays */}
      <div className="relative aspect-video overflow-hidden bg-zinc-800">
        <img
          src={event.coverImage}
          alt={event.altText}
          className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700 ease-in-out"
          loading="lazy"
        />
        {/* Overlay de Gradiente para leitura */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
      </div>

      {/* Conteúdo com Efeito Glassmorphism no Hover */}
      <div className="p-6 flex flex-col flex-grow relative">
        <div className="flex justify-between items-center mb-4">
          <Badge variant="outline">{event.category}</Badge>
          <span className="text-[10px] font-mono text-zinc-500 tracking-tighter uppercase">
            {event.institution}
          </span>
        </div>

        <h3 className="text-xl font-bold text-zinc-100 group-hover:text-brand-primary transition-colors duration-300">
          {event.title}
        </h3>

        <p className="text-sm text-zinc-400 mt-3 line-clamp-2 leading-relaxed font-light">
          {event.description}
        </p>

        {/* Informações Essenciais (Tecnologias/Carga Horária) */}
        <div className="mt-auto pt-6 flex flex-wrap gap-2">
          {event.content.curriculum.slice(0, 3).map((tech) => (
            <span key={tech} className="text-[9px] px-2 py-0.5 rounded bg-zinc-800/50 text-zinc-500 border border-zinc-700/30">
              {tech}
            </span>
          ))}
          {event.content.curriculum.length > 3 && (
            <span className="text-[9px] text-zinc-600 self-center">...</span>
          )}
        </div>
      </div>

      {/* Brilho Sutil de Vidro (Glass Effect) */}
      <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-3xl group-hover:bg-white/[0.02] transition-colors" />
    </Link>
  );
};