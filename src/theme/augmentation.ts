import "@mui/material/styles";
import type { ThemeColors } from "./palettes";
import type { Gradients, tokens } from "./tokens";

export interface VietriExtras {
  /** Named colors of the active theme (see palettes.ts). */
  color: ThemeColors;
  shadow: typeof tokens.shadow;
  gradient: Gradients;
}

declare module "@mui/material/styles" {
  interface Theme {
    vietri: VietriExtras;
  }
  interface ThemeOptions {
    vietri?: VietriExtras;
  }
}
