import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export interface LanguageOption {
  value: string;
  label: string;
}

export interface LanguageSwitchProps {
  value: string;
  onChange: (value: string) => void;
  options?: LanguageOption[];
  /** Accessible name of the group. */
  ariaLabel?: string;
}

const defaultOptions: LanguageOption[] = [
  { value: "en", label: "EN" },
  { value: "es", label: "ES" },
];

export function LanguageSwitch({
  value,
  onChange,
  options = defaultOptions,
  ariaLabel = "Language",
}: LanguageSwitchProps) {
  return (
    <ToggleButtonGroup
      exclusive
      size="small"
      value={value}
      aria-label={ariaLabel}
      onChange={(_event, next: string | null) => {
        // With "exclusive", clicking the active option returns null: we ignore it.
        if (next !== null) onChange(next);
      }}
    >
      {options.map((option) => (
        <ToggleButton key={option.value} value={option.value}>
          {option.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
