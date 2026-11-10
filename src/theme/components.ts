import type { ThemeOptions } from "@mui/material/styles";
import "./augmentation";
import { tokens } from "./tokens";

/**
 * Visual identity of the MUI components. It lives in the theme so it
 * applies the same way to all three themes and to any app that uses Vietri.
 */
export const components: ThemeOptions["components"] = {
  // Respects the system "reduce motion" preference (WCAG 2.3.3).
  MuiCssBaseline: {
    styleOverrides: `
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      }
    `,
  },

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
      // Primary action fill. Flat in most themes, a soft gradient in the
      // Observatory. The text color meets AA at both ends of the fill.
      containedPrimary: ({ theme }) => ({
        color: theme.vietri.color.onAction,
        backgroundImage: theme.vietri.gradient.action,
        "&:hover": { backgroundImage: theme.vietri.gradient.actionHover },
        "&.Mui-disabled": {
          backgroundImage: "none",
          color: theme.palette.action.disabled,
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

  MuiChip: {
    styleOverrides: {
      root: ({ ownerState, theme }) => {
        const isDefaultFilled =
          ownerState.variant === "filled" && ownerState.color === "default";
        return {
          fontWeight: tokens.typography.fontWeight.semibold,
          fontSize: "0.75rem",
          // MUI's default chip is translucent, so its text is only readable on
          // the surface it was designed for. Opaque colors keep it legible on
          // any surface (a dark chip on white, a light chip on purple…).
          ...(isDefaultFilled && {
            color: theme.vietri.color.onChip,
            backgroundColor: theme.vietri.color.chip,
            "&.MuiChip-clickable:hover": {
              backgroundColor: theme.vietri.color.chipHover,
            },
          }),
        };
      },
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

  MuiDialog: {
    styleOverrides: {
      paper: { borderRadius: tokens.radius.lg, backgroundImage: "none" },
    },
  },

  MuiDrawer: {
    styleOverrides: {
      paper: { backgroundImage: "none" },
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
