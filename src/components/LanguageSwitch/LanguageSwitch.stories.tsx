import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { LanguageSwitch, type LanguageSwitchProps } from "./LanguageSwitch";

const meta = {
  title: "Components/LanguageSwitch",
  component: LanguageSwitch,
  tags: ["autodocs"],
  args: { value: "en", onChange: () => {} },
} satisfies Meta<typeof LanguageSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

function Interactive(args: LanguageSwitchProps) {
  const [value, setValue] = useState(args.value);
  return <LanguageSwitch {...args} value={value} onChange={setValue} />;
}

export const Default: Story = {
  render: (args) => <Interactive {...args} />,
};

export const ThreeLanguages: Story = {
  args: {
    options: [
      { value: "es", label: "ES" },
      { value: "en", label: "EN" },
      { value: "pt", label: "PT" },
    ],
  },
  render: (args) => <Interactive {...args} />,
};
