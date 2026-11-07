import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    label: "Correo electrónico",
    placeholder: "nombre@ejemplo.com",
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
  args: { helperText: "Solo te escribiremos para responder tu mensaje." },
};

export const Error: Story = {
  args: {
    error: true,
    defaultValue: "correo-invalido",
    helperText: "Ingresa un correo válido.",
  },
};

export const Required: Story = {
  args: { required: true },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "No editable" },
};

export const Multiline: Story = {
  args: { label: "Mensaje", multiline: true, minRows: 4, placeholder: "Cuéntame sobre tu proyecto" },
};
