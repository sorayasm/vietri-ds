import type { ReactNode } from "react";
import Box from "@mui/material/Box";

/**
 * Wrapper for documentation pages. It paints the active theme's own background
 * and text color, so the page is readable in every theme (including the dark
 * one) no matter what surface Storybook puts behind it.
 */
export function ThemedPage({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ bgcolor: "background.default", color: "text.primary" }}>
      {children}
    </Box>
  );
}
