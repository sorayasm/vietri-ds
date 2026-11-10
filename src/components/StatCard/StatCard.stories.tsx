import type { Meta, StoryObj } from "@storybook/react-vite";
import { StatCard } from "./StatCard";

const meta = {
  title: "Data/StatCard",
  component: StatCard,
  tags: ["autodocs"],
  args: {
    value: "+200",
    label: "Documented biographies",
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 280 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: {
    value: "6 years",
    label: "Of editorial work",
    description: "Ongoing research since the first volume.",
  },
};

export const Grid: Story = {
  decorators: [
    () => (
      <div
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        }}
      >
        <StatCard value="+200" label="Documented biographies" />
        <StatCard value="179" label="Structured profiles" />
        <StatCard value="211" label="Verified relationships" />
        <StatCard value="6 years" label="Of editorial work" />
      </div>
    ),
  ],
};
