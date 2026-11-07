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
  /** Nombre accesible del grupo. */
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
  ariaLabel = "Idioma",
}: LanguageSwitchProps) {
  return (
    <ToggleButtonGroup
      exclusive
      size="small"
      value={value}
      aria-label={ariaLabel}
      onChange={(_event, next: string | null) => {
        // Con "exclusive", pulsar la opción activa devuelve null: lo ignoramos.
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
