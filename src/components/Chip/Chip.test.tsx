import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../test/utils";
import { createCategoryColors } from "../../theme/categorical";
import { CategoryChip, Chip } from "./Chip";

const colors = createCategoryColors(["Chile", "USA"]);

describe("Chip", () => {
  it("shows its text", () => {
    renderWithTheme(<Chip label="Singer" />);
    expect(screen.getByText("Singer")).toBeInTheDocument();
  });

  it("when clickable it is a button that responds to click", async () => {
    const onClick = vi.fn();
    renderWithTheme(<Chip label="1920s" onClick={onClick} />);
    await userEvent.click(screen.getByRole("button", { name: "1920s" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("when clickable it can be activated with the keyboard", async () => {
    const onClick = vi.fn();
    renderWithTheme(<Chip label="1920s" onClick={onClick} />);
    await userEvent.tab();
    expect(screen.getByRole("button", { name: "1920s" })).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe("CategoryChip", () => {
  it("shows the category name as text", () => {
    renderWithTheme(<CategoryChip label="Chile" color={colors.Chile} />);
    expect(screen.getByText("Chile")).toBeInTheDocument();
  });

  it("the dot is decorative", () => {
    const { container } = renderWithTheme(
      <CategoryChip label="Chile" color={colors.Chile} dot />
    );
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });

  it("is clickable when it receives onClick", async () => {
    const onClick = vi.fn();
    renderWithTheme(<CategoryChip label="USA" color={colors.USA} onClick={onClick} />);
    await userEvent.click(screen.getByRole("button", { name: "USA" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
