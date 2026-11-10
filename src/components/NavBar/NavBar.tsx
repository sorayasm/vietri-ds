import { useState, type ReactNode } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import Toolbar from "@mui/material/Toolbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
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
}: {
  link: NavLink;
  onClick?: () => void;
}) {
  return (
    <Link
      href={link.href}
      underline="none"
      aria-current={link.current ? "page" : undefined}
      onClick={onClick}
      sx={{
        color: link.current ? "text.primary" : "text.secondary",
        fontWeight: link.current ? 600 : 500,
        "&:hover": { color: "text.primary" },
      }}
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
      <Toolbar
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
                    <NavLinkItem link={link} />
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
              color="inherit"
              aria-label={menuLabel}
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Stack>
        )}
      </Toolbar>

      {!isDesktop && (
        <Drawer anchor="right" open={open} onClose={close}>
          <Box sx={{ width: 280, p: 3 }}>
            <Stack alignItems="flex-end" sx={{ mb: 3 }}>
              <Button variant="text" color="secondary" onClick={close}>
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
                    <NavLinkItem link={link} onClick={close} />
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
