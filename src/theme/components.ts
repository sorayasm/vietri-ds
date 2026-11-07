import type { ThemeOptions } from "@mui/material/styles";
import { tokens } from "./tokens";

/**
 * Identidad visual de los componentes MUI. Vive en el tema para que
 * aplique igual en los tres temas y en cualquier app que use Vietri.
 */
export const components: ThemeOptions["components"] = {
  MuiButton: {
    defaultProps: { disableElevation: true },
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: tokens.radius.md,
        "&:focus-visible": {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: 2,
        },
      }),
    },
  },
};
