import type { ThemeOptions } from "@mui/material/styles";
import { tokens } from "./tokens";

/**
 * Visual identity of the MUI components. It lives in the theme so it
 * applies the same way to all three themes and to any app that uses Vietri.
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

  // Field borders use the secondary text color to meet the 3:1 minimum
  // contrast for interface components (WCAG 1.4.11).
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
