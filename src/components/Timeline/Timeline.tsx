import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type HeadingLevel = 2 | 3 | 4 | 5 | 6;

export interface TimelineEntry {
  /** Unique id. It is also the anchor of the entry (`#id`). */
  id: string;
  /** Period or date, for example "1920s". */
  label: string;
  description?: ReactNode;
  content?: ReactNode;
}

export interface TimelineProps {
  entries: TimelineEntry[];
  /** Heading level of each label. Default 3. */
  level?: HeadingLevel;
  /** Accessible name of the list, for example "Timeline by decade". */
  ariaLabel?: string;
}

/**
 * Vertical timeline. It is an ordered list; every entry has a heading, so
 * screen reader users can jump from period to period.
 */
export function Timeline({ entries, level = 3, ariaLabel }: TimelineProps) {
  const heading = `h${level}` as `h${HeadingLevel}`;
  return (
    <Box
      component="ol"
      role="list"
      aria-label={ariaLabel}
      sx={{ listStyle: "none", m: 0, p: 0 }}
    >
      {entries.map((entry) => (
        <Box
          component="li"
          key={entry.id}
          id={entry.id}
          sx={(theme) => ({
            position: "relative",
            pl: 4,
            pb: 5,
            scrollMarginTop: theme.spacing(10),
            // Vertical line between dots.
            "&::before": {
              content: '""',
              position: "absolute",
              left: 7,
              top: 14,
              bottom: 0,
              width: 2,
              bgcolor: theme.palette.divider,
            },
            "&:last-of-type": { pb: 0 },
            "&:last-of-type::before": { display: "none" },
          })}
        >
          <Box
            aria-hidden="true"
            sx={(theme) => ({
              position: "absolute",
              left: 0,
              top: 6,
              width: 16,
              height: 16,
              borderRadius: "50%",
              bgcolor: theme.palette.primary.main,
              border: `3px solid ${theme.palette.background.default}`,
              boxSizing: "border-box",
            })}
          />
          <Typography component={heading} variant="h5">
            {entry.label}
          </Typography>
          {entry.description && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {entry.description}
            </Typography>
          )}
          {entry.content && <Box sx={{ mt: 2 }}>{entry.content}</Box>}
        </Box>
      ))}
    </Box>
  );
}
