import { createTheme } from "@mui/material/styles";
import { tokens } from "./tokens";

export const editorialTheme = createTheme({
  spacing: tokens.spacing,
  shape: { borderRadius: tokens.radius.md },
  palette: {
    mode: "light",
    primary: { main: "#111111" },
    secondary: { main: "#6B6B6B" },
    background: { default: "#F4F2ED", paper: "#FFFFFF" },
    text: { primary: "#111111", secondary: "#5E5E5E" },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
    h1: { fontSize: "clamp(3rem, 8vw, 7rem)", fontWeight: 600, letterSpacing: "-0.055em", lineHeight: 0.95 },
    h2: { fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 600, letterSpacing: "-0.04em" },
    body1: { fontSize: "1rem", lineHeight: 1.6 },
  },
});
