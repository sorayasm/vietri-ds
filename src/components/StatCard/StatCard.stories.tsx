import type { Meta, StoryObj } from "@storybook/react";
import { StatCard } from "./StatCard";

const meta = {
  title: "Data/StatCard",
  component: StatCard,
  tags: ["autodocs"],
  args: {
    value: "+200",
    label: "Biografías documentadas",
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
    value: "6 años",
    label: "De trayectoria editorial",
    description: "Investigación continua desde el primer volumen.",
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
        <StatCard value="+200" label="Biografías documentadas" />
        <StatCard value="179" label="Perfiles estructurados" />
        <StatCard value="211" label="Relaciones verificadas" />
        <StatCard value="6 años" label="De trayectoria editorial" />
      </div>
    ),
  ],
};
