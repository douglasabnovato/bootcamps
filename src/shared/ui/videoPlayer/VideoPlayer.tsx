/* VideoPlayer.tsx — vídeo em proporção 16:9, com nome acessível obrigatório.
 *
 * Fachada (issue #73): o player do YouTube pesa cerca de 900 KB de script. Até a pessoa clicar,
 * a página mostra só a miniatura e um botão; o iframe (youtube-nocookie, com autoplay) entra no clique.
 * URLs que não são do YouTube continuam com o iframe direto, em loading="lazy".
 */

import { useState } from "react";
import { Play } from "lucide-react";
import { cn } from "./../lib/utils";
import { idDoYoutube } from "./youtube";

interface VideoPlayerProps {
  url: string;
  title: string;
  isCompleted: boolean;
}

export const VideoPlayer = ({ url, title, isCompleted }: VideoPlayerProps) => {
  const [ativo, setAtivo] = useState(false);
  const idYoutube = idDoYoutube(url);
  const src = idYoutube ? `https://www.youtube-nocookie.com/embed/${idYoutube}?autoplay=1` : url;

  return (
    <div
      className={cn(
        "relative w-full aspect-video rounded-2xl overflow-hidden border-2 shadow-2xl bg-zinc-900",
        isCompleted ? "border-emerald-500/20 shadow-emerald-500/5" : "border-amber-500/20 shadow-amber-500/5",
      )}
    >
      {idYoutube && !ativo ? (
        <button
          type="button"
          onClick={() => setAtivo(true)}
          aria-label={`Reproduzir ${title}`}
          className="group absolute inset-0 w-full h-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-emerald-400"
        >
          <img
            src={`https://i.ytimg.com/vi/${idYoutube}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            decoding="async"
            width={480}
            height={360}
            className="absolute inset-0 w-full h-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
          />
          <span className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-zinc-950/80 text-white shadow-xl transition-transform group-hover:scale-110">
            <Play aria-hidden="true" className="h-7 w-7 translate-x-0.5" fill="currentColor" />
          </span>
        </button>
      ) : (
        <iframe
          src={src}
          title={title}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading={idYoutube ? undefined : "lazy"}
        />
      )}
    </div>
  );
};

/* Fim de VideoPlayer.tsx */
