import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../test/utils";
import { SectionHeader } from "./SectionHeader";

describe("SectionHeader", () => {
  it("the title is a level 2 heading by default", () => {
    renderWithTheme(<SectionHeader title="Methodology" />);
    expect(screen.getByRole("heading", { level: 2, name: "Methodology" })).toBeInTheDocument();
  });

  it("allows choosing the heading level", () => {
    renderWithTheme(<SectionHeader title="Home" level={1} />);
    expect(screen.getByRole("heading", { level: 1, name: "Home" })).toBeInTheDocument();
  });

  it("the eyebrow and the description are not headings", () => {
    renderWithTheme(
      <SectionHeader title="Impact" eyebrow="Results" description="Project figures" />
    );
    expect(screen.getAllByRole("heading")).toHaveLength(1);
    expect(screen.getByText("Results")).toBeInTheDocument();
    expect(screen.getByText("Project figures")).toBeInTheDocument();
  });
});
