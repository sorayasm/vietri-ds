import type { Meta, StoryObj } from "@storybook/react-vite";
import { PlaylistCard } from "./PlaylistCard";

const meta = {
  title: "Components/PlaylistCard",
  component: PlaylistCard,
  tags: ["autodocs"],
  args: {
    title: "Mujeres del Blues: essentials",
    description: "A playlist of women in the blues, on every service you use. Sample data.",
    level: 3,
    platforms: [
      { name: "Spotify", href: "https://open.spotify.com" },
      { name: "YouTube Music", href: "https://music.youtube.com" },
      { name: "Amazon Music", href: "https://music.amazon.com" },
      { name: "YouTube", href: "https://www.youtube.com" },
    ],
  },
  argTypes: { level: { control: "inline-radio", options: [2, 3, 4, 5, 6] } },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PlaylistCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TwoPlatforms: Story = {
  args: {
    platforms: [
      { name: "Spotify", href: "https://open.spotify.com" },
      { name: "YouTube Music", href: "https://music.youtube.com" },
    ],
  },
};
