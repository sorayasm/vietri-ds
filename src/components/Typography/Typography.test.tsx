import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../test/utils";
import { Typography } from "./Typography";

describe("Typography", () => {
  it("h1 renders as a level 1 heading", () => {
    renderWithTheme(<Typography variant="h1">Title</Typography>);
    expect(
      screen.getByRole("heading", { level: 1, name: "Title" })
    ).toBeInTheDocument();
  });

  it("body1 renders as a paragraph", () => {
    renderWithTheme(<Typography variant="body1">Text</Typography>);
    expect(screen.getByText("Text").tagName).toBe("P");
  });

  it("allows changing the HTML element with component", () => {
    renderWithTheme(
      <Typography variant="h2" component="h3">
        Section
      </Typography>
    );
    expect(
      screen.getByRole("heading", { level: 3, name: "Section" })
    ).toBeInTheDocument();
  });
});
