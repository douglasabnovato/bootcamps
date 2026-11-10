/* EventGallery.tsx — grade de fotos do evento com ampliação num <dialog> nativo.
   Clique ou Enter abre a foto; ←/→ navegam; Esc, o botão Fechar ou o fundo fecham; o foco volta à miniatura.
   Itens de vídeo não viram <img>: aparecem como link para o vídeo e ficam fora da sequência ampliada. */

import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent, type TouchEvent } from "react";
import { motion } from "framer-motion";

// Interface local simples para o Shared (mesmo formato de EventMedia, sem depender de entities)
interface SharedMediaItem {
  id: string;
  url: string;
  type?: "image" | "video";
  alt?: string;
}

interface EventGalleryProps {
  media: SharedMediaItem[];
}

/* Índice vizinho com volta ao início/fim. */
const vizinho = (atual: number, total: number, passo: number) => (atual + passo + total) % total;

const estiloBotao =
  "px-4 py-2 rounded-full bg-zinc-900/90 border border-zinc-700 text-zinc-100 text-sm hover:bg-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary";

export const EventGallery = ({ media }: EventGalleryProps) => {
  const fotos = media.filter((item) => item.type !== "video");
  const [aberta, setAberta] = useState<number | null>(null);
  const dialogo = useRef<HTMLDialogElement>(null);
  const miniaturas = useRef<(HTMLButtonElement | null)[]>([]);
  const ultimaAberta = useRef<number | null>(null);
  const toqueInicial = useRef<number | null>(null);

  /* Abre/fecha o <dialog> conforme o estado e devolve o foco à miniatura da última foto vista. */
  useEffect(() => {
    const el = dialogo.current;
    if (!el) return;
    if (aberta !== null && !el.open) {
      el.showModal();
      // React não grava o atributo autofocus no DOM: o foco inicial vai para o Fechar explicitamente.
      el.querySelector<HTMLButtonElement>("[data-fechar]")?.focus();
    }
    if (aberta === null && el.open) el.close();
  }, [aberta]);

  const abrir = (indice: number) => {
    ultimaAberta.current = indice;
    setAberta(indice);
  };

  const navegar = (passo: number) => {
    setAberta((atual) => {
      if (atual === null) return atual;
      const proxima = vizinho(atual, fotos.length, passo);
      ultimaAberta.current = proxima;
      return proxima;
    });
  };

  /* Evento "close" do <dialog> (Esc nativo, botão Fechar ou fundo). */
  const aoFechar = () => {
    setAberta(null);
    const indice = ultimaAberta.current;
    if (indice !== null) miniaturas.current[indice]?.focus();
  };

  const aoTeclar = (evento: KeyboardEvent<HTMLDialogElement>) => {
    if (evento.key === "ArrowRight") {
      evento.preventDefault();
      navegar(1);
    } else if (evento.key === "ArrowLeft") {
      evento.preventDefault();
      navegar(-1);
    }
  };

  /* Clique no fundo (fora do conteúdo) fecha. */
  const aoClicarNoFundo = (evento: MouseEvent<HTMLDialogElement>) => {
    if (evento.target === evento.currentTarget) dialogo.current?.close();
  };

  /* Gesto simples no celular: arrastar mais de 50 px para o lado troca a foto. */
  const aoTocar = (evento: TouchEvent) => {
    toqueInicial.current = evento.touches[0]?.clientX ?? null;
  };
  const aoSoltar = (evento: TouchEvent) => {
    const inicio = toqueInicial.current;
    const fim = evento.changedTouches[0]?.clientX;
    toqueInicial.current = null;
    if (inicio === null || fim === undefined) return;
    if (Math.abs(fim - inicio) > 50) navegar(fim < inicio ? 1 : -1);
  };

  const atual = aberta !== null ? fotos[aberta] : undefined;
  /* Posição de cada foto na sequência ampliada (vídeos ficam de fora). */
  const posicaoDe = new Map(fotos.map((foto, posicao) => [foto.id, posicao]));

  return (
    <>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {media.map((item, index) => {
          const ehVideo = item.type === "video";
          const posicao = posicaoDe.get(item.id) ?? -1;
          return (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: Math.min(index, 8) * 0.05 }}
              className="aspect-square rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800"
            >
              {ehVideo ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full w-full items-center justify-center p-4 text-center text-sm text-zinc-200 hover:bg-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-primary"
                >
                  ▶ {item.alt || "Assistir ao vídeo"}
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              ) : (
                <button
                  ref={(el) => {
                    miniaturas.current[posicao] = el;
                  }}
                  type="button"
                  onClick={() => abrir(posicao)}
                  aria-label={`Ampliar foto ${posicao + 1} de ${fotos.length}${item.alt ? `: ${item.alt}` : ""}`}
                  className="group block h-full w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-primary"
                >
                  <img
                    src={item.url}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </button>
              )}
            </motion.li>
          );
        })}
      </ul>

      <dialog
        ref={dialogo}
        aria-label="Foto ampliada"
        onClose={aoFechar}
        onKeyDown={aoTeclar}
        onClick={aoClicarNoFundo}
        className="m-auto w-full max-w-6xl bg-transparent p-4 text-zinc-100 backdrop:bg-black/85"
      >
        {atual && aberta !== null && (
          <figure className="flex flex-col items-center gap-4" onTouchStart={aoTocar} onTouchEnd={aoSoltar}>
            <img
              src={atual.url}
              alt={atual.alt || `Foto ${aberta + 1} de ${fotos.length}`}
              decoding="async"
              className="max-h-[75vh] w-auto max-w-full rounded-xl object-contain"
            />
            <figcaption className="flex w-full flex-wrap items-center justify-between gap-3">
              <span className="text-sm text-zinc-300" aria-live="polite">
                {aberta + 1} de {fotos.length}
                {atual.alt ? ` · ${atual.alt}` : ""}
              </span>
              <span className="flex gap-2">
                {fotos.length > 1 && (
                  <>
                    <button type="button" onClick={() => navegar(-1)} className={estiloBotao} aria-label="Foto anterior">
                      ←
                    </button>
                    <button type="button" onClick={() => navegar(1)} className={estiloBotao} aria-label="Próxima foto">
                      →
                    </button>
                  </>
                )}
                <button type="button" data-fechar onClick={() => dialogo.current?.close()} className={estiloBotao}>
                  Fechar
                </button>
              </span>
            </figcaption>
          </figure>
        )}
      </dialog>
    </>
  );
};

/* Fim de EventGallery.tsx */
