/* EventFilter.tsx — botões de status e chips de categoria da Home, com a contagem de cada opção. */

import type { BootcampEvent } from "../../../entities/event/model/types";
import { cn } from "../../../shared/ui/lib/utils";
import { ROTULO_CATEGORIA, contarPorCategoria, contarPorStatus, type FiltroEventos, type FiltroStatus } from "../model/filtrarEventos";

interface EventFilterProps {
  eventos: BootcampEvent[];
  filtro: FiltroEventos;
  aoMudar: (filtro: FiltroEventos) => void;
}

const OPCOES_STATUS: { valor: FiltroStatus; rotulo: string }[] = [
  { valor: "todos", rotulo: "Todos" },
  { valor: "concluido", rotulo: "Concluídos" },
  { valor: "desejado", rotulo: "Metas" },
];

const estiloChip = (ativo: boolean) =>
  cn(
    "inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
    ativo ? "bg-brand-primary/15 border-brand-primary/60 text-zinc-50" : "border-zinc-700 text-zinc-300 hover:bg-zinc-800",
  );

export const EventFilter = ({ eventos, filtro, aoMudar }: EventFilterProps) => {
  const porStatus = contarPorStatus(eventos, filtro.categoria);
  const porCategoria = contarPorCategoria(eventos, filtro.status);

  return (
    <div className="mb-12 space-y-4">
      <div role="group" aria-label="Filtrar por status" className="flex flex-wrap gap-2">
        {OPCOES_STATUS.map((opcao) => (
          <button
            key={opcao.valor}
            type="button"
            aria-pressed={filtro.status === opcao.valor}
            onClick={() => aoMudar({ ...filtro, status: opcao.valor })}
            className={estiloChip(filtro.status === opcao.valor)}
          >
            {opcao.rotulo}
            <span className="font-mono text-xs text-zinc-400">{porStatus[opcao.valor]}</span>
          </button>
        ))}
      </div>

      <div role="group" aria-label="Filtrar por categoria" className="flex flex-wrap gap-2">
        <button
          type="button"
          aria-pressed={filtro.categoria === "todas"}
          onClick={() => aoMudar({ ...filtro, categoria: "todas" })}
          className={estiloChip(filtro.categoria === "todas")}
        >
          Todas as categorias
        </button>
        {porCategoria.map(({ categoria, total }) => (
          <button
            key={categoria}
            type="button"
            aria-pressed={filtro.categoria === categoria}
            onClick={() => aoMudar({ ...filtro, categoria })}
            className={estiloChip(filtro.categoria === categoria)}
          >
            {ROTULO_CATEGORIA[categoria]}
            <span className="font-mono text-xs text-zinc-400">{total}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

/* Fim de EventFilter.tsx */
