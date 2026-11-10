import type { Meta, StoryObj } from "@storybook/react-vite";
import { Typography } from "../Typography";
import { Timeline } from "./Timeline";

const meta = {
  title: "Components/Timeline",
  component: Timeline,
  tags: ["autodocs"],
  args: {
    ariaLabel: "Timeline by decade",
    level: 3,
    entries: [
      {
        id: "decade-1920s",
        label: "1920s",
        description: "The first blues recordings by Black women.",
        content: <Typography>Mamie Smith, Ma Rainey and Bessie Smith.</Typography>,
      },
      {
        id: "decade-1950s",
        label: "1950s",
        description: "Blues meets rhythm and blues.",
        content: <Typography>Big Mama Thornton.</Typography>,
      },
      {
        id: "decade-1960s",
        label: "1960s",
        content: <Typography>Etta James.</Typography>,
      },
    ],
  },
  argTypes: { level: { control: "inline-radio", options: [2, 3, 4, 5, 6] } },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 640 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LabelsOnly: Story = {
  args: {
    entries: [
      { id: "y-1920", label: "1920" },
      { id: "y-1938", label: "1938" },
      { id: "y-1953", label: "1953" },
    ],
  },
};
