import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export interface SelectOption {
  value: string;
  label: string;
  /** Number shown on the right, for example artists per country. */
  count?: number;
  /** Element before the text, for example a color dot. It must be decorative. */
  adornment?: ReactNode;
}

export interface SelectProps {
  /** Visible label and accessible name of the field. */
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  helperText?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: "small" | "medium";
  id?: string;
}

export function Select({
  label,
  value,
  onChange,
  options,
  helperText,
  disabled,
  fullWidth,
  size,
  id,
}: SelectProps) {
  const byValue = new Map(options.map((option) => [option.value, option]));

  return (
    <TextField
      select
      id={id}
      label={label}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      helperText={helperText}
      disabled={disabled}
      fullWidth={fullWidth}
      size={size}
      slotProps={{
        select: {
          renderValue: (selected) => {
            const option = byValue.get(String(selected));
            if (!option) return "";
            return (
              <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
                {option.adornment}
                {option.label}
              </Box>
            );
          },
        },
      }}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value} sx={{ gap: 1 }}>
          {option.adornment}
          {option.label}
          {option.count !== undefined && (
            <Typography component="span" variant="caption" color="text.secondary" sx={{ ml: "auto", pl: 2 }}>
              {option.count}
            </Typography>
          )}
        </MenuItem>
      ))}
    </TextField>
  );
}
