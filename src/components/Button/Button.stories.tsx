import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Stack from "@mui/material/Stack";
import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Explorar",
    variant: "contained",
    color: "primary",
    size: "medium",
    disabled: false,
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["contained", "outlined", "text"],
    },
    color: {
      control: "inline-radio",
      options: ["primary", "secondary"],
    },
    size: {
      control: "inline-radio",
      options: ["small", "medium", "large"],
    },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
      <Button {...args} variant="contained">Contained</Button>
      <Button {...args} variant="outlined">Outlined</Button>
      <Button {...args} variant="text">Text</Button>
    </Stack>
  ),
};

export const Colors: Story = {
  render: (args) => (
    <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
      <Button {...args} color="primary">Primary</Button>
      <Button {...args} color="secondary">Secondary</Button>
    </Stack>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <Stack direction="row" spacing={2} alignItems="center" useFlexGap flexWrap="wrap">
      <Button {...args} size="small">Small</Button>
      <Button {...args} size="medium">Medium</Button>
      <Button {...args} size="large">Large</Button>
    </Stack>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
      <Button {...args} variant="contained">Contained</Button>
      <Button {...args} variant="outlined">Outlined</Button>
      <Button {...args} variant="text">Text</Button>
    </Stack>
  ),
};
