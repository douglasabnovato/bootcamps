/* EventFilter.tsx — busca por texto, botões de status e chips de categoria da Home, com a contagem de cada opção. */

import { Search } from "lucide-react";
import type { BootcampEvent } from "../../../entities/event/model/types";
import { cn } from "../../../shared/ui/lib/utils";
import {
  BUSCA_MAXIMA,
  ROTULO_CATEGORIA,
  contarPorCategoria,
  contarPorStatus,
  type FiltroEventos,
  type FiltroStatus,
} from "../model/filtrarEventos";

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
  const porStatus = contarPorStatus(eventos, filtro.categoria, filtro.busca);
  const porCategoria = contarPorCategoria(eventos, filtro.status, filtro.busca);

  return (
    <div className="mb-12 space-y-4">
      <div role="search" className="relative max-w-md">
        <label htmlFor="busca-eventos" className="sr-only">
          Buscar por título ou instituição
        </label>
        <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
        <input
          id="busca-eventos"
          type="search"
          value={filtro.busca ?? ""}
          maxLength={BUSCA_MAXIMA}
          onChange={(evento) => aoMudar({ ...filtro, busca: evento.target.value })}
          placeholder="Buscar por título ou instituição"
          autoComplete="off"
          className="w-full rounded-full border border-zinc-700 bg-zinc-900/60 py-2.5 pl-11 pr-4 text-sm text-zinc-100 placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
        />
      </div>

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
