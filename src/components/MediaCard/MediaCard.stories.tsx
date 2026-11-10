import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { MediaCard } from "./MediaCard";

// A flat color image, so the stories do not depend on the network.
const sampleImage =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"><rect width="640" height="360" fill="#693BCC"/></svg>'
  );

const meta = {
  title: "Components/MediaCard",
  component: MediaCard,
  tags: ["autodocs"],
  args: {
    title: "Episode 3: Interview with a guitarist",
    subtitle: "Sample data",
    meta: "Season 1 · Episode 3",
    duration: "42:10",
    level: 3,
    playIcon: true,
  },
  argTypes: { level: { control: "inline-radio", options: [2, 3, 4, 5, 6] } },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MediaCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Not interactive: just information. */
export const Default: Story = {};

/** The whole card is a button, for example to open a player. */
export const Clickable: Story = {
  args: { onClick: fn() },
};

/** The whole card is a link. */
export const AsLink: Story = {
  args: { href: "https://www.elbluesesfemenino.cl" },
};

export const WithImageAndBadge: Story = {
  args: { imageUrl: sampleImage, badge: "New", onClick: fn() },
};
