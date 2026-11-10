import type { Meta, StoryObj } from "@storybook/react-vite";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import {
  editorialColors,
  observatoryColors,
  streamingColors,
  type ThemeColors,
} from "../theme/palettes";
import { ThemedPage } from "./ThemedPage";

const meta = {
  title: "Foundations/Colors",
  parameters: {
    docs: {
      description: {
        component:
          "Each theme has its own flat palette: editorial (the portfolio), streaming (El Blues es Femenino) and observatory (the Mujeres del Blues Observatory).",
      },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const swatch = (name: string, value: string) => (
  <Box
    key={name}
    sx={{ border: 1, borderColor: "divider", borderRadius: 1, overflow: "hidden" }}
  >
    <div style={{ height: 72, background: value }} />
    <Box sx={{ p: 1.5 }}>
      <strong>{name}</strong>
      <Box sx={{ color: "text.secondary", fontSize: 13 }}>{value}</Box>
    </Box>
  </Box>
);

const grid = (entries: [string, string][]) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
      gap: 16,
      marginBottom: 24,
    }}
  >
    {entries.map(([name, value]) => swatch(name, value))}
  </div>
);

const section = (title: string, note: string, colors: ThemeColors) => (
  <section key={title} style={{ marginBottom: 48 }}>
    <Typography variant="h4" component="h2">
      {title}
    </Typography>
    <Typography color="text.secondary" sx={{ mb: 2 }}>
      {note}
    </Typography>
    <Typography variant="overline" component="h3">
      Brand colors
    </Typography>
    {grid(Object.entries(colors.brand))}
    <Typography variant="overline" component="h3">
      Derived colors (to meet contrast)
    </Typography>
    {grid(Object.entries(colors.derived))}
  </section>
);

export const Palettes: Story = {
  render: () => (
    <ThemedPage>
      {section(
        "Editorial — portfolio",
        "Black, white and gold. Gold is used as a fill; bronze carries gold-colored text. Flat colors.",
        editorialColors
      )}
      {section(
        "Streaming — El Blues es Femenino",
        "Deep purple with violet, magenta and orange. Flat colors.",
        streamingColors
      )}
      {section(
        "Observatory — Mujeres del Blues",
        "Teal, cyan, amber, coral, red and deep purple. Teal carries actions, deep purple the footer. Light colors (cyan, amber, coral, vermilion) are fills for charts and highlights. Flat colors.",
        observatoryColors
      )}
    </ThemedPage>
  ),
};
