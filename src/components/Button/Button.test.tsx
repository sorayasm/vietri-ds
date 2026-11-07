import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../test/utils";
import { editorialTheme, streamingTheme, observatoryTheme } from "../../theme";
import { Button } from "./Button";

describe("Button", () => {
  it("muestra su texto", () => {
    renderWithTheme(<Button>Guardar</Button>);
    expect(screen.getByRole("button", { name: "Guardar" })).toBeInTheDocument();
  });

  it("llama a onClick al hacer clic", async () => {
    const onClick = vi.fn();
    renderWithTheme(<Button onClick={onClick}>Guardar</Button>);
    await userEvent.click(screen.getByRole("button", { name: "Guardar" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("no llama a onClick cuando está deshabilitado", async () => {
    // MUI aplica pointer-events: none a los botones deshabilitados;
    // desactivamos esa verificación para comprobar que onClick no se dispara.
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onClick = vi.fn();
    renderWithTheme(
      <Button disabled onClick={onClick}>
        Guardar
      </Button>
    );
    const button = screen.getByRole("button", { name: "Guardar" });
    expect(button).toBeDisabled();
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("se puede activar con el teclado", async () => {
    const onClick = vi.fn();
    renderWithTheme(<Button onClick={onClick}>Guardar</Button>);
    await userEvent.tab();
    await userEvent.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it.each([
    ["editorial", editorialTheme],
    ["streaming", streamingTheme],
    ["observatory", observatoryTheme],
  ])("se renderiza con el tema %s", (_name, theme) => {
    renderWithTheme(<Button>Explorar</Button>, theme);
    expect(screen.getByRole("button", { name: "Explorar" })).toBeInTheDocument();
  });
});
