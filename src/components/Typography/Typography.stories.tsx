import type { Meta, StoryObj } from "@storybook/react-vite";
import Stack from "@mui/material/Stack";
import { Typography } from "./Typography";

const variants = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "subtitle1",
  "subtitle2",
  "body1",
  "body2",
  "button",
  "caption",
  "overline",
] as const;

const meta = {
  title: "Components/Typography",
  component: Typography,
  tags: ["autodocs"],
  args: {
    children: "Building digital experiences through code, design and data.",
    variant: "body1",
  },
  argTypes: {
    variant: { control: "select", options: variants },
    color: {
      control: "select",
      options: ["text.primary", "text.secondary", "primary.main", "secondary.main"],
    },
    children: { control: "text" },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Scale: Story = {
  render: () => (
    <Stack spacing={3}>
      {variants.map((variant) => (
        <div key={variant}>
          <Typography variant="overline" color="text.secondary">
            {variant}
          </Typography>
          <Typography variant={variant}>Culture, data and code</Typography>
        </div>
      ))}
    </Stack>
  ),
};
