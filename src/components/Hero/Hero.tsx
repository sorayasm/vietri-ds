import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeroProps {
  title: string;
  /** Small label above the title. */
  eyebrow?: ReactNode;
  description?: ReactNode;
  /** Buttons or links under the text. */
  actions?: ReactNode;
  /** Heading level of the title (h1–h6). A page's hero is normally h1. */
  level?: HeadingLevel;
  align?: "left" | "center";
}

/**
 * Banner for the top of a page. It uses the theme surface color (flat) with
 * light text on top. Outlined and text buttons inside it take the text color
 * of the surface, so they stay visible.
 */
export function Hero({
  title,
  eyebrow,
  description,
  actions,
  level = 1,
  align = "left",
}: HeroProps) {
  const heading = `h${level}` as `h${HeadingLevel}`;
  const center = align === "center";

  return (
    <Box
      component="section"
      sx={(theme) => ({
        py: { xs: 6, md: 10 },
        color: theme.vietri.color.onSurface,
        background: theme.vietri.gradient.surface,
        // Focus ring and secondary buttons that stay visible on a dark surface.
        "& a:focus-visible, & button:focus-visible": {
          outline: "2px solid",
          outlineColor: theme.vietri.color.onSurface,
          outlineOffset: 3,
        },
        "& .MuiButton-outlined, & .MuiButton-text": {
          color: "inherit",
          borderColor: "currentColor",
        },
      })}
    >
      <Container maxWidth="lg">
        <Stack
          spacing={2}
          sx={{ alignItems: center ? "center" : "flex-start", textAlign: align }}
        >
          {eyebrow && (
            <Typography
              component="p"
              variant="overline"
              sx={(theme) => ({ color: theme.vietri.color.onSurfaceSoft })}
            >
              {eyebrow}
            </Typography>
          )}
          <Typography component={heading} variant="h2" sx={{ maxWidth: 900 }}>
            {title}
          </Typography>
          {description && (
            <Typography
              variant="body1"
              sx={(theme) => ({
                maxWidth: 680,
                color: theme.vietri.color.onSurfaceSoft,
              })}
            >
              {description}
            </Typography>
          )}
          {actions && (
            <Stack
              direction="row"
              spacing={2}
              useFlexGap
              flexWrap="wrap"
              sx={{ pt: 2, justifyContent: center ? "center" : "flex-start" }}
            >
              {actions}
            </Stack>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
