import { describe, it, expect } from "vitest";
import { getContrastRatio, type Theme } from "@mui/material/styles";
import {
  editorialTheme,
  streamingTheme,
  observatoryTheme,
  editorialColors,
  streamingColors,
  observatoryColors,
  tokens,
  type ThemeColors,
} from "./index";

const AA = 4.5;

const themes: [string, Theme, ThemeColors][] = [
  ["editorial", editorialTheme, editorialColors],
  ["streaming", streamingTheme, streamingColors],
  ["observatory", observatoryTheme, observatoryColors],
];

describe("mode of each theme", () => {
  it("editorial is light", () => {
    expect(editorialTheme.palette.mode).toBe("light");
  });

  it("streaming is dark", () => {
    expect(streamingTheme.palette.mode).toBe("dark");
  });

  it("observatory is light", () => {
    expect(observatoryTheme.palette.mode).toBe("light");
  });
});

describe("shared options", () => {
  it.each(themes)("%s uses Inter", (_name, theme) => {
    expect(theme.typography.fontFamily).toBe(tokens.typography.fontFamily);
  });

  it.each(themes)("%s uses the token breakpoints", (_name, theme) => {
    expect(theme.breakpoints.values).toEqual(tokens.breakpoints);
  });

  it.each(themes)("%s exposes its palette and tokens on theme.vietri", (_name, theme, colors) => {
    expect(theme.vietri.color).toEqual(colors);
    expect(theme.vietri.shadow.md).toBe(tokens.shadow.md);
  });
});

describe("brand colors", () => {
  it("editorial uses black and gold from the portfolio palette", () => {
    expect(editorialTheme.palette.primary.main).toBe(editorialColors.primary);
    expect(editorialColors.brand.gold).toBe("#DBAC5B");
    expect(editorialColors.action[0]).toBe(editorialColors.brand.gold);
  });

  it("streaming uses the deep purple as background and orange as primary", () => {
    expect(streamingTheme.palette.background.default).toBe("#20123A");
    expect(streamingTheme.palette.primary.main).toBe("#F4793F");
  });

  it("observatory uses teal as primary and deep purple as secondary", () => {
    expect(observatoryTheme.palette.primary.main).toBe("#027381");
    expect(observatoryTheme.palette.secondary.main).toBe("#4A0875");
    expect(observatoryTheme.palette.background.default).toBe(observatoryColors.bg);
  });

  it("observatory keeps the seven colors of its palette", () => {
    expect(Object.values(observatoryColors.brand)).toHaveLength(7);
  });
});

describe("WCAG AA contrast (4.5:1)", () => {
  it.each(themes)("%s: primary text on the background", (_name, theme) => {
    expect(
      getContrastRatio(theme.palette.text.primary, theme.palette.background.default)
    ).toBeGreaterThanOrEqual(AA);
  });

  it.each(themes)("%s: primary text on cards and menus", (_name, theme) => {
    expect(
      getContrastRatio(theme.palette.text.primary, theme.palette.background.paper)
    ).toBeGreaterThanOrEqual(AA);
  });

  it.each(themes)("%s: secondary text on the background", (_name, theme) => {
    expect(
      getContrastRatio(theme.palette.text.secondary, theme.palette.background.default)
    ).toBeGreaterThanOrEqual(AA);
  });

  it.each(themes)("%s: secondary text on cards and menus", (_name, theme) => {
    expect(
      getContrastRatio(theme.palette.text.secondary, theme.palette.background.paper)
    ).toBeGreaterThanOrEqual(AA);
  });

  it.each(themes)("%s: primary color works as text on background and cards", (_name, theme) => {
    expect(
      getContrastRatio(theme.palette.primary.main, theme.palette.background.default)
    ).toBeGreaterThanOrEqual(AA);
    expect(
      getContrastRatio(theme.palette.primary.main, theme.palette.background.paper)
    ).toBeGreaterThanOrEqual(AA);
  });

  it.each(themes)("%s: secondary color works as text on background and cards", (_name, theme) => {
    expect(
      getContrastRatio(theme.palette.secondary.main, theme.palette.background.default)
    ).toBeGreaterThanOrEqual(AA);
    expect(
      getContrastRatio(theme.palette.secondary.main, theme.palette.background.paper)
    ).toBeGreaterThanOrEqual(AA);
  });

  it.each(themes)("%s: text on primary button", (_name, theme) => {
    expect(
      getContrastRatio(theme.palette.primary.contrastText, theme.palette.primary.main)
    ).toBeGreaterThanOrEqual(AA);
  });

  it.each(themes)("%s: text on secondary button", (_name, theme) => {
    expect(
      getContrastRatio(theme.palette.secondary.contrastText, theme.palette.secondary.main)
    ).toBeGreaterThanOrEqual(AA);
  });
});
