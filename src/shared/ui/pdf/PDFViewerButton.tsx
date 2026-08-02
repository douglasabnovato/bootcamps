import { useState } from 'react';
import { cn } from "../lib/utils";

interface PDFViewerButtonProps {
  /** Caminho relativo dentro de `src` para o PDF, ex: '../../../assets/arquivos/minas-summit-2025-certificado.pdf' */
  pdfPath?: string;
  label?: string;
}

export const PDFViewerButton = ({ pdfPath = '../../../assets/arquivos/minas-summit-2025-certificado.pdf', label = 'Abrir certificado' }: PDFViewerButtonProps) => {
  const [open, setOpen] = useState(false);

  // Resolve o asset em tempo de build com Vite
  const pdfUrl = new URL(pdfPath, import.meta.url).href;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "flex items-center justify-center w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-2xl",
          "bg-zinc-800 text-white hover:bg-zinc-700"
        )}
      >
        {label}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
        >
          <div className="w-full max-w-5xl h-[80vh] bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
            <div className="flex items-center justify-between p-3 bg-zinc-950 border-b border-zinc-800">
              <div className="text-sm text-zinc-200">Visualizador de PDF</div>
              <div className="flex items-center gap-2">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-zinc-300 underline"
                >
                  Abrir em nova aba
                </a>
                <button
                  onClick={() => setOpen(false)}
                  className="px-3 py-1 bg-zinc-800 text-zinc-200 rounded-md"
                >
                  Fechar
                </button>
              </div>
            </div>

            <iframe
              src={pdfUrl}
              title="PDF Viewer"
              className="w-full h-full bg-white"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PDFViewerButton;
