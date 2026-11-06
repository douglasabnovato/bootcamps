/* ecossistema.test.ts — resolvedor de "Veja também": usa o que a API manda e monta a URL quando a cópia não traz. */
import { describe, it, expect } from "vitest";
import { events } from "../../entities/event/api/events.data";
import { ECOSSISTEMA, resolverRelacionado, resolverRelacionados } from "./ecossistema";

describe("resolverRelacionado", () => {
  it("mantém url, titulo e projeto vindos da API", () => {
    const r = resolverRelacionado({
      tipo: "programas",
      id: "901",
      projeto: "learn-tech",
      titulo: "Bootcamp X",
      url: "https://exemplo.test/p/901",
    });
    expect(r).toMatchObject({ projeto: "learn-tech", titulo: "Bootcamp X", url: "https://exemplo.test/p/901" });
    expect(r?.caminhoInterno).toBeUndefined();
  });

  it("programa sem categoria vai para o catálogo do learn-tech", () => {
    expect(resolverRelacionado({ tipo: "programas", id: "901" })?.url).toBe(`${ECOSSISTEMA["learn-tech"]}/programs`);
  });

  it("blog vai para /blog/<id>", () => {
    const r = resolverRelacionado({ tipo: "blog", id: "escolher-formacao-dev" });
    expect(r?.url).toBe("https://learn-tech-pied.vercel.app/blog/escolher-formacao-dev");
    expect(r?.titulo).toBe("Artigo: Escolher formacao dev");
  });

  it("evento vira link interno e aceita título local", () => {
    const r = resolverRelacionado({ tipo: "eventos", id: "gdg-jf" }, (tipo, id) =>
      tipo === "eventos" && id === "gdg-jf" ? "GDG Juiz de Fora" : undefined,
    );
    expect(r).toMatchObject({
      projeto: "bootcamps",
      titulo: "GDG Juiz de Fora",
      url: "https://bootcamps-dun.vercel.app/event/gdg-jf",
      caminhoInterno: "/event/gdg-jf",
    });
  });

  it("career e tools usam detalhe.html com ?tipo=&id= e ?id=", () => {
    expect(resolverRelacionado({ tipo: "vagas", id: "dev-junior" })?.url).toBe(
      "https://douglasabnovato.github.io/career/detalhe.html?tipo=vagas&id=dev-junior",
    );
    expect(resolverRelacionado({ tipo: "ferramentas", id: "vite" })?.url).toBe(
      "https://douglasabnovato.github.io/tools/detalhe.html?id=vite",
    );
  });

  it("tipo desconhecido sem url não aparece", () => {
    expect(resolverRelacionado({ tipo: "podcast", id: "x" })).toBeNull();
  });
});

describe("resolverRelacionados na cópia local", () => {
  it("todo evento da cópia com relacionados ganha ao menos um link", () => {
    for (const e of events) {
      if (!e.content.relacionados?.length) continue;
      const lista = resolverRelacionados(e.content.relacionados);
      expect(lista.length, e.slug).toBeGreaterThan(0);
      for (const r of lista) expect(r.url, `${e.slug} → ${r.tipo}:${r.id}`).toMatch(/^https:\/\//);
    }
  });

  it("descarta repetições de tipo + id", () => {
    expect(
      resolverRelacionados([
        { tipo: "blog", id: "a" },
        { tipo: "blog", id: "a" },
      ]),
    ).toHaveLength(1);
  });
});
