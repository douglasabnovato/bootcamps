/* VideoPlayer.tsx — iframe de vídeo em proporção 16:9, com nome acessível obrigatório. */

import { cn } from './../lib/utils';

interface VideoPlayerProps {
  url: string;
  title: string;
  isCompleted: boolean;
}

export const VideoPlayer = ({ url, title, isCompleted }: VideoPlayerProps) => {
  return (
    <div
      className={cn(
        'relative w-full aspect-video rounded-2xl overflow-hidden border-2 shadow-2xl bg-zinc-900',
        isCompleted
          ? 'border-emerald-500/20 shadow-emerald-500/5'
          : 'border-amber-500/20 shadow-amber-500/5'
      )}
    >
      <iframe
        src={url}
        title={title}
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
};

/* Fim de VideoPlayer.tsx */
