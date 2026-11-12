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

  it("actions are flat in every theme", () => {
    for (const [, colors] of cases) {
      expect(isFlat(colors.action)).toBe(true);
      expect(isFlat(colors.actionHover)).toBe(true);
    }
  });

  it("every surface is a flat color today", () => {
    for (const [, colors] of cases) expect(isFlat(colors.surface)).toBe(true);
  });

  it("the streaming footer is a flat violet with an orange rule", () => {
    expect(streamingColors.surface[0]).toBe(streamingColors.derived.footerViolet);
    expect(streamingColors.surfaceRule).toBe(streamingColors.brand.orange);
    expect(editorialColors.surfaceRule).toBeUndefined();
    expect(observatoryColors.surfaceRule).toBeUndefined();
  });

  it("a middle color and an angle reach the CSS of the surface", () => {
    const g = createGradients({
      surface: ["#000000", "#FFFFFF"],
      surfaceMid: "#777777",
      surfaceAngle: 90,
      action: ["#111111", "#111111"],
      actionHover: ["#222222", "#222222"],
    });
    expect(g.surface).toBe("linear-gradient(90deg, #000000 0%, #777777 60%, #FFFFFF 100%)");
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
    const stops = [...colors.surface, ...(colors.surfaceMid ? [colors.surfaceMid] : [])];
    for (const stop of stops) {
      expect(getContrastRatio(colors.onSurface, stop)).toBeGreaterThanOrEqual(AA);
      expect(getContrastRatio(colors.onSurfaceSoft, stop)).toBeGreaterThanOrEqual(AA);
    }
  });
});

/** Mixes a color over white: `amount` of `color`, the rest white (a pure white photo under it). */
function overWhite(color: string, amount: number): string {
  const channels = [1, 3, 5].map((index) => parseInt(color.slice(index, index + 2), 16));
  const mixed = channels.map((value) => Math.round(value * amount + 255 * (1 - amount)));
  return `#${mixed.map((value) => value.toString(16).padStart(2, "0")).join("")}`;
}

describe("text over a hero image (WCAG AA, 4.5:1)", () => {
  // Under the text the layer is at least 74% opaque. We test exactly 74%, over the
  // worst possible photo: pure white.
  it.each(cases)("%s: text stays readable over a white photo", (_name, colors) => {
    const worst = overWhite(colors.scrim, 0.74);
    expect(getContrastRatio(colors.onSurface, worst)).toBeGreaterThanOrEqual(AA);
    expect(getContrastRatio(colors.onSurfaceSoft, worst)).toBeGreaterThanOrEqual(AA);
  });

  it.each(cases)("%s: the dark layer is a dark color", (_name, colors) => {
    expect(getContrastRatio(colors.onSurface, colors.scrim)).toBeGreaterThanOrEqual(AA);
  });
});

describe("orange as the interactive color of the streaming theme", () => {
  it("as text (links, outlines, arrows) it reads on the page and on the cards", () => {
    expect(getContrastRatio(streamingColors.primary, streamingColors.bg)).toBeGreaterThanOrEqual(AA);
    expect(getContrastRatio(streamingColors.primary, streamingColors.paper)).toBeGreaterThanOrEqual(AA);
  });

  it("the dark label on the light orange (primary) is readable", () => {
    expect(getContrastRatio(streamingColors.onPrimary, streamingColors.primary)).toBeGreaterThanOrEqual(AA);
  });

  it("the button fill holds white text, also on hover", () => {
    for (const fill of [...streamingColors.action, ...streamingColors.actionHover]) {
      expect(getContrastRatio(streamingColors.onAction, fill)).toBeGreaterThanOrEqual(AA);
    }
  });
});

describe("the lively orange of large buttons (streaming)", () => {
  const large = 3; // WCAG AA for large text: 18.7px bold or 24px

  it("a bold white label on the large button reaches the minimum for large text", () => {
    expect(getContrastRatio("#FFFFFF", streamingColors.accentLarge!)).toBeGreaterThanOrEqual(large);
    expect(getContrastRatio("#FFFFFF", streamingColors.accentLargeHover!)).toBeGreaterThanOrEqual(large);
  });

  it("only the streaming theme uses it", () => {
    expect(editorialColors.accentLarge).toBeUndefined();
    expect(observatoryColors.accentLarge).toBeUndefined();
  });
});

describe("the neutral line of outlined buttons (streaming)", () => {
  const UI = 3; // WCAG 1.4.11: the edge of a control against its background

  it("the line is visible on the page and on the cards", () => {
    expect(getContrastRatio(streamingColors.outline!, streamingColors.bg)).toBeGreaterThanOrEqual(UI);
    expect(getContrastRatio(streamingColors.outline!, streamingColors.paper)).toBeGreaterThanOrEqual(UI);
  });

  it("the label (text color) reads on the page and on the cards", () => {
    expect(getContrastRatio(streamingColors.ink, streamingColors.bg)).toBeGreaterThanOrEqual(AA);
    expect(getContrastRatio(streamingColors.ink, streamingColors.paper)).toBeGreaterThanOrEqual(AA);
  });

  it("the hover line (the primary color) is visible too", () => {
    expect(getContrastRatio(streamingColors.primary, streamingColors.bg)).toBeGreaterThanOrEqual(UI);
    expect(getContrastRatio(streamingColors.primary, streamingColors.paper)).toBeGreaterThanOrEqual(UI);
  });

  it("only the streaming theme defines it", () => {
    expect(editorialColors.outline).toBeUndefined();
    expect(observatoryColors.outline).toBeUndefined();
  });
});
