import type { Meta, StoryObj } from "@storybook/react-vite";
import { Steps } from "./Steps";

const meta = {
  title: "Components/Steps",
  component: Steps,
  tags: ["autodocs"],
  args: {
    ariaLabel: "Methodology",
    level: 3,
    steps: [
      { title: "Collect sources", description: "Books, interviews, archives and recordings." },
      { title: "Assisted extraction", description: "Software proposes names, dates and relationships." },
      { title: "Human review", description: "A researcher checks every data point." },
      { title: "Structured profile", description: "Roles, territories and periods." },
      { title: "Publication", description: "Open, citable and downloadable." },
    ],
  },
  argTypes: { level: { control: "inline-radio", options: [2, 3, 4, 5, 6] } },
} satisfies Meta<typeof Steps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ThreeSteps: Story = {
  args: {
    steps: [
      { title: "Search", description: "Find an artist by name, country or role." },
      { title: "Explore", description: "Open her profile and follow her connections." },
      { title: "Share", description: "Cite or embed what you found." },
    ],
  },
};
