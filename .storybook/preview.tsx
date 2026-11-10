import type { Preview } from "@storybook/react-vite";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { editorialTheme, streamingTheme, observatoryTheme } from "../src/theme";

const themes = {
  editorial: editorialTheme,
  streaming: streamingTheme,
  observatory: observatoryTheme,
} as const;

type ThemeName = keyof typeof themes;

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Vietri DS theme",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        dynamicTitle: true,
        items: [
          { value: "editorial", title: "Editorial" },
          { value: "streaming", title: "Streaming" },
          { value: "observatory", title: "Observatory" },
        ],
      },
    },
  },
  initialGlobals: { theme: "editorial" },
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story, context) => {
      const theme = themes[context.globals.theme as ThemeName] ?? editorialTheme;
      return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Story />
        </ThemeProvider>
      );
    },
  ],
};
export default preview;
