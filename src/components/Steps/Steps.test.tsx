import { describe, it, expect } from "vitest";
import { screen, within } from "@testing-library/react";
import { renderWithTheme } from "../../test/utils";
import { Steps } from "./Steps";

const steps = [
  { title: "Collect sources", description: "Books and archives" },
  { title: "Human review", description: "Every data point is checked" },
  { title: "Publication" },
];

describe("Steps", () => {
  it("is an ordered list with one item per step", () => {
    renderWithTheme(<Steps steps={steps} />);
    const list = screen.getByRole("list");
    expect(list.tagName).toBe("OL");
    expect(within(list).getAllByRole("listitem")).toHaveLength(3);
  });

  it("keeps the steps in order", () => {
    renderWithTheme(<Steps steps={steps} />);
    const titles = screen.getAllByRole("heading").map((heading) => heading.textContent);
    expect(titles).toEqual(["Collect sources", "Human review", "Publication"]);
  });

  it("each title is a level 3 heading by default", () => {
    renderWithTheme(<Steps steps={steps} />);
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(3);
  });

  it("allows choosing the heading level", () => {
    renderWithTheme(<Steps steps={steps} level={4} />);
    expect(screen.getAllByRole("heading", { level: 4 })).toHaveLength(3);
  });

  it("shows the description only when there is one", () => {
    renderWithTheme(<Steps steps={steps} />);
    expect(screen.getByText("Books and archives")).toBeInTheDocument();
    expect(screen.getAllByText(/./, { selector: "p" })).toHaveLength(2);
  });

  it("the list can have an accessible name", () => {
    renderWithTheme(<Steps steps={steps} ariaLabel="Methodology" />);
    expect(screen.getByRole("list", { name: "Methodology" })).toBeInTheDocument();
  });

  it("the visible numbers are hidden from screen readers", () => {
    const { container } = renderWithTheme(<Steps steps={steps} />);
    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(3);
  });
});
