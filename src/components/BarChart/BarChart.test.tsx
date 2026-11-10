import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../test/utils";
import { editorialTheme, streamingTheme, observatoryTheme } from "../../theme";
import { BarChart } from "./BarChart";

const data = [
  { label: "Chile", value: 50 },
  { label: "Argentina", value: 100 },
];

describe("BarChart", () => {
  it("shows the title and one bar per data point", () => {
    renderWithTheme(<BarChart title="Profiles by country" data={data} />);
    expect(screen.getByText("Profiles by country")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getAllByRole("meter")).toHaveLength(2);
  });

  it("exposes each bar's name and value to screen readers", () => {
    renderWithTheme(<BarChart data={data} />);
    const chile = screen.getByRole("meter", { name: "Chile" });
    expect(chile).toHaveAttribute("aria-valuenow", "50");
    expect(chile).toHaveAttribute("aria-valuemin", "0");
    expect(chile).toHaveAttribute("aria-valuemax", "100");
  });

  it("computes width relative to the largest value", () => {
    renderWithTheme(<BarChart data={data} />);
    const [chile, argentina] = screen.getAllByRole("meter");
    expect(chile.firstElementChild).toHaveStyle({ width: "50%" });
    expect(argentina.firstElementChild).toHaveStyle({ width: "100%" });
  });

  it("respects a custom max", () => {
    renderWithTheme(<BarChart data={data} max={200} />);
    const [chile] = screen.getAllByRole("meter");
    expect(chile.firstElementChild).toHaveStyle({ width: "25%" });
    expect(chile).toHaveAttribute("aria-valuemax", "200");
  });

  it("does not exceed 100% when the value is above the max", () => {
    renderWithTheme(<BarChart data={[{ label: "A", value: 300 }]} max={100} />);
    expect(screen.getByRole("meter").firstElementChild).toHaveStyle({ width: "100%" });
  });

  it("uses formatValue for the value text", () => {
    renderWithTheme(
      <BarChart data={data} formatValue={(value) => `${value} profiles`} />
    );
    expect(screen.getByRole("meter", { name: "Chile" })).toHaveAttribute(
      "aria-valuetext",
      "50 profiles"
    );
    expect(screen.getByText("100 profiles")).toBeInTheDocument();
  });

  it("does not break when all values are zero", () => {
    renderWithTheme(<BarChart data={[{ label: "A", value: 0 }]} />);
    expect(screen.getByRole("meter").firstElementChild).toHaveStyle({ width: "0%" });
  });

  it.each([
    ["editorial", editorialTheme],
    ["streaming", streamingTheme],
    ["observatory", observatoryTheme],
  ])("renders with the %s theme", (_name, theme) => {
    renderWithTheme(<BarChart data={data} />, theme);
    expect(screen.getAllByRole("meter")).toHaveLength(2);
  });
});
