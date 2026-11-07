import { describe, it, expect } from "vitest";
import { getContrastRatio, type Theme } from "@mui/material/styles";
import {
  editorialTheme,
  streamingTheme,
  observatoryTheme,
  tokens,
} from "./index";

const themes: [string, Theme][] = [
  ["editorial", editorialTheme],
  ["streaming", streamingTheme],
  ["observatory", observatoryTheme],
];

describe("modo de cada tema", () => {
  it("editorial es claro", () => {
    expect(editorialTheme.palette.mode).toBe("light");
  });

  it("streaming es oscuro", () => {
    expect(streamingTheme.palette.mode).toBe("dark");
  });

  it("observatory es claro", () => {
    expect(observatoryTheme.palette.mode).toBe("light");
  });
});

describe("opciones compartidas", () => {
  it.each(themes)("%s usa Inter", (_name, theme) => {
    expect(theme.typography.fontFamily).toBe(tokens.typography.fontFamily);
  });

  it.each(themes)("%s usa los breakpoints de los tokens", (_name, theme) => {
    expect(theme.breakpoints.values).toEqual(tokens.breakpoints);
  });

  it.each(themes)("%s expone los tokens en theme.vietri", (_name, theme) => {
    expect(theme.vietri.color.purple).toBe(tokens.color.purple);
    expect(theme.vietri.shadow.md).toBe(tokens.shadow.md);
  });
});

describe("colores de marca", () => {
  it("streaming usa navy como fondo y celeste como primario", () => {
    expect(streamingTheme.palette.background.default).toBe(tokens.color.navy);
    expect(streamingTheme.palette.primary.main).toBe(tokens.color.sky);
  });

  it("observatory usa mist como fondo y púrpura como primario", () => {
    expect(observatoryTheme.palette.background.default).toBe(tokens.color.mist);
    expect(observatoryTheme.palette.primary.main).toBe(tokens.color.purple);
  });
});

describe("contraste WCAG AA (4.5:1)", () => {
  const AA = 4.5;

  it.each(themes)("%s: texto principal sobre el fondo", (_name, theme) => {
    const ratio = getContrastRatio(
      theme.palette.text.primary,
      theme.palette.background.default
    );
    expect(ratio).toBeGreaterThanOrEqual(AA);
  });

  it.each(themes)("%s: texto secundario sobre el fondo", (_name, theme) => {
    const ratio = getContrastRatio(
      theme.palette.text.secondary,
      theme.palette.background.default
    );
    expect(ratio).toBeGreaterThanOrEqual(AA);
  });

  it.each(themes)("%s: texto sobre botón primario", (_name, theme) => {
    const ratio = getContrastRatio(
      theme.palette.primary.contrastText,
      theme.palette.primary.main
    );
    expect(ratio).toBeGreaterThanOrEqual(AA);
  });

  it.each(themes)("%s: texto sobre botón secundario", (_name, theme) => {
    const ratio = getContrastRatio(
      theme.palette.secondary.contrastText,
      theme.palette.secondary.main
    );
    expect(ratio).toBeGreaterThanOrEqual(AA);
  });
});
