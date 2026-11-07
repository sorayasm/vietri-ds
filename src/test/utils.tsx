import type { ReactElement } from "react";
import { render } from "@testing-library/react";
import { ThemeProvider, type Theme } from "@mui/material/styles";
import { editorialTheme } from "../theme";

export function renderWithTheme(ui: ReactElement, theme: Theme = editorialTheme) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}
