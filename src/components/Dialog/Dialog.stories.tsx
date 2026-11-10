import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button";
import { Dialog, type DialogProps } from "./Dialog";

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  args: {
    open: false,
    onClose: () => {},
    title: "Embed the Observatory",
    description: "Copy the code to cite or embed the observatory on your website.",
  },
  argTypes: {
    maxWidth: { control: "inline-radio", options: ["xs", "sm", "md", "lg"] },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

function Demo(args: DialogProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog
        {...args}
        open={open}
        onClose={() => setOpen(false)}
        actions={<Button onClick={() => setOpen(false)}>Done</Button>}
      >
        Dialog content.
      </Dialog>
    </>
  );
}

/** Try it: open it with the keyboard, press Tab (focus stays trapped) and close it with Escape. */
export const Default: Story = {
  render: (args) => <Demo {...args} />,
};
