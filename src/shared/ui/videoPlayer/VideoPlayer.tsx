// src/shared/ui/VideoPlayer/VideoPlayer.tsx
import { cn } from "./../lib/utils";

interface VideoPlayerProps {
  url: string;
  status: 'completed' | 'desired';
}

export const VideoPlayer = ({ url, status }: VideoPlayerProps) => {
  const isEmerald = status === 'completed';
  
  return (
    <div className={cn(
      "relative w-full aspect-video rounded-2xl overflow-hidden border-2 shadow-2xl bg-zinc-900",
      isEmerald ? "border-emerald-500/20 shadow-emerald-500/5" : "border-amber-500/20 shadow-amber-500/5"
    )}>
      <iframe
        src={url}
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
};