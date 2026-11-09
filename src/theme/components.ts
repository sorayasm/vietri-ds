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

  MuiLink: {
    styleOverrides: {
      root: ({ theme }) => ({
        "&:focus-visible": {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: 3,
          borderRadius: tokens.radius.sm,
        },
      }),
    },
  },

  MuiCard: {
    defaultProps: { variant: "outlined" },
    styleOverrides: {
      root: {
        borderRadius: tokens.radius.lg,
        backgroundImage: "none",
      },
    },
  },

  MuiCardActionArea: {
    styleOverrides: {
      root: ({ theme }) => ({
        "&:focus-visible": {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: -2,
        },
      }),
    },
  },

  // El borde de los campos usa el color de texto secundario para cumplir
  // el contraste mínimo de 3:1 en componentes de interfaz (WCAG 1.4.11).
  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: tokens.radius.md,
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.text.secondary,
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.text.primary,
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.primary.main,
        },
        "&.Mui-error .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.error.main,
        },
        "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.divider,
        },
      }),
    },
  },

  MuiTableCell: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderBottomColor: theme.palette.divider,
      }),
      head: ({ theme }) => ({
        fontWeight: tokens.typography.fontWeight.semibold,
        color: theme.palette.text.primary,
        borderBottom: `2px solid ${theme.palette.text.primary}`,
      }),
    },
  },
};
