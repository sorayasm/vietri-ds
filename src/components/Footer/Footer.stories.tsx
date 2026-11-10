import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button";
import { Footer } from "./Footer";

const meta = {
  title: "Components/Footer",
  component: Footer,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    title: "Observatorio MDB",
    description: "Platform created by Vox Mater in collaboration with Mujeres del Blues.",
    lines: ["Santiago, Chile", "info@mujeresdelblues.com"],
    links: [
      { label: "Vox Mater", href: "https://www.voxmater.com", external: true },
      { label: "Mujeres del Blues", href: "https://www.mujeresdelblues.com", external: true },
      { label: "About the project", href: "#about" },
    ],
    legal: `© ${new Date().getFullYear()}. All rights reserved.`,
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAction: Story = {
  args: {
    action: (
      <Button variant="outlined" color="secondary" href="https://www.voxmater.com">
        Discover more about Vox Mater
      </Button>
    ),
  },
};
