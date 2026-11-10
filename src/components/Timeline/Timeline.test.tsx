import { describe, it, expect } from "vitest";
import { screen, within } from "@testing-library/react";
import { renderWithTheme } from "../../test/utils";
import { Timeline } from "./Timeline";

const entries = [
  { id: "decade-1920s", label: "1920s", description: "First recordings", content: <p>Mamie Smith</p> },
  { id: "decade-1950s", label: "1950s", content: <p>Big Mama Thornton</p> },
];

describe("Timeline", () => {
  it("is an ordered list with one item per entry", () => {
    renderWithTheme(<Timeline entries={entries} />);
    const list = screen.getByRole("list");
    expect(list.tagName).toBe("OL");
    expect(within(list).getAllByRole("listitem")).toHaveLength(2);
  });

  it("each label is a level 3 heading by default", () => {
    renderWithTheme(<Timeline entries={entries} />);
    expect(screen.getByRole("heading", { level: 3, name: "1920s" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "1950s" })).toBeInTheDocument();
  });

  it("allows choosing the heading level", () => {
    renderWithTheme(<Timeline entries={entries} level={2} />);
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(2);
  });

  it("shows the description and the content of each entry", () => {
    renderWithTheme(<Timeline entries={entries} />);
    expect(screen.getByText("First recordings")).toBeInTheDocument();
    expect(screen.getByText("Mamie Smith")).toBeInTheDocument();
    expect(screen.getByText("Big Mama Thornton")).toBeInTheDocument();
  });

  it("each entry can be linked by its id", () => {
    renderWithTheme(<Timeline entries={entries} />);
    const items = screen.getAllByRole("listitem");
    expect(items[0]).toHaveAttribute("id", "decade-1920s");
    expect(items[1]).toHaveAttribute("id", "decade-1950s");
  });

  it("the list can have an accessible name", () => {
    renderWithTheme(<Timeline entries={entries} ariaLabel="Timeline by decade" />);
    expect(screen.getByRole("list", { name: "Timeline by decade" })).toBeInTheDocument();
  });

  it("the dots are hidden from screen readers", () => {
    const { container } = renderWithTheme(<Timeline entries={entries} />);
    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(2);
  });
});
