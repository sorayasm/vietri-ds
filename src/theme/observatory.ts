import { createTheme } from "@mui/material/styles";
import { baseOptions } from "./base";
import { tokens } from "./tokens";

const { color } = tokens;

export const observatoryTheme = createTheme({
  ...baseOptions,
  palette: {
    mode: "light",
    primary: { main: color.purple, contrastText: color.white },
    secondary: { main: color.sky, contrastText: color.navy },
    background: { default: color.mist, paper: color.white },
    text: { primary: color.navy, secondary: color.slate },
    divider: "rgba(19, 27, 46, 0.12)",
  },
});
