import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Button } from "../Button";
import { Card, CardContent } from "../Card";
import { Icon } from "../Icon";
import { ExternalLink, Music } from "../Icon/icons";
import { VisuallyHidden } from "../VisuallyHidden";

type HeadingLevel = 2 | 3 | 4 | 5 | 6;

export interface PlaylistPlatform {
  /** Name shown on the button, for example "Spotify". */
  name: string;
  href: string;
}

export interface PlaylistCardProps {
  title: string;
  description?: string;
  /** Square cover. Without it a plain surface with a music icon is shown. */
  imageUrl?: string;
  platforms: PlaylistPlatform[];
  /** Heading level of the title. Default 3. */
  level?: HeadingLevel;
  /** Accessible name of the list of platforms. Default "Listen on". */
  platformsLabel?: string;
  /** Text for screen readers on external links. */
  externalLabel?: string;
}

/**
 * Card for a playlist that lives on several music services. Each service is a
 * link that opens in a new tab. The accessible name of every link includes the
 * playlist title, so several cards on a page stay distinguishable.
 */
export function PlaylistCard({
  title,
  description,
  imageUrl,
  platforms,
  level = 3,
  platformsLabel = "Listen on",
  externalLabel = "(opens in a new tab)",
}: PlaylistCardProps) {
  const heading = `h${level}` as `h${HeadingLevel}`;

  return (
    <Card sx={{ height: "100%" }}>
      <Box
        sx={(theme) => ({
          aspectRatio: "1 / 1",
          display: "grid",
          placeItems: "center",
          bgcolor: theme.vietri.color.chip,
          color: theme.palette.text.secondary,
        })}
      >
        {imageUrl ? (
          <Box
            component="img"
            src={imageUrl}
            alt=""
            loading="lazy"
            sx={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <Icon icon={Music} size={48} />
        )}
      </Box>
      <CardContent>
        <Typography component={heading} variant="h6" gutterBottom>
          {title}
        </Typography>
        {description && (
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        )}
        {platforms.length > 0 && (
          <Stack
            component="ul"
            role="list"
            aria-label={platformsLabel}
            direction="row"
            spacing={1}
            useFlexGap
            flexWrap="wrap"
            sx={{ listStyle: "none", m: 0, mt: 2, p: 0 }}
          >
            {platforms.map((platform) => (
              <li key={platform.name}>
                <Button
                  variant="outlined"
                  size="small"
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  endIcon={<Icon icon={ExternalLink} size={14} />}
                >
                  {platform.name}
                  <VisuallyHidden>
                    {" "}
                    – {title} {externalLabel}
                  </VisuallyHidden>
                </Button>
              </li>
            ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}
