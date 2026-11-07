import type { Preview } from "@storybook/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { editorialTheme } from "../src/theme";

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider theme={editorialTheme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
};
export default preview;
