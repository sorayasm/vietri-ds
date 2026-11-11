import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import type { Theme } from "@mui/material/styles";
import { stretchedLink } from "../internal/stretched";

type HeadingLevel = 2 | 3 | 4 | 5 | 6;

export interface Episode {
  id: string;
  /** Episode number, as published (it may not match the position in the list). */
  number: number;
  title: string;
  description?: string;
  /** Extra line, for example guest and duration. */
  meta?: string;
  /** Small picture. */
  imageUrl?: string;
  /** Shape of the picture, for example "1 / 1" for a square flyer. Default "16 / 9". */
  imageAspectRatio?: string;
  /** Makes the row a link. */
  href?: string;
}

export interface EpisodeListProps {
  episodes: Episode[];
  /** Id of the episode being watched. It is marked with aria-current. */
  currentId?: string;
  /** Makes every row a button and reports the chosen id. */
  onSelect?: (id: string) => void;
  /** Heading level of each title. Default 3. */
  level?: HeadingLevel;
  /** Accessible name of the list, for example "Season 1". */
  ariaLabel?: string;
  /** Text above each title. Default "Episode N". */
  episodeLabel?: (number: number) => string;
  /** Text shown on the current episode. Default "Now playing". */
  currentLabel?: string;
}

const rowFocus = (theme: Theme) => ({
  "&:has(:focus-visible)": {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: -2,
  },
  "& a:focus-visible, & button:focus-visible": { outline: "none" },
});

/**
 * Vertical list of episodes. It is an ordered list; each title is a heading,
 * and the whole row is operable with mouse and keyboard when it has a link or
 * `onSelect`.
 */
export function EpisodeList({
  episodes,
  currentId,
  onSelect,
  level = 3,
  ariaLabel,
  episodeLabel = (number) => `Episode ${number}`,
  currentLabel = "Now playing",
}: EpisodeListProps) {
  const heading = `h${level}` as `h${HeadingLevel}`;

  return (
    <Box
      component="ol"
      role="list"
      aria-label={ariaLabel}
      sx={{ listStyle: "none", m: 0, p: 0 }}
    >
      {episodes.map((episode) => {
        const isCurrent = episode.id === currentId;
        const interactive = Boolean(onSelect || episode.href);

        const title = onSelect ? (
          <Link
            component="button"
            type="button"
            onClick={() => onSelect(episode.id)}
            aria-current={isCurrent ? "true" : undefined}
            underline="none"
            sx={stretchedLink}
          >
            {episode.title}
          </Link>
        ) : episode.href ? (
          <Link
            href={episode.href}
            aria-current={isCurrent ? "true" : undefined}
            underline="none"
            sx={stretchedLink}
          >
            {episode.title}
          </Link>
        ) : (
          episode.title
        );

        return (
          <Box
            component="li"
            key={episode.id}
            sx={(theme) => ({
              position: "relative",
              display: "flex",
              gap: 2,
              p: 2,
              borderBottom: 1,
              borderColor: "divider",
              borderLeft: 4,
              borderLeftColor: isCurrent ? theme.palette.primary.main : "transparent",
              ...(interactive && { "&:hover": { bgcolor: theme.palette.action.hover } }),
              ...rowFocus(theme),
            })}
          >
            {episode.imageUrl && (
              <Box
                component="img"
                src={episode.imageUrl}
                alt=""
                loading="lazy"
                sx={{
                  flex: "0 0 auto",
                  width: { xs: 112, sm: 160 },
                  aspectRatio: episode.imageAspectRatio ?? "16 / 9",
                  objectFit: "cover",
                  borderRadius: 1,
                }}
              />
            )}
            <Box sx={{ minWidth: 0 }}>
              <Typography component="p" variant="overline" color="text.secondary">
                {episodeLabel(episode.number)}
                {isCurrent && ` · ${currentLabel}`}
              </Typography>
              <Typography component={heading} variant="h6">
                {title}
              </Typography>
              {episode.meta && (
                <Typography variant="body2" color="text.secondary">
                  {episode.meta}
                </Typography>
              )}
              {episode.description && (
                <Typography
                  variant="body2"
                  sx={{
                    mt: 0.5,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {episode.description}
                </Typography>
              )}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
