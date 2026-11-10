import { createTheme, type ThemeOptions } from "@mui/material/styles";
import "./augmentation";
import type { VietriExtras } from "./augmentation";
import { components } from "./components";
import type { ThemeColors } from "./palettes";
import { createGradients, tokens } from "./tokens";

const { typography, breakpoints } = tokens;

/** Extras available on `theme.vietri` for components. */
export function vietriExtras(colors: ThemeColors): VietriExtras {
  return {
    color: colors,
    shadow: tokens.shadow,
    gradient: createGradients(colors),
  };
}

/**
 * Options shared by all themes: typography, shape, spacing, breakpoints and
 * component styles. Each theme only provides its own palette and gradients.
 */
export const baseOptions: ThemeOptions = {
  spacing: tokens.spacing,
  shape: { borderRadius: tokens.radius.md },
  breakpoints: { values: { ...breakpoints } },
  typography: {
    fontFamily: typography.fontFamily,
    fontWeightRegular: typography.fontWeight.regular,
    fontWeightMedium: typography.fontWeight.medium,
    fontWeightBold: typography.fontWeight.semibold,
    h1: {
      fontSize: "clamp(3rem, 8vw, 7rem)",
      fontWeight: typography.fontWeight.semibold,
      letterSpacing: "-0.055em",
      lineHeight: 0.95,
    },
    h2: {
      fontSize: "clamp(2rem, 5vw, 4rem)",
      fontWeight: typography.fontWeight.semibold,
      letterSpacing: "-0.04em",
      lineHeight: 1.05,
    },
    h3: {
      fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
      fontWeight: typography.fontWeight.semibold,
      letterSpacing: "-0.03em",
      lineHeight: 1.15,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: typography.fontWeight.semibold,
      letterSpacing: "-0.02em",
      lineHeight: 1.25,
    },
    h5: { fontSize: "1.25rem", fontWeight: typography.fontWeight.medium, lineHeight: 1.3 },
    h6: { fontSize: "1.0625rem", fontWeight: typography.fontWeight.medium, lineHeight: 1.4 },
    body1: { fontSize: "1rem", lineHeight: 1.6 },
    body2: { fontSize: "0.875rem", lineHeight: 1.55 },
    button: {
      fontWeight: typography.fontWeight.medium,
      textTransform: "none",
      letterSpacing: "-0.01em",
    },
    overline: {
      fontWeight: typography.fontWeight.medium,
      letterSpacing: "0.12em",
    },
  },
  components,
};

/**
 * Builds a complete theme from a palette: MUI palette, `theme.vietri` extras,
 * and everything shared in `baseOptions`.
 */
export function createVietriTheme(colors: ThemeColors) {
  return createTheme({
    ...baseOptions,
    vietri: vietriExtras(colors),
    palette: {
      mode: colors.mode,
      primary: { main: colors.primary, contrastText: colors.onPrimary },
      secondary: { main: colors.secondary, contrastText: colors.onSecondary },
      error: { main: colors.status.error, contrastText: colors.onStatus },
      warning: { main: colors.status.warning, contrastText: colors.onStatus },
      info: { main: colors.status.info, contrastText: colors.onStatus },
      success: { main: colors.status.success, contrastText: colors.onStatus },
      background: { default: colors.bg, paper: colors.paper },
      text: { primary: colors.ink, secondary: colors.inkSoft },
      divider: colors.line,
    },
  });
}
