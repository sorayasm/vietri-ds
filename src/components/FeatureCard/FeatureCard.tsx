import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Card, CardContent } from "../Card";
import { Icon } from "../Icon";

type HeadingLevel = 2 | 3 | 4 | 5 | 6;

export interface FeatureCardProps {
  /** Decorative icon (hidden from screen readers). */
  icon: LucideIcon;
  title: string;
  description?: ReactNode;
  /** Heading level of the title. Default 3. */
  level?: HeadingLevel;
  /** Extra content under the description, for example a list. */
  children?: ReactNode;
}

/** Card with an icon, a title and a short text. */
export function FeatureCard({
  icon,
  title,
  description,
  level = 3,
  children,
}: FeatureCardProps) {
  const heading = `h${level}` as `h${HeadingLevel}`;
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Box
          sx={(theme) => ({
            display: "grid",
            placeItems: "center",
            width: 44,
            height: 44,
            mb: 2,
            borderRadius: 2,
            bgcolor: theme.vietri.color.chip,
            color: theme.palette.primary.main,
          })}
        >
          <Icon icon={icon} size={22} />
        </Box>
        <Typography component={heading} variant="h6" gutterBottom>
          {title}
        </Typography>
        {description && (
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        )}
        {children && <Box sx={{ mt: 2 }}>{children}</Box>}
      </CardContent>
    </Card>
  );
}
