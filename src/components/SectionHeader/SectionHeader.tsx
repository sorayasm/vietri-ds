import type { ReactNode } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface SectionHeaderProps {
  title: string;
  /** Small label above the title, with an optional icon. */
  eyebrow?: ReactNode;
  description?: ReactNode;
  /**
   * Heading level (h1–h6). It does not change the look: it keeps the page
   * hierarchy correct for screen readers.
   */
  level?: HeadingLevel;
  align?: "left" | "center";
}

export function SectionHeader({
  title,
  eyebrow,
  description,
  level = 2,
  align = "left",
}: SectionHeaderProps) {
  const heading = `h${level}` as `h${HeadingLevel}`;
  return (
    <Stack spacing={1} sx={{ textAlign: align, alignItems: align === "center" ? "center" : "flex-start" }}>
      {eyebrow && (
        <Typography
          component="p"
          variant="overline"
          color="primary.main"
          sx={{ display: "inline-flex", alignItems: "center", gap: 0.75, lineHeight: 1.5 }}
        >
          {eyebrow}
        </Typography>
      )}
      <Typography component={heading} variant="h3">
        {title}
      </Typography>
      {description && (
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 680 }}>
          {description}
        </Typography>
      )}
    </Stack>
  );
}
