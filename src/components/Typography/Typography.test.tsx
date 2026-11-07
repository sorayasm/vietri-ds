import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../test/utils";
import { Typography } from "./Typography";

describe("Typography", () => {
  it("h1 se renderiza como encabezado de nivel 1", () => {
    renderWithTheme(<Typography variant="h1">Título</Typography>);
    expect(
      screen.getByRole("heading", { level: 1, name: "Título" })
    ).toBeInTheDocument();
  });

  it("body1 se renderiza como párrafo", () => {
    renderWithTheme(<Typography variant="body1">Texto</Typography>);
    expect(screen.getByText("Texto").tagName).toBe("P");
  });

  it("permite cambiar el elemento HTML con component", () => {
    renderWithTheme(
      <Typography variant="h2" component="h3">
        Sección
      </Typography>
    );
    expect(
      screen.getByRole("heading", { level: 3, name: "Sección" })
    ).toBeInTheDocument();
  });
});
