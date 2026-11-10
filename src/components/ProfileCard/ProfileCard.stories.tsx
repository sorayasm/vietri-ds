import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { createCategoryColors, observatoryCategoryPalette } from "../../theme/categorical";
import { ProfileCard } from "./ProfileCard";

const colors = createCategoryColors(["USA", "Singer", "1920s"], observatoryCategoryPalette);

const meta = {
  title: "Components/ProfileCard",
  component: ProfileCard,
  tags: ["autodocs"],
  args: {
    name: "Mamie Smith",
    subtitle: "The first lady of the Blues",
    bio: "Singer, dancer, actress and pianist. She recorded the first blues vocal record by an African American artist, in 1920.",
    tags: [
      { label: "USA", color: colors.USA },
      { label: "Singer", color: colors.Singer },
      { label: "1920s", color: colors["1920s"] },
    ],
    level: 3,
    bioLines: 3,
  },
  argTypes: {
    level: { control: "inline-radio", options: [2, 3, 4, 5, 6] },
    bioLines: { control: { type: "number", min: 1, max: 6 } },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 340 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Not interactive: just information. */
export const Default: Story = {};

/** The whole card is a button, for example to open a side panel. */
export const Clickable: Story = {
  args: { onClick: fn() },
};

/** The whole card is a link. */
export const AsLink: Story = {
  args: { href: "https://www.mujeresdelblues.com/mamie-smith-first-lady-of-the-blues/" },
};

export const Grid: Story = {
  decorators: [
    () => (
      <div
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          maxWidth: 960,
        }}
      >
        <ProfileCard
          name="Ma Rainey"
          subtitle="Mother of the Blues"
          tags={[{ label: "USA", color: colors.USA }, { label: "Singer", color: colors.Singer }]}
          onClick={() => {}}
        />
        <ProfileCard
          name="Bessie Smith"
          subtitle="Empress of the Blues"
          tags={[{ label: "USA", color: colors.USA }, { label: "Singer", color: colors.Singer }]}
          onClick={() => {}}
        />
        <ProfileCard
          name="Big Mama Thornton"
          subtitle="Singer and songwriter"
          tags={[{ label: "USA", color: colors.USA }]}
          onClick={() => {}}
        />
      </div>
    ),
  ],
};
