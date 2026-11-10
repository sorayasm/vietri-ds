import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { MediaCard } from "../MediaCard";
import { ContentRail } from "./ContentRail";

const cards = Array.from({ length: 8 }, (_value, index) => (
  <MediaCard
    key={index}
    title={`Episode ${index + 1}: sample title`}
    meta={`Season 1 · Episode ${index + 1}`}
    subtitle="Sample data"
    duration="42:10"
    onClick={fn()}
  />
));

const meta = {
  title: "Components/ContentRail",
  component: ContentRail,
  tags: ["autodocs"],
  args: { title: "Season 1", level: 2, itemWidth: 280, children: cards },
  argTypes: {
    level: { control: "inline-radio", options: [2, 3, 4, 5, 6] },
    itemWidth: { control: { type: "number", min: 160, max: 480 } },
  },
} satisfies Meta<typeof ContentRail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NarrowItems: Story = {
  args: { title: "Playlists and extras", itemWidth: 200 },
};
