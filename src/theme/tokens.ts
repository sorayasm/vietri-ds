/**
 * Vietri DS design tokens that do not depend on the theme: spacing, radius,
 * typography, shadows and breakpoints. Colors live in `palettes.ts`, one
 * palette per theme.
 */
import type { GradientStops, ThemeColors } from "./palettes";

export type { GradientStops };

export function linearGradient(from: string, to: string, angle = 135, mid?: string): string {
  const middle = mid ? `, ${mid} 60%` : "";
  return `linear-gradient(${angle}deg, ${from} 0%${middle}, ${to} 100%)`;
}

export interface Gradients {
  /** Footers, headers and banners. */
  surface: string;
  /** Primary buttons. */
  action: string;
  actionHover: string;
}

/**
 * Turns a palette's color pairs into CSS. When both colors of a pair are
 * equal the result looks flat, so flat themes and gradient themes share code.
 */
export function createGradients(
  colors: Pick<ThemeColors, "surface" | "action" | "actionHover"> &
    Partial<Pick<ThemeColors, "surfaceMid" | "surfaceAngle">>
): Gradients {
  return {
    surface: linearGradient(
      colors.surface[0],
      colors.surface[1],
      colors.surfaceAngle ?? 135,
      colors.surfaceMid
    ),
    action: linearGradient(...colors.action),
    actionHover: linearGradient(...colors.actionHover),
  };
}

export const tokens = {
  spacing: 8,
  radius: {
    sm: 4,
    md: 8,
    lg: 16,
  },
  typography: {
    fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
    },
  },
  shadow: {
    sm: "0 1px 2px rgba(0, 0, 0, 0.08)",
    md: "0 4px 12px rgba(0, 0, 0, 0.12)",
    lg: "0 12px 32px rgba(0, 0, 0, 0.16)",
  },
  breakpoints: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
} as const;
