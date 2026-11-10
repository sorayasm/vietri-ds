import type { LucideIcon, LucideProps } from "lucide-react";

export interface IconProps extends Omit<LucideProps, "ref"> {
  icon: LucideIcon;
  /**
   * If the icon conveys something on its own, describe it here. Without
   * `label` the icon is decorative and hidden from screen readers.
   */
  label?: string;
}

export function Icon({ icon: Glyph, label, size = 18, ...rest }: IconProps) {
  if (label) {
    return <Glyph size={size} role="img" aria-label={label} {...rest} />;
  }
  return <Glyph size={size} aria-hidden="true" focusable="false" {...rest} />;
}
