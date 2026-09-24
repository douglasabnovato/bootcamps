/* PDFViewerButton.tsx — abre um PDF já resolvido pelo build numa janela modal.
   A URL chega pronta do import do Vite: não há resolução de caminho em tempo de execução. */

import { useEffect, useRef, useState } from 'react';
import { cn } from '../lib/utils';

interface PDFViewerButtonProps {
  pdfUrl: string;
  label?: string;
  titulo?: string;
}

export const PDFViewerButton = ({
  pdfUrl,
  label = 'Abrir certificado',
  titulo = 'Visualizador de PDF',
}: PDFViewerButtonProps) => {
  const [aberto, setAberto] = useState(false);
  const gatilho = useRef<HTMLButtonElement>(null);

  /* Fecha no Esc, trava a rolagem do fundo e devolve o foco ao botão que abriu. */
  useEffect(() => {
    if (!aberto) return;

    const aoTeclar = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape') setAberto(false);
    };

    const rolagem = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', aoTeclar);

    return () => {
      document.body.style.overflow = rolagem;
      document.removeEventListener('keydown', aoTeclar);
      gatilho.current?.focus();
    };
  }, [aberto]);

  return (
    <>
      <button
        ref={gatilho}
        type="button"
        onClick={() => setAberto(true)}
        className={cn(
          'flex items-center justify-center w-full py-4 rounded-2xl font-black uppercase tracking-[0.2em] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]',
          'bg-zinc-800 text-white hover:bg-zinc-700'
        )}
      >
        {label}
      </button>

      {aberto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={titulo}
          onClick={() => setAberto(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
        >
          <div
            onClick={(evento) => evento.stopPropagation()}
            className="w-full max-w-5xl h-[80vh] bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between gap-4 p-3 bg-zinc-950 border-b border-zinc-800">
              <p className="text-sm text-zinc-200 truncate">{titulo}</p>
              <div className="flex items-center gap-3 shrink-0">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-zinc-300 underline hover:text-white"
                >
                  Abrir em nova aba
                </a>
                <button
                  type="button"
                  autoFocus
                  onClick={() => setAberto(false)}
                  className="px-3 py-1 bg-zinc-800 text-zinc-200 rounded-md hover:bg-zinc-700"
                >
                  Fechar
                </button>
              </div>
            </div>

            <iframe src={pdfUrl} title={titulo} className="w-full flex-1 bg-white" />
          </div>
        </div>
      )}
    </>
  );
};

/* Fim de PDFViewerButton.tsx */
