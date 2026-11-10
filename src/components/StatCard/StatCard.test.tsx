import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../test/utils";
import { editorialTheme, streamingTheme, observatoryTheme } from "../../theme";
import { StatCard } from "./StatCard";

describe("StatCard", () => {
  it("shows the figure and its label", () => {
    renderWithTheme(<StatCard value="+200" label="Documented biographies" />);
    expect(screen.getByText("+200")).toBeInTheDocument();
    expect(screen.getByText("Documented biographies")).toBeInTheDocument();
  });

  it("shows the description only when provided", () => {
    const { rerender } = renderWithTheme(<StatCard value="1" label="Metric" />);
    expect(screen.queryByText("More context")).not.toBeInTheDocument();
    rerender(<StatCard value="1" label="Metric" description="More context" />);
    expect(screen.getByText("More context")).toBeInTheDocument();
  });

  it("the figure is not announced as a heading", () => {
    renderWithTheme(<StatCard value="+200" label="Biographies" />);
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it.each([
    ["editorial", editorialTheme],
    ["streaming", streamingTheme],
    ["observatory", observatoryTheme],
  ])("renders with the %s theme", (_name, theme) => {
    renderWithTheme(<StatCard value="10" label="Metric" />, theme);
    expect(screen.getByText("Metric")).toBeInTheDocument();
  });
});
