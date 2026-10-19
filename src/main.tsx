import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider, Typography, Box } from "@mui/material";
import { editorialTheme } from "./theme";
import "./styles.css";

function App() {
  return (
    <ThemeProvider theme={editorialTheme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", p: { xs: 3, md: 8 } }}>
        <Typography variant="overline">Vietri DS · 0.1</Typography>
        <Typography variant="h1" sx={{ maxWidth: 900, mt: 4 }}>
          One design system. Multiple product experiences.
        </Typography>
        <Typography sx={{ maxWidth: 650, mt: 4 }}>
          A themeable React component system built with TypeScript and MUI.
        </Typography>
      </Box>
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode><App /></React.StrictMode>
);
