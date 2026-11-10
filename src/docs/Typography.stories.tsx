import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stack, Typography } from "@mui/material";
import { tokens } from "../theme/tokens";
import { ThemedPage } from "./ThemedPage";
const meta = {
  title: "Foundations/Typography",
  parameters: {
    docs: {
      description: {
        component:
          "Type scale based on Inter. Heading sizes are fluid and adapt to the viewport.",
      },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const TypeScale: Story = {
  render: () => (
    <ThemedPage>
    <Stack spacing={3}>
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="h5">Heading 5</Typography>
      <Typography variant="h6">Heading 6</Typography>
      <Typography variant="body1">
        Body 1 — Main text for reading and content.
      </Typography>
      <Typography variant="body2">
        Body 2 — Secondary text, descriptions and metadata.
      </Typography>
      <Typography variant="button">Button label</Typography>
      <Typography variant="caption">Caption — roughly 12px</Typography>
      <Typography variant="overline">OVERLINE / LABEL</Typography>
      <Typography variant="caption" color="text.secondary">
        Font family: {tokens.typography.fontFamily}
      </Typography>
    </Stack>
    </ThemedPage>
  ),
};
