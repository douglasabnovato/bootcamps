// src/entities/event/ui/EventCard.tsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { BootcampEvent } from '../model/types';
import { Badge } from './badge/Badge';

interface EventCardProps { event: BootcampEvent; }

export const EventCard = ({ event }: EventCardProps) => {
  return (
    <Link to={`/event/${event.slug}`} className="group relative block h-full">
      <motion.div 
        layoutId={`card-${event.id}`}
        className="relative flex flex-col h-full bg-zinc-900/40 border border-zinc-800/50 rounded-3xl overflow-hidden"
      >
        <div className="relative aspect-video overflow-hidden bg-zinc-800">
          <motion.img
            layoutId={`image-${event.id}`}
            src={event.coverImage}
            alt={event.altText}
            className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-center mb-4">
            <Badge variant="outline">{event.category}</Badge>
            <span className="text-[10px] font-mono text-zinc-500 uppercase">{event.institution}</span>
          </div>
          <h3 className="text-xl font-bold text-zinc-100 group-hover:text-brand-primary transition-colors">{event.title}</h3>
          <p className="text-sm text-zinc-400 mt-3 line-clamp-2 leading-relaxed">{event.description}</p>
        </div>
      </motion.div>
    </Link>
  );
};