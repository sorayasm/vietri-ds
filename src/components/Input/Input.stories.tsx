import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input";

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    label: "Email address",
    placeholder: "name@example.com",
    variant: "outlined",
    size: "medium",
    disabled: false,
    error: false,
    required: false,
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["outlined", "filled", "standard"] },
    size: { control: "inline-radio", options: ["small", "medium"] },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    required: { control: "boolean" },
    label: { control: "text" },
    helperText: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHelperText: Story = {
  args: { helperText: "We will only write to reply to your message." },
};

export const Error: Story = {
  args: {
    error: true,
    defaultValue: "invalid-email",
    helperText: "Enter a valid email address.",
  },
};

export const Required: Story = {
  args: { required: true },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "Not editable" },
};

export const Multiline: Story = {
  args: { label: "Message", multiline: true, minRows: 4, placeholder: "Tell me about your project" },
};
