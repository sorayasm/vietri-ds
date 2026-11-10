import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Typography } from "../Typography";
import { Tabs, Tab, type TabsProps } from "./Tabs";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  args: { "aria-label": "Observatory sections" },
  argTypes: {
    variant: { control: "inline-radio", options: ["standard", "fullWidth", "scrollable"] },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

function Demo(args: TabsProps) {
  const [value, setValue] = useState("timeline");
  return (
    <>
      <Tabs {...args} value={value} onChange={(_event, next: string) => setValue(next)}>
        <Tab label="Timeline" value="timeline" />
        <Tab label="Map" value="map" />
        <Tab label="Relationships" value="graph" />
      </Tabs>
      <Typography sx={{ mt: 3 }} color="text.secondary">
        Vista activa: {value}
      </Typography>
    </>
  );
}

export const Default: Story = {
  render: (args) => <Demo {...args} />,
};

export const FullWidth: Story = {
  args: { variant: "fullWidth" },
  render: (args) => <Demo {...args} />,
};
