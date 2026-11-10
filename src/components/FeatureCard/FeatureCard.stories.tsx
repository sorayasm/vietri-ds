import type { Meta, StoryObj } from "@storybook/react-vite";
import { Database, ShieldCheck, Users } from "../Icon/icons";
import { FeatureCard } from "./FeatureCard";

const meta = {
  title: "Components/FeatureCard",
  component: FeatureCard,
  tags: ["autodocs"],
  args: {
    icon: ShieldCheck,
    title: "Verified sources",
    description: "Every profile cites its sources, and a person reviews each one before it is published.",
    level: 3,
  },
  argTypes: { level: { control: "inline-radio", options: [2, 3, 4, 5, 6] } },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 340 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FeatureCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithList: Story = {
  args: {
    icon: Database,
    title: "Open data",
    description: "Everything the observatory shows can be downloaded.",
    children: (
      <ul style={{ margin: 0, paddingLeft: 20 }}>
        <li>Profiles</li>
        <li>Relationships</li>
        <li>Timeline</li>
      </ul>
    ),
  },
};

export const Grid: Story = {
  decorators: [
    () => (
      <div
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          maxWidth: 900,
        }}
      >
        <FeatureCard icon={ShieldCheck} title="Verified sources" description="Each profile cites its sources." />
        <FeatureCard icon={Database} title="Structured data" description="Roles, territories and periods." />
        <FeatureCard icon={Users} title="Connected people" description="Relationships between artists." />
      </div>
    ),
  ],
};
