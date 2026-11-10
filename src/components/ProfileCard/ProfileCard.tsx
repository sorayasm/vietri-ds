import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";
import type { CategoryColor } from "../../theme/categorical";
import { Card, CardContent } from "../Card";
import { CategoryChip, Chip } from "../Chip";

type HeadingLevel = 2 | 3 | 4 | 5 | 6;

export interface ProfileTag {
  label: string;
  /** Category color, from `createCategoryColors`. Without it the chip is neutral. */
  color?: CategoryColor;
}

export interface ProfileCardProps {
  name: string;
  /** Short epithet or description under the name. */
  subtitle?: string;
  bio?: string;
  tags?: ProfileTag[];
  /** Makes the whole card a link. */
  href?: string;
  /** Makes the whole card a button (for example to open a side panel). */
  onClick?: () => void;
  /** Heading level of the name. Default 3. */
  level?: HeadingLevel;
  /** Lines of bio shown before it is cut. Default 3. */
  bioLines?: number;
}

// The link sits inside the heading and its ::after covers the whole card
// ("stretched link"): one tab stop, a real heading, and a card that is
// entirely clickable. Position must be static so the card is the reference.
const stretchedLink: SxProps<Theme> = {
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

/**
 * Card for a person or profile. When it has `href` or `onClick` the whole
 * card is operable with mouse and keyboard, and the name stays a heading.
 */
export function ProfileCard({
  name,
  subtitle,
  bio,
  tags = [],
  href,
  onClick,
  level = 3,
  bioLines = 3,
}: ProfileCardProps) {
  const heading = `h${level}` as `h${HeadingLevel}`;
  const interactive = Boolean(href || onClick);

  const title = href ? (
    <Link href={href} underline="none" sx={stretchedLink}>
      {name}
    </Link>
  ) : onClick ? (
    <Link component="button" type="button" onClick={onClick} underline="none" sx={stretchedLink}>
      {name}
    </Link>
  ) : (
    name
  );

  return (
    <Card
      sx={(theme) => ({
        position: "relative",
        height: "100%",
        ...(interactive && { "&:hover": { borderColor: theme.palette.primary.main } }),
        // One focus ring for the whole card, instead of one around the name.
        "&:has(:focus-visible)": {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: 2,
        },
        "& a:focus-visible, & button:focus-visible": { outline: "none" },
      })}
    >
      <CardContent>
        <Typography component={heading} variant="h6">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
        {bio && (
          <Typography
            variant="body2"
            sx={{
              mt: 1,
              display: "-webkit-box",
              WebkitLineClamp: bioLines,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {bio}
          </Typography>
        )}
        {tags.length > 0 && (
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mt: 2 }}>
            {tags.map((tag) =>
              tag.color ? (
                <CategoryChip key={tag.label} label={tag.label} color={tag.color} />
              ) : (
                <Chip key={tag.label} label={tag.label} size="small" />
              )
            )}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}
