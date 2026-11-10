import type { ReactNode } from "react";
import Link from "@mui/material/Link";

export interface SkipLinkProps {
  /** Id of the main content, for example "#content". */
  href: string;
  children?: ReactNode;
}

/**
 * "Skip to content" link (WCAG 2.4.1). It is the first element to receive
 * focus with Tab and it is only visible while it has focus.
 */
export function SkipLink({ href, children = "Skip to content" }: SkipLinkProps) {
  return (
    <Link
      href={href}
      sx={(theme) => ({
        position: "fixed",
        top: theme.spacing(1),
        left: theme.spacing(1),
        zIndex: theme.zIndex.tooltip + 1,
        px: 2,
        py: 1,
        borderRadius: 1,
        bgcolor: "background.paper",
        color: "text.primary",
        fontWeight: 600,
        textDecoration: "none",
        border: `2px solid ${theme.palette.primary.main}`,
        transform: "translateY(-300%)",
        "&:focus": { transform: "translateY(0)" },
      })}
    >
      {children}
    </Link>
  );
}
