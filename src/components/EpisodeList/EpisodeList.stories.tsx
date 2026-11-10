import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { EpisodeList, type EpisodeListProps } from "./EpisodeList";

const episodes = [
  { id: "s1e1", number: 1, title: "Premiere", meta: "Sample data · 38:20", description: "The season opens with an interview and a first live session." },
  { id: "s1e2", number: 2, title: "Interview with a singer", meta: "Sample data · 41:05", description: "Her first band, her influences and the stage." },
  { id: "s1e3", number: 3, title: "Interview with a guitarist", meta: "Sample data · 42:10" },
  { id: "s1e4", number: 4, title: "Season finale", meta: "Sample data · 55:00", description: "A look back at the season." },
];

const meta = {
  title: "Components/EpisodeList",
  component: EpisodeList,
  tags: ["autodocs"],
  args: { episodes, ariaLabel: "Season 1", level: 3 },
  argTypes: { level: { control: "inline-radio", options: [2, 3, 4, 5, 6] } },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 720 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EpisodeList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

function Interactive(args: EpisodeListProps) {
  const [current, setCurrent] = useState("s1e2");
  return <EpisodeList {...args} currentId={current} onSelect={setCurrent} />;
}

/** Each row is a button; the chosen one is marked as the current episode. */
export const Selectable: Story = {
  render: (args) => <Interactive {...args} />,
};

export const AsLinks: Story = {
  args: {
    episodes: episodes.map((episode) => ({
      ...episode,
      href: `https://www.elbluesesfemenino.cl#${episode.id}`,
    })),
  },
};
