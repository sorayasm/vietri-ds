import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../test/utils";
import { VisuallyHidden } from "./VisuallyHidden";

describe("VisuallyHidden", () => {
  it("keeps its text in the accessibility tree", () => {
    renderWithTheme(
      <a href="#x">
        Vox Mater <VisuallyHidden>(opens in a new tab)</VisuallyHidden>
      </a>
    );
    expect(
      screen.getByRole("link", { name: "Vox Mater (opens in a new tab)" })
    ).toBeInTheDocument();
  });

  it("accepts aria attributes", () => {
    renderWithTheme(<VisuallyHidden role="status">Saved</VisuallyHidden>);
    expect(screen.getByRole("status")).toHaveTextContent("Saved");
  });
});
