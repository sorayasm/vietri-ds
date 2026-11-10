import { useId, type ReactNode } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MuiDrawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Icon } from "../Icon";
import { X } from "../Icon/icons";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  /** Panel title. It is also its accessible name. */
  title: string;
  /** Small label above the title, for example "Archive profile". */
  eyebrow?: ReactNode;
  children: ReactNode;
  /** Fixed content at the bottom of the panel, for example a button. */
  footer?: ReactNode;
  anchor?: "left" | "right";
  width?: number;
  closeLabel?: string;
}

/**
 * Modal side panel. It traps focus, closes with Escape and is announced as a
 * dialog named by its title.
 */
export function Drawer({
  open,
  onClose,
  title,
  eyebrow,
  children,
  footer,
  anchor = "right",
  width = 420,
  closeLabel = "Close",
}: DrawerProps) {
  const titleId = useId();

  return (
    <MuiDrawer anchor={anchor} open={open} onClose={onClose}>
      <Box
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        sx={{
          width: { xs: "100vw", sm: width },
          maxWidth: "100vw",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ p: 3, pb: 1 }}
        >
          <Typography component="p" variant="overline" color="primary.main">
            {eyebrow}
          </Typography>
          <IconButton aria-label={closeLabel} onClick={onClose} edge="end">
            <Icon icon={X} />
          </IconButton>
        </Stack>
        <Box sx={{ px: 3, pb: 2, flex: 1, overflowY: "auto" }} tabIndex={0}>
          <Typography id={titleId} component="h2" variant="h4" sx={{ mb: 2 }}>
            {title}
          </Typography>
          {children}
        </Box>
        {footer && (
          <Box sx={{ p: 3, borderTop: 1, borderColor: "divider" }}>{footer}</Box>
        )}
      </Box>
    </MuiDrawer>
  );
}
