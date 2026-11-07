import { describe, it, expect } from "vitest";
import { editorialTheme, streamingTheme, observatoryTheme } from "./index";

describe("themes", () => {
  it("editorial es claro", () => {
    expect(editorialTheme.palette.mode).toBe("light");
  });

  it("streaming es oscuro", () => {
    expect(streamingTheme.palette.mode).toBe("dark");
  });

  it("observatory hereda la tipografía del tema editorial", () => {
    expect(observatoryTheme.typography.fontFamily).toBe(
      editorialTheme.typography.fontFamily
    );
  });
});
