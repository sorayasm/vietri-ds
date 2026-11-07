import "@mui/material/styles";
import type { tokens } from "./tokens";

export interface VietriExtras {
  color: typeof tokens.color;
  shadow: typeof tokens.shadow;
}

declare module "@mui/material/styles" {
  interface Theme {
    vietri: VietriExtras;
  }
  interface ThemeOptions {
    vietri?: VietriExtras;
  }
}
