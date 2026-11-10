import type { Meta, StoryObj } from "@storybook/react-vite";
import { CopyField } from "./CopyField";

const meta = {
  title: "Components/CopyField",
  component: CopyField,
  tags: ["autodocs"],
  args: {
    label: "HTML code to embed",
    value:
      '<iframe src="https://observatorio.mujeresdelblues.com" width="100%" height="700" title="Mujeres del Blues Digital Observatory"></iframe>',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 520 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CopyField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomLabels: Story = {
  args: {
    copyLabel: "Copy code",
    copiedLabel: "Code copied!",
    errorLabel: "Copy failed",
  },
};
