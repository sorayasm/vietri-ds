import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
import { Icon } from "../Icon";
import { ExternalLink } from "../Icon/icons";
import { VisuallyHidden } from "../VisuallyHidden";

export interface FooterLink {
  label: string;
  href: string;
  /** Opens in a new tab and tells screen readers about it. */
  external?: boolean;
}

export interface FooterProps {
  /** Project or brand name. */
  title: ReactNode;
  description?: ReactNode;
  /** Contact lines: city, email, etc. */
  lines?: string[];
  links?: FooterLink[];
  /** Accessible name of the links list. */
  linksLabel?: string;
  /** Highlighted action, for example a button. */
  action?: ReactNode;
  legal?: ReactNode;
  /** Text for screen readers on external links. */
  externalLabel?: string;
}

export function Footer({
  title,
  description,
  lines = [],
  links = [],
  linksLabel = "Footer links",
  action,
  legal,
  externalLabel = "(opens in a new tab)",
}: FooterProps) {
  const { glow } = useTheme().vietri.color;
  return (
    <Box
      component="footer"
      sx={(theme) => ({
        position: "relative",
        overflow: "hidden",
        py: 6,
        color: theme.vietri.color.onSurface,
        background: theme.vietri.gradient.surface,
        // The default focus ring is not visible on dark backgrounds.
        "& a:focus-visible, & button:focus-visible": {
          outline: "2px solid",
          outlineColor: theme.vietri.color.onSurface,
          outlineOffset: 3,
        },
      })}
    >
      {/* Decorative lights: they carry no information. Themes may turn them off. */}
      {glow && (
        <>
          <Box
            aria-hidden="true"
            sx={{
              position: "absolute",
              top: -96,
              right: -96,
              width: 384,
              height: 384,
              borderRadius: "50%",
              bgcolor: alpha(glow[0], 0.22),
              filter: "blur(64px)",
              pointerEvents: "none",
            }}
          />
          <Box
            aria-hidden="true"
            sx={{
              position: "absolute",
              bottom: -96,
              left: -96,
              width: 384,
              height: 384,
              borderRadius: "50%",
              bgcolor: alpha(glow[1], 0.22),
              filter: "blur(64px)",
              pointerEvents: "none",
            }}
          />
        </>
      )}

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={4}
        >
          <Stack spacing={1}>
            <Typography component="p" variant="h6">
              {title}
            </Typography>
            {description && (
              <Typography
                variant="body2"
                sx={(theme) => ({
                  maxWidth: 560,
                  color: theme.vietri.color.onSurfaceSoft,
                })}
              >
                {description}
              </Typography>
            )}
            {lines.map((line) => (
              <Typography
                key={line}
                variant="body2"
                sx={(theme) => ({ color: theme.vietri.color.onSurfaceSoft })}
              >
                {line}
              </Typography>
            ))}
          </Stack>

          <Stack spacing={2} alignItems={{ xs: "flex-start", sm: "flex-end" }}>
            {links.length > 0 && (
              <Box component="nav" aria-label={linksLabel}>
                <Stack
                  component="ul"
                  direction="row"
                  spacing={3}
                  useFlexGap
                  flexWrap="wrap"
                  sx={{ listStyle: "none", m: 0, p: 0 }}
                >
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        color="inherit"
                        underline="always"
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}
                      >
                        {link.label}
                        {link.external && (
                          <>
                            <Icon icon={ExternalLink} size={14} />
                            <VisuallyHidden>{externalLabel}</VisuallyHidden>
                          </>
                        )}
                      </Link>
                    </li>
                  ))}
                </Stack>
              </Box>
            )}
            {action}
          </Stack>
        </Stack>

        {legal && (
          <>
            <Divider
              sx={(theme) => ({
                my: 3,
                borderColor: alpha(theme.vietri.color.onSurface, 0.25),
              })}
            />
            <Typography
              variant="body2"
              sx={(theme) => ({ color: theme.vietri.color.onSurfaceSoft })}
            >
              {legal}
            </Typography>
          </>
        )}
      </Container>
    </Box>
  );
}
