import type { SxProps, Theme } from "@mui/material/styles";

/**
 * Link or button placed inside a heading whose ::after covers the whole card
 * ("stretched link"): one tab stop, a real heading and a fully clickable card.
 * Position must be static so the card is the positioning reference.
 */
export const stretchedLink: SxProps<Theme> = {
  position: "static",
  color: "inherit",
  font: "inherit",
  textAlign: "left",
  cursor: "pointer",
  "&::after": {
    content: '""',
    position: "absolute",
    inset: 0,
  },
};

/** One focus ring for the whole card, instead of one around the inner link. */
export const cardFocusRing = (theme: Theme) => ({
  "&:has(:focus-visible)": {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 2,
  },
  "& a:focus-visible, & button:focus-visible": { outline: "none" },
});
