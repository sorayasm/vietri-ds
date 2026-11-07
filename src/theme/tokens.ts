/**
 * Design tokens de Vietri DS — única fuente de verdad.
 * Los temas leen de aquí; ningún tema debe tener valores escritos a mano.
 */

/** Colores de marca (Voxmater). */
export const brand = {
  navy: "#131B2E",
  sky: "#38BDF8",
  purple: "#481374",
  mist: "#E2E8F0",
  white: "#FFFFFF",
  black: "#000000",
} as const;

/**
 * Colores derivados: no son de la marca, existen para dar jerarquía
 * (texto secundario, superficies elevadas) manteniendo contraste AA.
 */
export const derived = {
  /** Texto secundario sobre fondos claros (7.6:1 sobre blanco). */
  slate: "#475569",
  /** Texto secundario sobre fondos oscuros (11.6:1 sobre navy). */
  slateLight: "#CBD5E1",
  /** Superficie elevada sobre navy (tarjetas en el tema oscuro). */
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
