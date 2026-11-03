/* events.data.test.ts — contrato da cópia de reserva gerada pela API (events.data.ts). */
import { describe, it, expect } from "vitest";
import { events } from "./events.data";

describe("cópia de reserva dos eventos", () => {
  it("tem ids e slugs únicos", () => {
    expect(new Set(events.map((e) => e.id)).size).toBe(events.length);
    expect(new Set(events.map((e) => e.slug)).size).toBe(events.length);
  });

  it("todo evento tem o mínimo que a página de detalhe usa", () => {
    for (const e of events) {
      expect(e.title, e.slug).toBeTruthy();
      expect(Array.isArray(e.content.curriculum), e.slug).toBe(true);
      expect(["concluido", "desejado"], e.slug).toContain(e.status);
    }
  });

  it("edições com número não se repetem dentro do mesmo formato", () => {
    for (const e of events) {
      const chaves = (e.content.editions ?? []).filter((ed) => ed.numero).map((ed) => `${ed.formato ?? ""}#${ed.numero}`);
      expect(new Set(chaves).size, e.slug).toBe(chaves.length);
    }
  });
});
