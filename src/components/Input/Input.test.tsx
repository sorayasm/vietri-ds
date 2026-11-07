import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../test/utils";
import { editorialTheme, streamingTheme, observatoryTheme } from "../../theme";
import { Input } from "./Input";

describe("Input", () => {
  it("asocia la etiqueta con el campo", () => {
    renderWithTheme(<Input label="Correo electrónico" />);
    expect(screen.getByLabelText("Correo electrónico")).toBeInTheDocument();
  });

  it("permite escribir y notifica los cambios", async () => {
    const onChange = vi.fn();
    renderWithTheme(<Input label="Nombre" onChange={onChange} />);
    const field = screen.getByLabelText("Nombre");
    await userEvent.type(field, "Soraya");
    expect(field).toHaveValue("Soraya");
    expect(onChange).toHaveBeenCalledTimes(6);
  });

  it("muestra el texto de ayuda y lo vincula al campo", () => {
    renderWithTheme(<Input label="Correo" helperText="Usa tu correo personal" />);
    expect(screen.getByLabelText("Correo")).toHaveAccessibleDescription(
      "Usa tu correo personal"
    );
  });

  it("marca el campo como inválido cuando hay error", () => {
    renderWithTheme(<Input label="Correo" error helperText="Correo no válido" />);
    expect(screen.getByLabelText("Correo")).toBeInvalid();
  });

  it("queda deshabilitado", () => {
    renderWithTheme(<Input label="Correo" disabled />);
    expect(screen.getByLabelText("Correo")).toBeDisabled();
  });

  it.each([
    ["editorial", editorialTheme],
    ["streaming", streamingTheme],
    ["observatory", observatoryTheme],
  ])("se renderiza con el tema %s", (_name, theme) => {
    renderWithTheme(<Input label="Correo" />, theme);
    expect(screen.getByLabelText("Correo")).toBeInTheDocument();
  });
});
