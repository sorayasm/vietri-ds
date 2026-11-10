import type { Meta, StoryObj } from "@storybook/react-vite";
import { SkipLink } from "./SkipLink";

const meta = {
  title: "Components/SkipLink",
  component: SkipLink,
  tags: ["autodocs"],
  args: { href: "#content" },
} satisfies Meta<typeof SkipLink>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click the canvas and press Tab: the link appears at the top left. */
export const Default: Story = {
  render: (args) => (
    <div>
      <SkipLink {...args} />
      <p>Press Tab to reveal the link.</p>
      <main id="content" tabIndex={-1}>
        Main content
      </main>
    </div>
  ),
};
