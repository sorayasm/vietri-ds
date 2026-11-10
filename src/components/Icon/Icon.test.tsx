import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../test/utils";
import { Icon } from "./Icon";
import * as icons from "./icons";

describe("Icon", () => {
  it("is decorative without a label and hidden from screen readers", () => {
    const { container } = renderWithTheme(<Icon icon={icons.Search} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("is exposed as an image with that name when it has a label", () => {
    renderWithTheme(<Icon icon={icons.Info} label="Information" />);
    expect(screen.getByRole("img", { name: "Information" })).toBeInTheDocument();
  });

  it("respects the size", () => {
    const { container } = renderWithTheme(<Icon icon={icons.Search} size={32} />);
    expect(container.querySelector("svg")).toHaveAttribute("width", "32");
  });

  it("the catalog exports usable icons", () => {
    const names = Object.keys(icons);
    expect(names.length).toBeGreaterThan(10);
    expect(names).toContain("Search");
  });
});
