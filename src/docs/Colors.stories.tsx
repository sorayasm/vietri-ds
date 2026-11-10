import type { Meta, StoryObj } from "@storybook/react-vite";
import { brand, derived } from "../theme/tokens";
const meta = {
  title: "Foundations/Colors",
  parameters: {
    docs: {
      description: {
        component:
          "Voxmater brand palette and the derived colors used by Vietri themes.",
      },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
const swatch = (name: string, value: string) => (
  <div
    key={name}
    style={{ border: "1px solid #E2E8F0", borderRadius: 8, overflow: "hidden" }}
  >
    <div style={{ height: 92, background: value }} />
    <div style={{ padding: 12, fontFamily: "Inter, sans-serif" }}>
      <strong>{name}</strong>
      <div style={{ color: "#475569", fontSize: 13 }}>{value}</div>
    </div>
  </div>
);
export const Palette: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
        gap: 16,
      }}
    >
      {Object.entries(brand).map(([n, v]) => swatch(n, v))}
      {Object.entries(derived).map(([n, v]) => swatch(n, v))}
    </div>
  ),
};
