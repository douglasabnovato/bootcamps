/* eventApi.test.ts — a busca de eventos usa a API quando ela responde e cai na cópia local quando falha. */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { events } from "./events.data";

const API = "https://api.exemplo.test";

async function carregar() {
  vi.resetModules();
  vi.stubEnv("VITE_API_URL", API);
  return (await import("./eventApi")).eventApi;
}

beforeEach(() => vi.spyOn(console, "warn").mockImplementation(() => {}));
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("eventApi", () => {
  it("getAll devolve os eventos da API com /media/ resolvido", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({ ok: true, json: async () => [{ ...events[0], coverImage: "/media/x.webp" }] })),
    );
    const api = await carregar();
    const lista = await api.getAll();
    expect(lista).toHaveLength(1);
    expect(lista[0].coverImage).toBe(`${API}/media/x.webp`);
  });

  it("getAll cai na cópia local quando a API responde erro", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({ ok: false, status: 500 })),
    );
    const api = await carregar();
    expect(await api.getAll()).toStrictEqual(events);
  });

  it("getAll cai na cópia local quando a resposta não é lista", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({ ok: true, json: async () => ({ erro: true }) })),
    );
    const api = await carregar();
    expect(await api.getAll()).toStrictEqual(events);
  });

  it("getBySlug rejeita evento sem content e usa o local", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({ ok: true, json: async () => ({ slug: events[0].slug }) })),
    );
    const api = await carregar();
    expect((await api.getBySlug(events[0].slug))?.title).toBe(events[0].title);
  });
});
