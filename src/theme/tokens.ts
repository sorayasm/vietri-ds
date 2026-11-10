/**
 * Vietri DS design tokens — the single source of truth.
 * Themes read from here; no theme should contain hand-written values.
 */

/** Brand colors (Voxmater). */
export const brand = {
  navy: "#131B2E",
  sky: "#38BDF8",
  purple: "#481374",
  mist: "#E2E8F0",
  white: "#FFFFFF",
  black: "#000000",
} as const;

/**
 * Derived colors: they are not part of the brand, they exist to create
 * hierarchy (secondary text, raised surfaces) while keeping AA contrast.
 */
export const derived = {
  /** Secondary text on light backgrounds (7.6:1 on white). */
  slate: "#475569",
  /** Secondary text on dark backgrounds (11.6:1 on navy). */
  slateLight: "#CBD5E1",
  /** Raised surface over navy (cards in the dark theme). */
  navyRaised: "#1C2640",
} as const;

export const tokens = {
  spacing: 8,
  radius: {
    sm: 4,
    md: 8,
    lg: 16,
  },
  color: { ...brand, ...derived },
  typography: {
    fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
    },
  },
  shadow: {
    sm: "0 1px 2px rgba(19, 27, 46, 0.08)",
    md: "0 4px 12px rgba(19, 27, 46, 0.12)",
    lg: "0 12px 32px rgba(19, 27, 46, 0.16)",
  },
  breakpoints: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
} as const;
