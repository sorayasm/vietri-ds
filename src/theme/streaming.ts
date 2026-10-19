import { editorialTheme } from "./editorial";
import { createTheme } from "@mui/material/styles";

export const streamingTheme = createTheme(editorialTheme, {
  palette: {
    mode: "dark",
    background: { default: "#090909", paper: "#151515" },
    text: { primary: "#FFFFFF", secondary: "#B8B8B8" },
    primary: { main: "#FFFFFF" },
  },
});
