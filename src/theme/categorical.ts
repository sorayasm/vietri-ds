/**
 * Categorical palette for countries, roles, decades, etc.
 *
 * It replaces colors generated from a hash: every text/background pair has a
 * contrast of at least 7:1 (AAA), and color is never the only indicator,
 * because it is always shown next to a text label.
 */
export interface CategoryColor {
  /** Chip background. */
  bg: string;
  /** Text on the background (≥ 7:1). */
  fg: string;
  /** Dot or marker on white (≥ 3:1). */
  dot: string;
}

export const categoryPalette: readonly CategoryColor[] = [
  { bg: "#E0F2FE", fg: "#0C4A6E", dot: "#0284C7" }, // sky
  { bg: "#EDE9FE", fg: "#4C1D95", dot: "#7C3AED" }, // violet
  { bg: "#FFE4E6", fg: "#881337", dot: "#E11D48" }, // rose
  { bg: "#FEF3C7", fg: "#78350F", dot: "#D97706" }, // amber
  { bg: "#D1FAE5", fg: "#064E3B", dot: "#059669" }, // emerald
  { bg: "#FAE8FF", fg: "#701A75", dot: "#C026D3" }, // fuchsia
  { bg: "#CCFBF1", fg: "#134E4A", dot: "#0D9488" }, // teal
  { bg: "#FFEDD5", fg: "#7C2D12", dot: "#EA580C" }, // orange
  { bg: "#E0E7FF", fg: "#312E81", dot: "#4F46E5" }, // indigo
  { bg: "#ECFCCB", fg: "#365314", dot: "#65A30D" }, // lime
];

/**
 * Assigns a color to each category by its position. Always pass the full,
 * ordered list so the same value gets the same color in every view.
 * With more than 10 categories, colors repeat.
 */
export function createCategoryColors(
  keys: readonly string[]
): Record<string, CategoryColor> {
  const unique = Array.from(new Set(keys));
  return Object.fromEntries(
    unique.map((key, index) => [
      key,
      categoryPalette[index % categoryPalette.length],
    ])
  );
}
