import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button";
import { Hero } from "./Hero";

const meta = {
  title: "Components/Hero",
  component: Hero,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    eyebrow: "Digital observatory",
    title: "Women in the blues, mapped and documented",
    description:
      "176 profiles, their relationships and their stories, built from cited sources and reviewed by people.",
    level: 1,
    align: "left",
  },
  argTypes: {
    level: { control: "inline-radio", options: [1, 2, 3, 4, 5, 6] },
    align: { control: "inline-radio", options: ["left", "center"] },
  },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithActions: Story = {
  args: {
    actions: (
      <>
        <Button size="large">Explore the observatory</Button>
        <Button size="large" variant="outlined">
          About the project
        </Button>
      </>
    ),
  },
};

export const Centered: Story = {
  args: {
    align: "center",
    actions: <Button size="large">Get started</Button>,
  },
};
