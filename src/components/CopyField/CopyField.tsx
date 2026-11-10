import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { Check, Copy } from "../Icon/icons";
import { VisuallyHidden } from "../VisuallyHidden";

export interface CopyFieldProps {
  /** What is being copied, for example "HTML code to embed". */
  label: string;
  value: string;
  copyLabel?: string;
  copiedLabel?: string;
  errorLabel?: string;
  /** Milliseconds the "copied" notice stays visible. */
  copiedDuration?: number;
}

type Status = "idle" | "copied" | "error";

/**
 * Code block with a copy button. The result is announced to screen readers
 * through an aria-live region.
 */
export function CopyField({
  label,
  value,
  copyLabel = "Copy",
  copiedLabel = "Copied!",
  errorLabel = "Could not copy",
  copiedDuration = 2000,
}: CopyFieldProps) {
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), copiedDuration);
  }

  const message =
    status === "copied" ? copiedLabel : status === "error" ? errorLabel : "";

  return (
    <Stack spacing={1.5}>
      <Typography component="p" variant="overline" color="text.secondary">
        {label}
      </Typography>
      <Box
        role="region"
        aria-label={label}
        tabIndex={0}
        sx={{
          overflowX: "auto",
          p: 1.5,
          borderRadius: 1,
          border: 1,
          borderColor: "divider",
          bgcolor: "background.default",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
          fontSize: "0.8125rem",
          whiteSpace: "pre",
        }}
      >
        <code>{value}</code>
      </Box>
      <Button
        onClick={handleCopy}
        startIcon={<Icon icon={status === "copied" ? Check : Copy} />}
        fullWidth
      >
        {status === "copied" ? copiedLabel : copyLabel}
      </Button>
      <VisuallyHidden role="status" aria-live="polite">
        {message}
      </VisuallyHidden>
    </Stack>
  );
}
