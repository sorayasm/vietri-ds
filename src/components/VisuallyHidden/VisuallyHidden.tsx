import type { ComponentProps } from "react";
import Box from "@mui/material/Box";

/**
 * Hides content visually while keeping it available to screen readers. Use it
 * for supporting text ("opens in a new tab") and for aria-live regions.
 */
export function VisuallyHidden(props: ComponentProps<"span">) {
  return (
    <Box
      component="span"
      sx={{
        border: 0,
        clip: "rect(0 0 0 0)",
        height: "1px",
        margin: "-1px",
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        whiteSpace: "nowrap",
        width: "1px",
      }}
      {...props}
    />
  );
}
