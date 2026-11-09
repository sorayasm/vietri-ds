import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { LanguageSwitch } from "../LanguageSwitch";
import { NavBar, type NavBarProps } from "./NavBar";

const links = [
  { label: "Selected work", href: "#work", current: true },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const meta = {
  title: "Components/NavBar",
  component: NavBar,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    brand: "Soraya Sacaan",
    brandHref: "#top",
    links,
  },
} satisfies Meta<typeof NavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

function WithLanguageSwitch(args: NavBarProps) {
  const [language, setLanguage] = useState("en");
  return (
    <NavBar
      {...args}
      actions={<LanguageSwitch value={language} onChange={setLanguage} />}
    />
  );
}

export const WithLanguageSelector: Story = {
  render: (args) => <WithLanguageSwitch {...args} />,
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: (args) => <WithLanguageSwitch {...args} />,
};
