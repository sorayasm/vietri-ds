import { useState, type ReactNode } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import Toolbar from "@mui/material/Toolbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme, type Breakpoint } from "@mui/material/styles";
import { Button } from "../Button";

export interface NavLink {
  label: string;
  href: string;
  /** Marks the link of the current page (aria-current="page"). */
  current?: boolean;
}

export interface NavBarProps {
  /** Brand or name shown on the left. */
  brand: ReactNode;
  brandHref?: string;
  links: NavLink[];
  /** Extra elements on the right, for example a language selector. */
  actions?: ReactNode;
  /** Accessible name of the navigation. */
  ariaLabel?: string;
  /** Label of the button that opens the menu on small screens. */
  menuLabel?: string;
  /** Label of the button that closes the menu on small screens. */
  closeLabel?: string;
  /**
   * Maximum width of the header content. Default "lg", the same width the
   * page content usually has, so the header lines up with it. Use `false` to
   * let it span the whole width.
   */
  maxWidth?: Breakpoint | false;
  /**
   * Shows the links in the theme's primary color. The page you are on stays in
   * the text color and is underlined, so color is not the only clue. Use it when
   * the primary color reads as text on the page background (true in the
   * Streaming theme). Default false: muted links.
   */
  accentLinks?: boolean;
}

function MenuIcon() {
  return (
    <SvgIcon>
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </SvgIcon>
  );
}

function NavLinkItem({
  link,
  onClick,
  accent = false,
}: {
  link: NavLink;
  onClick?: () => void;
  accent?: boolean;
}) {
  const current = Boolean(link.current);
  return (
    <Link
      href={link.href}
      // With accent links, the current page is underlined and the others underline on hover.
      underline={accent ? (current ? "always" : "hover") : "none"}
      aria-current={current ? "page" : undefined}
      onClick={onClick}
      sx={(theme) => ({
        color: accent
          ? current
            ? theme.palette.text.primary
            : theme.palette.primary.main
          : current
            ? theme.palette.text.primary
            : theme.palette.text.secondary,
        fontWeight: current ? 600 : 500,
        ...(accent && current && {
          textDecorationColor: theme.palette.primary.main,
          textDecorationThickness: 2,
          textUnderlineOffset: 8,
        }),
        ...(!accent && { "&:hover": { color: theme.palette.text.primary } }),
      })}
    >
      {link.label}
    </Link>
  );
}

export function NavBar({
  brand,
  brandHref = "/",
  links,
  actions,
  ariaLabel = "Main",
  menuLabel = "Menu",
  closeLabel = "Close menu",
  maxWidth = "lg",
  accentLinks = false,
}: NavBarProps) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"), { noSsr: true });
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <AppBar
      component="header"
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Container maxWidth={maxWidth}>
        <Toolbar
          disableGutters
          sx={{
            justifyContent: "space-between",
            gap: 3,
            minHeight: { xs: 64, md: 72 },
          }}
        >
          <Link
            href={brandHref}
            underline="none"
            color="text.primary"
            sx={{ fontWeight: 600, letterSpacing: "-0.03em", fontSize: "1.125rem" }}
          >
            {brand}
          </Link>

          {isDesktop ? (
            <Stack direction="row" alignItems="center" spacing={4}>
              <Box component="nav" aria-label={ariaLabel}>
                <Stack
                  component="ul"
                  direction="row"
                  spacing={4}
                  sx={{ listStyle: "none", m: 0, p: 0 }}
                >
                  {links.map((link) => (
                    <li key={link.href}>
                      <NavLinkItem link={link} accent={accentLinks} />
                    </li>
                  ))}
                </Stack>
              </Box>
              {actions}
            </Stack>
          ) : (
            <Stack direction="row" alignItems="center" spacing={1}>
              {actions}
              <IconButton
                edge="end"
                color={accentLinks ? "primary" : "inherit"}
                aria-label={menuLabel}
                aria-expanded={open}
                onClick={() => setOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            </Stack>
          )}
        </Toolbar>
      </Container>

      {!isDesktop && (
        <Drawer anchor="right" open={open} onClose={close}>
          <Box sx={{ width: 280, p: 3 }}>
            <Stack alignItems="flex-end" sx={{ mb: 3 }}>
              <Button variant="text" color={accentLinks ? "primary" : "secondary"} onClick={close}>
                {closeLabel}
              </Button>
            </Stack>
            <Box component="nav" aria-label={ariaLabel}>
              <Stack
                component="ul"
                spacing={3}
                sx={{ listStyle: "none", m: 0, p: 0, fontSize: "1.25rem" }}
              >
                {links.map((link) => (
                  <li key={link.href}>
                    <NavLinkItem link={link} onClick={close} accent={accentLinks} />
                  </li>
                ))}
              </Stack>
            </Box>
          </Box>
        </Drawer>
      )}
    </AppBar>
  );
}
