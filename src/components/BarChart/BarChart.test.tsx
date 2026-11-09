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
  it("muestra el título y una barra por dato", () => {
    renderWithTheme(<BarChart title="Perfiles por país" data={data} />);
    expect(screen.getByText("Perfiles por país")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getAllByRole("meter")).toHaveLength(2);
  });

  it("expone nombre y valor de cada barra a lectores de pantalla", () => {
    renderWithTheme(<BarChart data={data} />);
    const chile = screen.getByRole("meter", { name: "Chile" });
    expect(chile).toHaveAttribute("aria-valuenow", "50");
    expect(chile).toHaveAttribute("aria-valuemin", "0");
    expect(chile).toHaveAttribute("aria-valuemax", "100");
  });

  it("calcula el ancho relativo al mayor valor", () => {
    renderWithTheme(<BarChart data={data} />);
    const [chile, argentina] = screen.getAllByRole("meter");
    expect(chile.firstElementChild).toHaveStyle({ width: "50%" });
    expect(argentina.firstElementChild).toHaveStyle({ width: "100%" });
  });

  it("respeta un máximo personalizado", () => {
    renderWithTheme(<BarChart data={data} max={200} />);
    const [chile] = screen.getAllByRole("meter");
    expect(chile.firstElementChild).toHaveStyle({ width: "25%" });
    expect(chile).toHaveAttribute("aria-valuemax", "200");
  });

  it("no pasa del 100 % si el valor supera el máximo", () => {
    renderWithTheme(<BarChart data={[{ label: "A", value: 300 }]} max={100} />);
    expect(screen.getByRole("meter").firstElementChild).toHaveStyle({ width: "100%" });
  });

  it("usa formatValue en el texto del valor", () => {
    renderWithTheme(
      <BarChart data={data} formatValue={(value) => `${value} perfiles`} />
    );
    expect(screen.getByRole("meter", { name: "Chile" })).toHaveAttribute(
      "aria-valuetext",
      "50 perfiles"
    );
    expect(screen.getByText("100 perfiles")).toBeInTheDocument();
  });

  it("no rompe cuando todos los valores son cero", () => {
    renderWithTheme(<BarChart data={[{ label: "A", value: 0 }]} />);
    expect(screen.getByRole("meter").firstElementChild).toHaveStyle({ width: "0%" });
  });

  it.each([
    ["editorial", editorialTheme],
    ["streaming", streamingTheme],
    ["observatory", observatoryTheme],
  ])("se renderiza con el tema %s", (_name, theme) => {
    renderWithTheme(<BarChart data={data} />, theme);
    expect(screen.getAllByRole("meter")).toHaveLength(2);
  });
});
