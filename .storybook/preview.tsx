import type { Preview } from "@storybook/react-vite";
import { Box, ThemeProvider, CssBaseline } from "@mui/material";
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
    backgrounds: { disable: true, disabled: true },
    options: {
    storySort: {
      order: ["Vietri", "Guides", "Foundations", "Components", "Data"],
    },
  },
  },
  decorators: [
    (Story, context) => {
      const theme = themes[context.globals.theme as ThemeName] ?? editorialTheme;
      return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* The story gets its own themed background and text color. Without it,
              the dark theme renders light text on the white Docs canvas. */}
          <Box sx={{ bgcolor: "background.default", color: "text.primary" }}>
            <Story />
          </Box>
        </ThemeProvider>
      );
    },
  ],
};
export default preview;
