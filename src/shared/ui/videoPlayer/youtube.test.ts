import { describe, expect, it } from "vitest";
import { idDoYoutube } from "./youtube";

describe("idDoYoutube", () => {
  it.each([
    ["https://www.youtube.com/embed/1-fUC6_yntE", "1-fUC6_yntE"],
    ["https://www.youtube.com/watch?v=1-fUC6_yntE&t=30", "1-fUC6_yntE"],
    ["https://youtu.be/1-fUC6_yntE", "1-fUC6_yntE"],
    ["https://www.youtube-nocookie.com/embed/1-fUC6_yntE", "1-fUC6_yntE"],
    ["https://youtube.com/shorts/1-fUC6_yntE", "1-fUC6_yntE"],
  ])("reconhece %s", (url, id) => {
    expect(idDoYoutube(url)).toBe(id);
  });

  it.each(["", "https://vimeo.com/123456", "https://www.youtube.com/@canal"])("devolve null para %s", (url) => {
    expect(idDoYoutube(url)).toBeNull();
  });
});
