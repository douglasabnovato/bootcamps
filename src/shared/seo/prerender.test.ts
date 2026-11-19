import { describe, expect, it } from "vitest";
import html from "../../../index.html?raw";
import { events } from "../../entities/event/api/events.data";
import type { BootcampEvent } from "../../entities/event/model/types";
import { jsonLdDoEvento, montarPagina404, montarPaginaDoEvento, resumir } from "./prerender";

const porSlug = (slug: string) => events.find((e) => e.slug === slug) as BootcampEvent;
const nos = (e: BootcampEvent) => jsonLdDoEvento(e)["@graph"] as Record<string, unknown>[];

describe("resumir", () => {
  it("mantém texto curto e corta o longo na palavra, com reticências", () => {
    expect(resumir("Texto curto.")).toBe("Texto curto.");
    const longo = resumir("palavra ".repeat(40), 30);
    expect(longo.length).toBeLessThanOrEqual(30);
    expect(longo.endsWith("…")).toBe(true);
  });
});

describe("jsonLdDoEvento", () => {
  it("formação sem edições vira Course com a instituição", () => {
    const [no] = nos(porSlug("42-sp"));
    expect(no["@type"]).toBe("Course");
    expect(no.provider).toMatchObject({ "@type": "Organization", name: "42 São Paulo" });
  });

  it("evento com edições vira um Event por edição, com data completa quando existe", () => {
    const capivara = nos(porSlug("capivara-tech-juiz-de-fora"));
    expect(capivara.every((n) => n["@type"] === "Event")).toBe(true);
    expect(capivara.map((n) => n.startDate)).toEqual(["2026-06-27", "2026-10-31"]);
    expect(capivara[0].location).toMatchObject({ "@type": "Place", address: "Juiz de Fora (MG)" });
  });

  it("edição sem data usa o ano", () => {
    expect(nos(porSlug("codexperience")).map((n) => n.startDate)).toEqual(["2023", "2024", "2025"]);
  });
});

describe("montarPaginaDoEvento", () => {
  it.each(events.map((e) => [e.slug, e] as const))("%s: título, metatags, canonical e JSON-LD próprios", (slug, evento) => {
    const pagina = montarPaginaDoEvento(html, evento);
    const url = `https://bootcamps-dun.vercel.app/event/${slug}`;
    expect(pagina).toContain(`<link rel="canonical" href="${url}"`);
    expect(pagina).toContain(`<meta property="og:url" content="${url}"`);
    expect(pagina).not.toContain("<title>Eventos | learnTECH</title>");
    const json = pagina.match(/<script type="application\/ld\+json">(.+?)<\/script>/)?.[1];
    expect(() => JSON.parse(json ?? "")).not.toThrow();
    expect(pagina.match(/<script type="application\/ld\+json">/g)).toHaveLength(1);
  });

  it("escapa aspas e < nos textos", () => {
    const evento = { ...porSlug("42-sp"), title: 'A "B" <c>', description: "x </script> y" };
    const pagina = montarPaginaDoEvento(html, evento);
    expect(pagina).toContain("<title>A &quot;B&quot; &lt;c&gt; | learnTECH</title>");
    expect(pagina).not.toContain("x </script> y");
  });
});

describe("montarPagina404", () => {
  it("pede noindex e tira o canonical", () => {
    const pagina = montarPagina404(html);
    expect(pagina).toContain('<meta name="robots" content="noindex" />');
    expect(pagina).not.toContain('rel="canonical"');
  });
});
