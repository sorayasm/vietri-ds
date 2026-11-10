import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button";
import { Typography } from "../Typography";
import { Drawer, type DrawerProps } from "./Drawer";

const meta = {
  title: "Components/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  args: {
    open: false,
    onClose: () => {},
    title: "Mamie Smith",
    eyebrow: "Archive profile",
    children: null,
  },
  argTypes: {
    anchor: { control: "inline-radio", options: ["left", "right"] },
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

function Demo(args: DrawerProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>View profile</Button>
      <Drawer
        {...args}
        open={open}
        onClose={() => setOpen(false)}
        footer={
          <Button fullWidth href="https://www.mujeresdelblues.com/mamie-smith-first-lady-of-the-blues/">
            View full biography
          </Button>
        }
      >
        <Typography variant="body2" color="text.secondary" gutterBottom>
          The first lady of the Blues
        </Typography>
        <Typography>
          Singer, dancer, actress and pianist. She was the first African American woman to make a record, in 1920.
        </Typography>
      </Drawer>
    </>
  );
}

export const Default: Story = {
  render: (args) => <Demo {...args} />,
};
