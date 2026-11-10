import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../test/utils";
import { SkipLink } from "./SkipLink";

describe("SkipLink", () => {
  it("points to the main content", () => {
    renderWithTheme(<SkipLink href="#content" />);
    expect(screen.getByRole("link", { name: "Skip to content" })).toHaveAttribute(
      "href",
      "#content"
    );
  });

  it("is the first element to receive focus", async () => {
    renderWithTheme(
      <>
        <SkipLink href="#content" />
        <button>Other</button>
      </>
    );
    await userEvent.tab();
    expect(screen.getByRole("link", { name: "Skip to content" })).toHaveFocus();
  });

  it("allows changing the text", () => {
    renderWithTheme(<SkipLink href="#main">Jump to main content</SkipLink>);
    expect(
      screen.getByRole("link", { name: "Jump to main content" })
    ).toBeInTheDocument();
  });
});
