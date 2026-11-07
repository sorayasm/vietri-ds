import { createTheme } from "@mui/material/styles";
import { baseOptions } from "./base";
import { tokens } from "./tokens";

const { color } = tokens;

export const editorialTheme = createTheme({
  ...baseOptions,
  palette: {
    mode: "light",
    primary: { main: color.purple, contrastText: color.white },
    secondary: { main: color.slate, contrastText: color.white },
    background: { default: color.white, paper: color.white },
    text: { primary: color.navy, secondary: color.slate },
    divider: color.mist,
  },
});
