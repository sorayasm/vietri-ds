import type { ThemeOptions } from "@mui/material/styles";
import "./augmentation";
import { components } from "./components";
import { tokens } from "./tokens";

const { color, typography, breakpoints } = tokens;

/**
 * Opciones compartidas por todos los temas: tipografía, forma, espaciado,
 * breakpoints y tokens. Cada tema solo aporta su paleta.
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
  vietri: { color, shadow: tokens.shadow },
};
