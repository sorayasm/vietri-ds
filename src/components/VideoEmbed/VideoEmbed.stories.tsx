import type { Meta, StoryObj } from "@storybook/react-vite";
import { VideoEmbed } from "./VideoEmbed";

const meta = {
  title: "Components/VideoEmbed",
  component: VideoEmbed,
  tags: ["autodocs"],
  args: {
    videoId: "jNQXAC9IVRw",
    title: "Sample video",
    lazy: true,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 720 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof VideoEmbed>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Nothing is loaded from YouTube until you press play. */
export const Default: Story = {};

/** Loads the player right away. */
export const LoadsImmediately: Story = {
  args: { lazy: false },
};

export const StartsAtASecond: Story = {
  args: { start: 5 },
};
