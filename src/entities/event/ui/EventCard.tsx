/* EventCard.tsx — card do evento na listagem, com o status visível na própria grade. */

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { BootcampEvent } from '../model/types';
import { Badge } from './badge/Badge';

interface EventCardProps {
  event: BootcampEvent;
}

export const EventCard = ({ event }: EventCardProps) => {
  const concluido = event.status === 'concluido';

  return (
    <Link
      to={`/event/${event.slug}`}
      aria-label={`${event.title} — ${event.institution}`}
      className="group relative block h-full rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-4 focus-visible:ring-offset-zinc-950"
    >
      <motion.div
        layoutId={`card-${event.id}`}
        className="relative flex flex-col h-full bg-zinc-900/40 border border-zinc-800/50 rounded-3xl overflow-hidden group-hover:border-zinc-700 transition-colors"
      >
        <div className="relative aspect-video overflow-hidden bg-zinc-800">
          <motion.img
            layoutId={`image-${event.id}`}
            src={event.coverImage}
            alt={event.altText}
            loading="lazy"
            className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />

          <span
            className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border backdrop-blur-md ${
              concluido
                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
            }`}
          >
            {concluido ? 'Concluído' : 'Meta'}
          </span>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-center gap-3 mb-4">
            <Badge variant="outline">{event.category}</Badge>
            <span className="text-[10px] font-mono text-zinc-500 uppercase truncate">
              {event.institution}
            </span>
          </div>
          <h3 className="text-xl font-bold text-zinc-100 group-hover:text-brand-primary transition-colors">
            {event.title}
          </h3>
          <p className="text-sm text-zinc-400 mt-3 line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        </div>
      </motion.div>
    </Link>
  );
};

/* Fim de EventCard.tsx */
