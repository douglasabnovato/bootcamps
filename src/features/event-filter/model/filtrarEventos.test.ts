/* filtrarEventos.test.ts — filtro da Home: combinação de status e categoria, lista vazia e leitura da URL. */
import { describe, it, expect } from "vitest";
import { events } from "../../../entities/event/api/events.data";
import type { BootcampEvent } from "../../../entities/event/model/types";
import {
  FILTRO_VAZIO,
  contarPorCategoria,
  contarPorStatus,
  filtrarEventos,
  filtroAtivo,
  filtroParaParametros,
  lerFiltro,
} from "./filtrarEventos";

const base = events[0];
const evento = (id: string, status: BootcampEvent["status"], category: BootcampEvent["category"]): BootcampEvent => ({
  ...base,
  id,
  slug: id,
  status,
  category,
});

const lista = [
  evento("a", "concluido", "outros"),
  evento("b", "desejado", "outros"),
  evento("c", "concluido", "fullstack"),
  evento("d", "desejado", "frontend"),
];

describe("filtrarEventos", () => {
  it("sem filtro devolve a lista inteira, na mesma ordem", () => {
    expect(filtrarEventos(lista, FILTRO_VAZIO).map((e) => e.id)).toEqual(["a", "b", "c", "d"]);
  });

  it("filtra só por status", () => {
    expect(filtrarEventos(lista, { status: "concluido", categoria: "todas" }).map((e) => e.id)).toEqual(["a", "c"]);
  });

  it("filtra só por categoria", () => {
    expect(filtrarEventos(lista, { status: "todos", categoria: "outros" }).map((e) => e.id)).toEqual(["a", "b"]);
  });

  it("combina status e categoria", () => {
    expect(filtrarEventos(lista, { status: "desejado", categoria: "outros" }).map((e) => e.id)).toEqual(["b"]);
  });

  it("devolve lista vazia quando nada combina", () => {
    expect(filtrarEventos(lista, { status: "desejado", categoria: "fullstack" })).toEqual([]);
    expect(filtrarEventos([], { status: "concluido", categoria: "outros" })).toEqual([]);
  });

  it("na cópia real, concluídos + metas somam o total", () => {
    const concluidos = filtrarEventos(events, { status: "concluido", categoria: "todas" }).length;
    const metas = filtrarEventos(events, { status: "desejado", categoria: "todas" }).length;
    expect(concluidos + metas).toBe(events.length);
  });
});

describe("contagens do filtro", () => {
  it("conta categorias dentro do status e omite categorias ausentes", () => {
    expect(contarPorCategoria(lista, "concluido")).toEqual([
      { categoria: "frontend", total: 0 },
      { categoria: "fullstack", total: 1 },
      { categoria: "outros", total: 1 },
    ]);
  });

  it("conta status dentro da categoria", () => {
    expect(contarPorStatus(lista, "outros")).toEqual({ todos: 2, concluido: 1, desejado: 1 });
  });
});

describe("filtro na URL", () => {
  it("lê valores válidos e ignora os desconhecidos", () => {
    expect(lerFiltro(new URLSearchParams("status=desejado&categoria=outros"))).toEqual({ status: "desejado", categoria: "outros" });
    expect(lerFiltro(new URLSearchParams("status=xyz&categoria=<script>"))).toEqual(FILTRO_VAZIO);
    expect(lerFiltro(new URLSearchParams(""))).toEqual(FILTRO_VAZIO);
  });

  it("omite da URL o que está no padrão", () => {
    expect(filtroParaParametros(FILTRO_VAZIO)).toEqual({});
    expect(filtroParaParametros({ status: "concluido", categoria: "todas" })).toEqual({ status: "concluido" });
    expect(filtroAtivo(FILTRO_VAZIO)).toBe(false);
    expect(filtroAtivo({ status: "todos", categoria: "mobile" })).toBe(true);
  });
});
