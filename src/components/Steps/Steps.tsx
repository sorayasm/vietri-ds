import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type HeadingLevel = 2 | 3 | 4 | 5 | 6;

export interface Step {
  title: string;
  description?: ReactNode;
}

export interface StepsProps {
  steps: Step[];
  /** Heading level of each step title. Default 3. */
  level?: HeadingLevel;
  /** Accessible name of the list, for example "Methodology". */
  ariaLabel?: string;
}

/**
 * Numbered process. It is an ordered list, so screen readers announce the
 * position of each step; the visible numbers are decorative.
 */
export function Steps({ steps, level = 3, ariaLabel }: StepsProps) {
  const heading = `h${level}` as `h${HeadingLevel}`;
  return (
    <Box
      component="ol"
      role="list"
      aria-label={ariaLabel}
      sx={{
        listStyle: "none",
        m: 0,
        p: 0,
        display: "grid",
        gap: 3,
        gridTemplateColumns: {
          xs: "1fr",
          md: `repeat(${Math.max(steps.length, 1)}, minmax(0, 1fr))`,
        },
      }}
    >
      {steps.map((step, index) => (
        <li key={step.title}>
          <Stack spacing={1}>
            <Box
              aria-hidden="true"
              sx={(theme) => ({
                display: "grid",
                placeItems: "center",
                width: 36,
                height: 36,
                borderRadius: "50%",
                fontWeight: 600,
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
              })}
            >
              {index + 1}
            </Box>
            <Typography component={heading} variant="h6">
              {step.title}
            </Typography>
            {step.description && (
              <Typography variant="body2" color="text.secondary">
                {step.description}
              </Typography>
            )}
          </Stack>
        </li>
      ))}
    </Box>
  );
}
