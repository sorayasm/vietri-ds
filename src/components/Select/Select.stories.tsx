import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Box from "@mui/material/Box";
import { createCategoryColors } from "../../theme/categorical";
import { Select, type SelectOption, type SelectProps } from "./Select";

const roles: SelectOption[] = [
  { value: "ALL", label: "All roles" },
  { value: "singer", label: "Singer" },
  { value: "composer", label: "Composer" },
  { value: "guitarist", label: "Guitarist" },
  { value: "pianist", label: "Pianist" },
];

const meta = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  args: { label: "Role", value: "ALL", options: roles, onChange: () => {} },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 280 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

function Interactive(args: SelectProps) {
  const [value, setValue] = useState(args.value);
  return <Select {...args} value={value} onChange={setValue} fullWidth />;
}

export const Default: Story = {
  render: (args) => <Interactive {...args} />,
};

export const WithHelperText: Story = {
  args: { helperText: "Filter profiles by their main role." },
  render: (args) => <Interactive {...args} />,
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => <Interactive {...args} />,
};

const countryCounts = [
  ["USA", 138],
  ["Chile", 22],
  ["England", 4],
  ["Argentina", 4],
] as const;
const countryColors = createCategoryColors(countryCounts.map(([name]) => name));

/** Options with a color dot and a count, like the country filter of the Observatory. */
export const WithCountsAndColors: Story = {
  args: {
    label: "Country",
    value: "ALL",
    options: [
      { value: "ALL", label: "All countries", count: 176 },
      ...countryCounts.map(([name, count]) => ({
        value: name,
        label: name,
        count,
        adornment: (
          <Box
            component="span"
            aria-hidden="true"
            sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: countryColors[name].dot }}
          />
        ),
      })),
    ],
  },
  render: (args) => <Interactive {...args} />,
};
