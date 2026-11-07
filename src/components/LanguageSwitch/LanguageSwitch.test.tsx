import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../test/utils";
import { LanguageSwitch } from "./LanguageSwitch";

describe("LanguageSwitch", () => {
  it("muestra EN y ES dentro de un grupo con nombre accesible", () => {
    renderWithTheme(<LanguageSwitch value="en" onChange={() => {}} />);
    expect(screen.getByRole("group", { name: "Idioma" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "EN" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "ES" })).toBeInTheDocument();
  });

  it("marca como presionada la opción activa", () => {
    renderWithTheme(<LanguageSwitch value="es" onChange={() => {}} />);
    expect(screen.getByRole("button", { name: "ES" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    expect(screen.getByRole("button", { name: "EN" })).toHaveAttribute(
      "aria-pressed",
      "false"
    );
  });

  it("llama a onChange con el nuevo idioma", async () => {
    const onChange = vi.fn();
    renderWithTheme(<LanguageSwitch value="en" onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: "ES" }));
    expect(onChange).toHaveBeenCalledWith("es");
  });

  it("no llama a onChange al pulsar el idioma ya activo", async () => {
    const onChange = vi.fn();
    renderWithTheme(<LanguageSwitch value="en" onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: "EN" }));
    expect(onChange).not.toHaveBeenCalled();
  });
});
