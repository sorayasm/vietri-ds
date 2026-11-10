import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { createCategoryColors } from "../../theme/categorical";
import { CategoryChip, Chip } from "./Chip";

const meta = {
  title: "Components/Chip",
  component: Chip,
  tags: ["autodocs"],
  args: { label: "Singer", size: "small" },
  argTypes: {
    variant: { control: "inline-radio", options: ["filled", "outlined"] },
    size: { control: "inline-radio", options: ["small", "medium"] },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Outlined: Story = { args: { variant: "outlined" } };

export const Clickable: Story = {
  args: { label: "1920s", onClick: fn() },
};

export const Deletable: Story = {
  args: { label: "Chile", onDelete: fn() },
};

const countries = ["USA", "Chile", "England", "Argentina", "Mexico", "Spain"];
const colors = createCategoryColors(countries);

export const Categories: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {countries.map((country) => (
        <CategoryChip key={country} label={country} color={colors[country]} dot />
      ))}
    </div>
  ),
};
