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

  it.each(themes)("%s exposes the tokens on theme.vietri", (_name, theme) => {
    expect(theme.vietri.color.purple).toBe(tokens.color.purple);
    expect(theme.vietri.shadow.md).toBe(tokens.shadow.md);
  });
});

describe("brand colors", () => {
  it("streaming uses navy as background and sky as primary", () => {
    expect(streamingTheme.palette.background.default).toBe(tokens.color.navy);
    expect(streamingTheme.palette.primary.main).toBe(tokens.color.sky);
  });

  it("observatory uses mist as background and purple as primary", () => {
    expect(observatoryTheme.palette.background.default).toBe(tokens.color.mist);
    expect(observatoryTheme.palette.primary.main).toBe(tokens.color.purple);
  });
});

describe("WCAG AA contrast (4.5:1)", () => {
  const AA = 4.5;

  it.each(themes)("%s: primary text on the background", (_name, theme) => {
    const ratio = getContrastRatio(
      theme.palette.text.primary,
      theme.palette.background.default
    );
    expect(ratio).toBeGreaterThanOrEqual(AA);
  });

  it.each(themes)("%s: secondary text on the background", (_name, theme) => {
    const ratio = getContrastRatio(
      theme.palette.text.secondary,
      theme.palette.background.default
    );
    expect(ratio).toBeGreaterThanOrEqual(AA);
  });

  it.each(themes)("%s: text on primary button", (_name, theme) => {
    const ratio = getContrastRatio(
      theme.palette.primary.contrastText,
      theme.palette.primary.main
    );
    expect(ratio).toBeGreaterThanOrEqual(AA);
  });

  it.each(themes)("%s: text on secondary button", (_name, theme) => {
    const ratio = getContrastRatio(
      theme.palette.secondary.contrastText,
      theme.palette.secondary.main
    );
    expect(ratio).toBeGreaterThanOrEqual(AA);
  });
});
