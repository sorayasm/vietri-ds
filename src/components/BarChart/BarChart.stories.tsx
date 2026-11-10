import type { Meta, StoryObj } from "@storybook/react-vite";
import { BarChart } from "./BarChart";

const meta = {
  title: "Data/BarChart",
  component: BarChart,
  tags: ["autodocs"],
  args: {
    title: "Profiles by country (sample data)",
    data: [
      { label: "Chile", value: 42 },
      { label: "Argentina", value: 31 },
      { label: "United States", value: 58 },
      { label: "Spain", value: 17 },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 520 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithFixedMax: Story = {
  args: { max: 100 },
};

export const WithFormattedValues: Story = {
  args: { formatValue: (value) => `${value} profiles` },
};
