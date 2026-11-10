import { describe, it, expect } from "vitest";
import { getContrastRatio, type Theme } from "@mui/material/styles";
import { editorialTheme, streamingTheme, observatoryTheme } from "./index";

const AA = 4.5;

const themes: [string, Theme][] = [
  ["editorial", editorialTheme],
  ["streaming", streamingTheme],
  ["observatory", observatoryTheme],
];

const colors = ["error", "warning", "info", "success"] as const;

const cases = themes.flatMap(([name, theme]) =>
  colors.map((color) => [name, color, theme] as const)
);

describe("status colors (WCAG AA, 4.5:1)", () => {
  it.each(cases)("%s: %s text is readable on the page background", (_name, color, theme) => {
    expect(
      getContrastRatio(theme.palette[color].main, theme.palette.background.default)
    ).toBeGreaterThanOrEqual(AA);
  });

  it.each(cases)("%s: %s text is readable on cards and menus", (_name, color, theme) => {
    expect(
      getContrastRatio(theme.palette[color].main, theme.palette.background.paper)
    ).toBeGreaterThanOrEqual(AA);
  });

  it.each(cases)("%s: text on a %s button is readable", (_name, color, theme) => {
    expect(
      getContrastRatio(theme.palette[color].contrastText, theme.palette[color].main)
    ).toBeGreaterThanOrEqual(AA);
  });
});

describe("default chip colors (WCAG AA, 4.5:1)", () => {
  // The default chip uses opaque colors so it stays readable on any surface.
  it.each(themes)("%s: text on the chip and on the hovered chip", (_name, theme) => {
    const { chip, chipHover, onChip } = theme.vietri.color;
    expect(getContrastRatio(onChip, chip)).toBeGreaterThanOrEqual(AA);
    expect(getContrastRatio(onChip, chipHover)).toBeGreaterThanOrEqual(AA);
  });
});
