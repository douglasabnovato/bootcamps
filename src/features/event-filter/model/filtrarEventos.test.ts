/* filtrarEventos.test.ts — filtro da Home: combinação de status, categoria e busca, lista vazia e leitura da URL. */
import { describe, it, expect } from "vitest";
import { events } from "../../../entities/event/api/events.data";
import type { BootcampEvent } from "../../../entities/event/model/types";
import {
  BUSCA_MAXIMA,
  FILTRO_VAZIO,
  buscarEventos,
  contarPorCategoria,
  contarPorStatus,
  filtrarEventos,
  filtroAtivo,
  filtroParaParametros,
  lerFiltro,
  normalizarTexto,
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

describe("busca por título e instituição", () => {
  const comTexto = (id: string, title: string, institution: string, status: BootcampEvent["status"] = "concluido"): BootcampEvent => ({
    ...evento(id, status, "outros"),
    title,
    institution,
  });
  const textos = [
    comTexto("t1", "Formação React Avançado", "Rocketseat"),
    comTexto("t2", "Hackathon Inovação Social", "Prefeitura de Juiz de Fora", "desejado"),
    comTexto("t3", "Imersão Java", "Alura"),
  ];
  const ids = (lista: BootcampEvent[]) => lista.map((e) => e.id);

  it("normaliza acento e caixa", () => {
    expect(normalizarTexto("FORMAÇÃO Inovação")).toBe("formacao inovacao");
  });

  it("acha pelo título sem diferença de acento e caixa", () => {
    expect(ids(buscarEventos(textos, "formacao"))).toEqual(["t1"]);
    expect(ids(buscarEventos(textos, "INOVAÇÃO"))).toEqual(["t2"]);
    expect(ids(buscarEventos(textos, "imersao"))).toEqual(["t3"]);
  });

  it("acha pela instituição", () => {
    expect(ids(buscarEventos(textos, "alura"))).toEqual(["t3"]);
    expect(ids(buscarEventos(textos, "juiz de fora"))).toEqual(["t2"]);
  });

  it("exige todas as palavras, em título ou instituição", () => {
    expect(ids(buscarEventos(textos, "react rocketseat"))).toEqual(["t1"]);
    expect(ids(buscarEventos(textos, "react alura"))).toEqual([]);
  });

  it("busca vazia ou só com espaços devolve tudo", () => {
    expect(ids(buscarEventos(textos, ""))).toEqual(["t1", "t2", "t3"]);
    expect(ids(buscarEventos(textos, "   "))).toEqual(["t1", "t2", "t3"]);
    expect(ids(buscarEventos(textos, undefined))).toEqual(["t1", "t2", "t3"]);
  });

  it("não acha pela descrição nem por texto ausente", () => {
    expect(buscarEventos(textos, "xyzzy")).toEqual([]);
  });

  it("combina com status e categoria", () => {
    expect(ids(filtrarEventos(textos, { status: "concluido", categoria: "todas", busca: "a" }))).toEqual(["t1", "t3"]);
    expect(ids(filtrarEventos(textos, { status: "desejado", categoria: "todas", busca: "alura" }))).toEqual([]);
  });

  it("as contagens dos botões respeitam a busca", () => {
    expect(contarPorStatus(textos, "todas", "alura")).toEqual({ todos: 1, concluido: 1, desejado: 0 });
    expect(contarPorCategoria(textos, "todos", "xyzzy")).toEqual([{ categoria: "outros", total: 0 }]);
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

  it("lê e grava a busca em ?q=, junto com os filtros", () => {
    expect(lerFiltro(new URLSearchParams("q=react&status=concluido"))).toEqual({ status: "concluido", categoria: "todas", busca: "react" });
    expect(lerFiltro(new URLSearchParams("q=%20%20"))).toEqual(FILTRO_VAZIO);
    expect(lerFiltro(new URLSearchParams(`q=${"a".repeat(500)}`)).busca).toHaveLength(BUSCA_MAXIMA);
    expect(filtroParaParametros({ status: "desejado", categoria: "todas", busca: "java" })).toEqual({ status: "desejado", q: "java" });
    expect(filtroParaParametros({ ...FILTRO_VAZIO, busca: "  " })).toEqual({});
    expect(filtroAtivo({ ...FILTRO_VAZIO, busca: "java" })).toBe(true);
    expect(filtroAtivo({ ...FILTRO_VAZIO, busca: " " })).toBe(false);
  });
});
