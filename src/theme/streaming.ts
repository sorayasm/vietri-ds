import { createTheme } from "@mui/material/styles";
import { baseOptions } from "./base";
import { tokens } from "./tokens";

const { color } = tokens;

export const streamingTheme = createTheme({
  ...baseOptions,
  palette: {
    mode: "dark",
    primary: { main: color.sky, contrastText: color.navy },
    secondary: { main: color.mist, contrastText: color.navy },
    background: { default: color.navy, paper: color.navyRaised },
    text: { primary: color.white, secondary: color.slateLight },
    divider: "rgba(226, 232, 240, 0.12)",
  },
});
