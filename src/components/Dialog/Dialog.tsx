import { useId, type ReactNode } from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import MuiDialog from "@mui/material/Dialog";
import { Icon } from "../Icon";
import { X } from "../Icon/icons";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  /** Dialog title. It is also its accessible name. */
  title: string;
  /** Short text that explains the dialog. Screen readers read it when it opens. */
  description?: ReactNode;
  children?: ReactNode;
  /** Buttons at the bottom of the dialog. */
  actions?: ReactNode;
  closeLabel?: string;
  maxWidth?: "xs" | "sm" | "md" | "lg";
}

/**
 * Modal dialog. It traps focus, closes with Escape and returns focus to the
 * element that opened it.
 */
export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  actions,
  closeLabel = "Close",
  maxWidth = "sm",
}: DialogProps) {
  const titleId = useId();
  const descriptionId = useId();

  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={maxWidth}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
    >
      <DialogTitle id={titleId} sx={{ pr: 7 }}>
        {title}
      </DialogTitle>
      <IconButton
        aria-label={closeLabel}
        onClick={onClose}
        sx={{ position: "absolute", top: 8, right: 8 }}
      >
        <Icon icon={X} />
      </IconButton>
      <DialogContent>
        {description && (
          <DialogContentText id={descriptionId} sx={{ mb: children ? 2 : 0 }}>
            {description}
          </DialogContentText>
        )}
        {children}
      </DialogContent>
      {actions && <DialogActions sx={{ px: 3, pb: 2 }}>{actions}</DialogActions>}
    </MuiDialog>
  );
}
