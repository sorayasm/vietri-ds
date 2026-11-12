/**
 * Color palettes — one per theme.
 *
 * Each theme (editorial, streaming, observatory) has its own identity:
 *   - editorial    → the portfolio: black, white and gold
 *   - streaming    → "El Blues es Femenino": deep violet and orange
 *   - observatory  → the Mujeres del Blues Observatory: teal, cyan, amber, coral, red, purple
 *
 * Every pair that carries text meets WCAG AA (4.5:1). Brand colors that are
 * too light or too dark to carry text on their own (gold on white, violet on
 * deep purple…) are only used as fills, next to a text color that does reach
 * 4.5:1, or replaced by a text-safe sibling (for example bronze for gold).
 */

/** Pair of colors (from, to) that defines a gradient. Equal colors = flat. */
export type GradientStops = readonly [from: string, to: string];

export interface StatusColors {
  error: string;
  warning: string;
  info: string;
  success: string;
}

export interface ThemeColors {
  mode: "light" | "dark";

  /** Page background. */
  bg: string;
  /** Cards, menus and dialogs. */
  paper: string;
  /** Primary text. */
  ink: string;
  /** Secondary text. */
  inkSoft: string;
  /** Dividers and hairlines. */
  line: string;

  /** MUI primary: links, outlines, selected states. Readable as text. */
  primary: string;
  onPrimary: string;
  /** MUI secondary: readable as text on bg and paper. */
  secondary: string;
  onSecondary: string;

  /** Fill of primary buttons. Flat when both colors are equal. */
  action: GradientStops;
  actionHover: GradientStops;
  /** Text on action fills. */
  onAction: string;
  /**
   * Optional color of the line of outlined buttons (a neutral one, so that the
   * line does not compete with the orange of the action). The label of those buttons
   * uses the text color. Hover and focus use the primary color. Needs 3:1 on the page
   * and on the cards.
   */
  outline?: string;

  /**
   * A brighter accent for the fill of large buttons, where the label is white and
   * bold (at least 18.7px, which counts as large text and only needs 3:1), and for
   * the short rule under a hero title. Can be livelier than `action`. Optional.
   */
  accentLarge?: string;
  /** Hover of `accentLarge`. */
  accentLargeHover?: string;

  /** Fill of footers, headers and banners. */
  surface: GradientStops;
  /** Optional middle color of the surface gradient (at 60%). */
  surfaceMid?: string;
  /** Angle of the surface gradient in degrees. Default 135. */
  surfaceAngle?: number;
  /** Optional 4px rule along the top edge of footers. Decorative: it carries no text. */
  surfaceRule?: string;
  /**
   * Color laid over a hero image so the text stays readable. At 74% or more it
   * keeps white text above 4.5:1 even over a pure white photo.
   */
  scrim: string;
  /** Text on surfaces. */
  onSurface: string;
  /** Secondary text on surfaces. */
  onSurfaceSoft: string;

  /** Default chip: opaque, so it is legible on any surface. */
  chip: string;
  chipHover: string;
  onChip: string;

  /**
   * Two decorative colors for soft blurred lights on surfaces, or `null` for
   * none. They carry no text. All current themes are flat, so they use null.
   */
  glow: readonly [string, string] | null;

  status: StatusColors;
  /** Text on status-colored buttons. */
  onStatus: string;

  /** Named brand colors, as supplied. Used by the Colors docs page. */
  brand: Record<string, string>;
  /** Colors derived from the brand to meet contrast (text-safe or hover). */
  derived: Record<string, string>;
}

const flat = (color: string): GradientStops => [color, color];

const lightStatus: StatusColors = {
  error: "#B91C1C",
  warning: "#92400E",
  info: "#0369A1",
  success: "#166534",
};

/** Portfolio — black, white and gold. */
export const editorialColors: ThemeColors = {
  mode: "light",
  bg: "#FFFFFF",
  paper: "#FFFFFF",
  ink: "#111111",
  inkSoft: "#555555",
  line: "#E4E4E4",
  primary: "#000000",
  onPrimary: "#FFFFFF",
  secondary: "#7A5718",
  onSecondary: "#FFFFFF",
  action: flat("#DBAC5B"),
  actionHover: flat("#FDD07A"),
  onAction: "#000000",
  surface: flat("#000000"),
  scrim: "#000000",
  onSurface: "#FFFFFF",
  onSurfaceSoft: "#D4D4D4",
  chip: "#F3EBDA",
  chipHover: "#E8DDC4",
  onChip: "#111111",
  glow: null,
  status: lightStatus,
  onStatus: "#FFFFFF",
  brand: {
    black: "#000000",
    gold: "#DBAC5B",
    white: "#FFFFFF",
    goldLight: "#FDD07A",
  },
  derived: {
    /** Gold that reads as text on white (6.6:1). */
    bronze: "#7A5718",
    ink: "#111111",
    inkSoft: "#555555",
  },
};

/**
 * El Blues es Femenino — deep violet and orange.
 *
 * Orange carries everything you can press, in three versions chosen by where it
 * sits: a burnt orange for button fills with white text, a light orange for links,
 * outlines and arrows on the dark backgrounds, and the brand orange for large text
 * and large buttons (a bold white label of 19px reaches 3.25:1, enough for large text).
 *
 * Everything else is violet and lilac: a flat deep violet footer with a thin orange
 * rule along its top, lilac lines on outlined buttons, white text. The rule of thumb:
 * orange is for acting, and it goes as a surface or over a dark flat background. On
 * the violet of a hero, or on a gradient, lines and texts are lilac or white, because
 * orange there gives 3.75:1 and vibrates.
 */
export const streamingColors: ThemeColors = {
  mode: "dark",
  bg: "#20123A",
  paper: "#2D1B50",
  ink: "#FFFFFF",
  inkSoft: "#D5CAEB",
  line: "rgba(255, 255, 255, 0.14)",
  // Orange as text, outline and focus ring on dark backgrounds (6.3:1 on night, 5.5:1 on cards).
  primary: "#F4793F",
  onPrimary: "#20123A",
  secondary: "#B99BFF",
  onSecondary: "#20123A",
  // Button fill: a burnt orange that holds white text at 4.8:1 (the brand orange gives 3.2:1).
  action: flat("#C8460B"),
  actionHover: flat("#B63F0A"),
  onAction: "#FFFFFF",
  // The line of outlined buttons: lilac (7.6:1 on the page, 6.6:1 on the cards).
  outline: "#B99BFF",
  // The brand orange, for large buttons (their bold label is large text) and for the
  // short rule under a hero title.
  accentLarge: "#F35F1C",
  accentLargeHover: "#DE520F",
  // A flat violet: white text at 12.9:1. A thin orange rule marks the top of the footer.
  surface: ["#3B2562", "#3B2562"],
  surfaceRule: "#F35F1C",
  // The layer over a hero photo: the brightest violet that keeps white text at 4.5:1
  // over a pure white photo with the layer at 74%.
  scrim: "#4E2B8B",
  onSurface: "#FFFFFF",
  onSurfaceSoft: "#F7F3FF",
  chip: "#3C2866",
  chipHover: "#4A3478",
  onChip: "#FFFFFF",
  glow: null,
  status: {
    error: "#F87171",
    warning: "#FBBF24",
    info: "#7DD3FC",
    success: "#4ADE80",
  },
  onStatus: "#20123A",
  brand: {
    night: "#20123A",
    violet: "#693BCC",
    lavender: "#816CB2",
    magenta: "#CB1F9C",
    /** The brand orange. */
    orange: "#F35F1C",
  },
  derived: {
    /** Violet that reads as text on the night background (7.6:1). */
    lilac: "#B99BFF",
    /** Raised surface over night. */
    nightRaised: "#2D1B50",
    /** Orange for text and outlines on dark backgrounds. */
    orangeText: "#F4793F",
    /** Burnt orange of the button fill (white text at 4.8:1). */
    orangeDeep: "#C8460B",
    /** Hovered button fill, darker (white text at 5.7:1). */
    orangeHover: "#B63F0A",
    /** Violet of the hero layer. */
    layerViolet: "#4E2B8B",
    /** The flat violet of the footer. */
    footerViolet: "#3B2562",
  },
};

/** Observatory — teal, cyan, amber, coral, red and deep purple. Flat colors. */
export const observatoryColors: ThemeColors = {
  mode: "light",
  bg: "#F7F4FA",
  paper: "#FFFFFF",
  ink: "#2B1B3D",
  inkSoft: "#5D4F70",
  line: "#E3DCEB",
  // Teal carries actions and links: it reads as text on white and carries
  // white text. Deep purple is the second voice.
  primary: "#027381",
  onPrimary: "#FFFFFF",
  secondary: "#4A0875",
  onSecondary: "#FFFFFF",
  action: flat("#027381"),
  actionHover: flat("#015C68"),
  onAction: "#FFFFFF",
  surface: flat("#4A0875"),
  scrim: "#2B1B3D",
  onSurface: "#FFFFFF",
  onSurfaceSoft: "#E8DCF4",
  chip: "#EFE8F6",
  chipHover: "#E3D8EF",
  onChip: "#2B1B3D",
  glow: null,
  status: {
    error: "#C41E32",
    warning: "#92400E",
    info: "#0369A1",
    success: "#166534",
  },
  onStatus: "#FFFFFF",
  // The seven colors of the palette. Cyan, amber, coral and vermilion are too
  // light to carry text on white: use them as fills, with dark text on top
  // (charts, categories, highlights).
  brand: {
    teal: "#027381",
    cyan: "#0EB9CB",
    amber: "#FFC23D",
    coral: "#FF7751",
    vermilion: "#F33829",
    crimson: "#C41E32",
    purple: "#4A0875",
  },
  derived: {
    /** Page background: a barely-there purple tint. */
    page: "#F7F4FA",
    ink: "#2B1B3D",
    inkSoft: "#5D4F70",
    /** Teal for the hovered primary action (7.7:1 with white). */
    tealDark: "#015C68",
  },
};
