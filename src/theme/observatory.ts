import { editorialTheme } from "./editorial";
import { createTheme } from "@mui/material/styles";

export const observatoryTheme = createTheme(editorialTheme, {
  palette: {
    mode: "light",
    background: { default: "#F7F7F7", paper: "#FFFFFF" },
    primary: { main: "#243B53" },
    secondary: { main: "#829AB1" },
  },
});
