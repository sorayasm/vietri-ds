import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../test/utils";
import { editorialTheme, streamingTheme, observatoryTheme } from "../../theme";
import { StatCard } from "./StatCard";

describe("StatCard", () => {
  it("muestra la cifra y su etiqueta", () => {
    renderWithTheme(<StatCard value="+200" label="Biografías documentadas" />);
    expect(screen.getByText("+200")).toBeInTheDocument();
    expect(screen.getByText("Biografías documentadas")).toBeInTheDocument();
  });

  it("muestra la descripción solo si se entrega", () => {
    const { rerender } = renderWithTheme(<StatCard value="1" label="Dato" />);
    expect(screen.queryByText("Más contexto")).not.toBeInTheDocument();
    rerender(<StatCard value="1" label="Dato" description="Más contexto" />);
    expect(screen.getByText("Más contexto")).toBeInTheDocument();
  });

  it("la cifra no se anuncia como encabezado", () => {
    renderWithTheme(<StatCard value="+200" label="Biografías" />);
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it.each([
    ["editorial", editorialTheme],
    ["streaming", streamingTheme],
    ["observatory", observatoryTheme],
  ])("se renderiza con el tema %s", (_name, theme) => {
    renderWithTheme(<StatCard value="10" label="Dato" />, theme);
    expect(screen.getByText("Dato")).toBeInTheDocument();
  });
});
