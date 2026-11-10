import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../test/utils";
import { createCategoryColors, observatoryCategoryPalette } from "../../theme/categorical";
import { ProfileCard } from "./ProfileCard";

const colors = createCategoryColors(["USA", "Singer"], observatoryCategoryPalette);

describe("ProfileCard", () => {
  it("the name is a level 3 heading by default", () => {
    renderWithTheme(<ProfileCard name="Mamie Smith" />);
    expect(screen.getByRole("heading", { level: 3, name: "Mamie Smith" })).toBeInTheDocument();
  });

  it("allows choosing the heading level", () => {
    renderWithTheme(<ProfileCard name="Mamie Smith" level={2} />);
    expect(screen.getByRole("heading", { level: 2, name: "Mamie Smith" })).toBeInTheDocument();
  });

  it("shows the subtitle, the bio and the tags", () => {
    renderWithTheme(
      <ProfileCard
        name="Mamie Smith"
        subtitle="The first lady of the Blues"
        bio="Singer and pianist"
        tags={[{ label: "USA", color: colors.USA }, { label: "Singer" }]}
      />
    );
    expect(screen.getByText("The first lady of the Blues")).toBeInTheDocument();
    expect(screen.getByText("Singer and pianist")).toBeInTheDocument();
    expect(screen.getByText("USA")).toBeInTheDocument();
    expect(screen.getByText("Singer")).toBeInTheDocument();
  });

  it("without href or onClick it is not interactive", () => {
    renderWithTheme(<ProfileCard name="Mamie Smith" />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("with href the name is a link, and the heading is kept", () => {
    renderWithTheme(<ProfileCard name="Mamie Smith" href="https://example.com/mamie" />);
    const link = screen.getByRole("link", { name: "Mamie Smith" });
    expect(link).toHaveAttribute("href", "https://example.com/mamie");
    expect(screen.getByRole("heading", { level: 3 })).toContainElement(link);
  });

  it("with onClick the name is a button that responds to click", async () => {
    const onClick = vi.fn();
    renderWithTheme(<ProfileCard name="Mamie Smith" onClick={onClick} />);
    await userEvent.click(screen.getByRole("button", { name: "Mamie Smith" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("with onClick it can be activated with the keyboard", async () => {
    const onClick = vi.fn();
    renderWithTheme(<ProfileCard name="Mamie Smith" onClick={onClick} />);
    await userEvent.tab();
    expect(screen.getByRole("button", { name: "Mamie Smith" })).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("an interactive card has a single tab stop", async () => {
    renderWithTheme(
      <ProfileCard name="Mamie Smith" tags={[{ label: "USA", color: colors.USA }]} onClick={() => {}} />
    );
    expect(screen.getAllByRole("button")).toHaveLength(1);
  });
});
