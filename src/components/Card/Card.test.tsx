import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../test/utils";
import { editorialTheme, streamingTheme, observatoryTheme } from "../../theme";
import { Card, CardActionArea, CardContent } from "./Card";

describe("Card", () => {
  it("muestra su contenido", () => {
    renderWithTheme(
      <Card>
        <CardContent>Vietri Design System</CardContent>
      </Card>
    );
    expect(screen.getByText("Vietri Design System")).toBeInTheDocument();
  });

  it("usa la variante outlined por defecto", () => {
    renderWithTheme(
      <Card data-testid="card">
        <CardContent>Contenido</CardContent>
      </Card>
    );
    expect(screen.getByTestId("card")).toHaveClass("MuiPaper-outlined");
  });

  it("CardActionArea es un botón accesible que responde al clic", async () => {
    const onClick = vi.fn();
    renderWithTheme(
      <Card>
        <CardActionArea onClick={onClick}>
          <CardContent>Abrir proyecto</CardContent>
        </CardActionArea>
      </Card>
    );
    await userEvent.click(screen.getByRole("button", { name: "Abrir proyecto" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it.each([
    ["editorial", editorialTheme],
    ["streaming", streamingTheme],
    ["observatory", observatoryTheme],
  ])("se renderiza con el tema %s", (_name, theme) => {
    renderWithTheme(
      <Card>
        <CardContent>Contenido</CardContent>
      </Card>,
      theme
    );
    expect(screen.getByText("Contenido")).toBeInTheDocument();
  });
});
