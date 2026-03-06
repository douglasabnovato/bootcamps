// src/shared/ui/eventGallery/EventGallery.tsx
import { motion } from "framer-motion";

// Definimos uma interface local simples para o Shared
interface SharedMediaItem {
  id: string;
  url: string;
  alt?: string;
}

interface EventGalleryProps {
  media: SharedMediaItem[];
}

export const EventGallery = ({ media }: EventGalleryProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
      {media.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="aspect-square rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 cursor-pointer group"
        >
          <img
            src={item.url}
            alt={item.alt || ""}
            loading="lazy"
            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
          />
        </motion.div>
      ))}
    </div>
  );
};