import { describe, it, expect } from "vitest";
import { getContrastRatio } from "@mui/material/styles";
import { categoryPalette, createCategoryColors } from "./categorical";

describe("categorical palette", () => {
  it("has at least 10 colors", () => {
    expect(categoryPalette.length).toBeGreaterThanOrEqual(10);
  });

  it.each(categoryPalette.map((color, index) => [index, color] as const))(
    "color %i: text meets AAA (7:1) on its background",
    (_index, color) => {
      expect(getContrastRatio(color.fg, color.bg)).toBeGreaterThanOrEqual(7);
    }
  );

  it.each(categoryPalette.map((color, index) => [index, color] as const))(
    "color %i: the dot meets 3:1 on white",
    (_index, color) => {
      expect(getContrastRatio(color.dot, "#FFFFFF")).toBeGreaterThanOrEqual(3);
    }
  );

  it("all colors are different from each other", () => {
    const backgrounds = new Set(categoryPalette.map((color) => color.bg));
    expect(backgrounds.size).toBe(categoryPalette.length);
  });
});

describe("createCategoryColors", () => {
  const keys = ["USA", "Chile", "Argentina"];

  it("always assigns the same color to the same category", () => {
    expect(createCategoryColors(keys)).toEqual(createCategoryColors(keys));
  });

  it("assigns different colors while the palette lasts", () => {
    const colors = createCategoryColors(keys);
    expect(new Set(Object.values(colors).map((c) => c.bg)).size).toBe(3);
  });

  it("ignores repeated categories", () => {
    const colors = createCategoryColors(["Chile", "Chile", "USA"]);
    expect(Object.keys(colors)).toEqual(["Chile", "USA"]);
  });

  it("reuses colors when there are more categories than colors", () => {
    const many = Array.from({ length: categoryPalette.length + 1 }, (_v, i) => `c${i}`);
    const colors = createCategoryColors(many);
    expect(colors[many[many.length - 1]]).toEqual(colors[many[0]]);
  });
});
