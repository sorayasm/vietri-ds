import Box from "@mui/material/Box";
import MuiChip from "@mui/material/Chip";
import type { ChipProps } from "@mui/material/Chip";
import type { CategoryColor } from "../../theme/categorical";

export { MuiChip as Chip };
export type { ChipProps };

export interface CategoryChipProps
  extends Omit<ChipProps, "color" | "variant" | "icon" | "sx"> {
  /** Category color, from `createCategoryColors`. */
  color: CategoryColor;
  /** Shows a dot before the text. */
  dot?: boolean;
}

/**
 * Category chip (country, role, decade…). The palette colors meet AAA
 * contrast, and the category name is always shown as text.
 */
export function CategoryChip({ color, dot = false, ...rest }: CategoryChipProps) {
  return (
    <MuiChip
      size="small"
      {...rest}
      icon={
        dot ? (
          <Box
            component="span"
            aria-hidden="true"
            sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: color.fg }}
          />
        ) : undefined
      }
      sx={{
        bgcolor: color.bg,
        color: color.fg,
        "&.MuiChip-clickable:hover": { bgcolor: color.bg, filter: "brightness(0.95)" },
        "& .MuiChip-icon": { color: color.fg, ml: 1, mr: -0.25 },
      }}
    />
  );
}
