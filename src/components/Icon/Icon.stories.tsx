import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "./Icon";
import * as icons from "./icons";

const meta = {
  title: "Foundations/Icon",
  component: Icon,
  tags: ["autodocs"],
  args: { icon: icons.Search, size: 24 },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Decorative: hidden from screen readers. */
export const Decorative: Story = {};

/** With `label` the icon is announced with that name. */
export const Meaningful: Story = {
  args: { icon: icons.Info, label: "Information" },
};

export const Catalog: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))" }}>
      {Object.entries(icons).map(([name, glyph]) => (
        <div key={name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Icon icon={glyph} size={20} />
          <span style={{ fontSize: 12 }}>{name}</span>
        </div>
      ))}
    </div>
  ),
};
