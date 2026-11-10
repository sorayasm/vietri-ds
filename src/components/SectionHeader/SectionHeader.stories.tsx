import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "../Icon";
import { Database } from "../Icon/icons";
import { SectionHeader } from "./SectionHeader";

const meta = {
  title: "Components/SectionHeader",
  component: SectionHeader,
  tags: ["autodocs"],
  args: {
    title: "How we build the observatory",
    description: "A process with cited sources, assisted extraction and human review.",
    level: 2,
    align: "left",
  },
  argTypes: {
    level: { control: "inline-radio", options: [1, 2, 3, 4, 5, 6] },
    align: { control: "inline-radio", options: ["left", "center"] },
  },
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithEyebrow: Story = {
  args: {
    eyebrow: (
      <>
        <Icon icon={Database} size={14} /> Methodology
      </>
    ),
  },
};

export const Centered: Story = {
  args: { align: "center", eyebrow: "Impact" },
};
