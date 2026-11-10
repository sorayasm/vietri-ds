import { describe, it, expect } from "vitest";
import { getContrastRatio } from "@mui/material/styles";
import {
  editorialTheme,
  streamingTheme,
  observatoryTheme,
  editorialColors,
  streamingColors,
  observatoryColors,
  createGradients,
  type ThemeColors,
} from "./index";

const AA = 4.5;

const cases: [string, ThemeColors, typeof editorialTheme][] = [
  ["editorial", editorialColors, editorialTheme],
  ["streaming", streamingColors, streamingTheme],
  ["observatory", observatoryColors, observatoryTheme],
];

const isFlat = (stops: readonly [string, string]) => stops[0] === stops[1];

describe("fills and gradients", () => {
  it.each(cases)("%s exposes CSS gradients on theme.vietri", (_name, _colors, theme) => {
    const { surface, action, actionHover } = theme.vietri.gradient;
    expect(surface).toMatch(/^linear-gradient\(/);
    expect(action).toMatch(/^linear-gradient\(/);
    expect(actionHover).toMatch(/^linear-gradient\(/);
  });

  it("all themes are flat: no theme uses gradients", () => {
    for (const [, colors] of cases) {
      expect(isFlat(colors.action)).toBe(true);
      expect(isFlat(colors.actionHover)).toBe(true);
      expect(isFlat(colors.surface)).toBe(true);
    }
  });

  it("no theme draws decorative glows", () => {
    for (const [, colors] of cases) {
      expect(colors.glow).toBeNull();
    }
  });

  it("createGradients still turns two different colors into a gradient", () => {
    const g = createGradients({
      surface: ["#000000", "#FFFFFF"],
      action: ["#111111", "#EEEEEE"],
      actionHover: ["#EEEEEE", "#111111"],
    });
    expect(g.surface).toContain("#000000 0%");
    expect(g.surface).toContain("#FFFFFF 100%");
    expect(g.actionHover).toContain("#EEEEEE 0%");
  });
});

describe("contrast on fills and gradients (WCAG AA, 4.5:1)", () => {
  it.each(cases)("%s: text on the primary action is readable at every color", (_name, colors) => {
    for (const stop of [...colors.action, ...colors.actionHover]) {
      expect(getContrastRatio(colors.onAction, stop)).toBeGreaterThanOrEqual(AA);
    }
  });

  it.each(cases)("%s: text on the surface is readable at every color", (_name, colors) => {
    for (const stop of colors.surface) {
      expect(getContrastRatio(colors.onSurface, stop)).toBeGreaterThanOrEqual(AA);
      expect(getContrastRatio(colors.onSurfaceSoft, stop)).toBeGreaterThanOrEqual(AA);
    }
  });
});
