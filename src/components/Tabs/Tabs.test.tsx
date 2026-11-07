import { useState } from "react";
import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../test/utils";
import { Tabs, Tab } from "./Tabs";

function Demo({ onChange }: { onChange?: (value: string) => void }) {
  const [value, setValue] = useState("a");
  return (
    <Tabs
      aria-label="Secciones"
      value={value}
      onChange={(_event, next: string) => {
        setValue(next);
        onChange?.(next);
      }}
    >
      <Tab label="Mapa" value="a" />
      <Tab label="Línea de tiempo" value="b" />
    </Tabs>
  );
}

describe("Tabs", () => {
  it("expone una lista de pestañas con nombre accesible", () => {
    renderWithTheme(<Demo />);
    expect(screen.getByRole("tablist", { name: "Secciones" })).toBeInTheDocument();
    expect(screen.getAllByRole("tab")).toHaveLength(2);
  });

  it("marca la pestaña activa como seleccionada", () => {
    renderWithTheme(<Demo />);
    expect(screen.getByRole("tab", { name: "Mapa" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    expect(screen.getByRole("tab", { name: "Línea de tiempo" })).toHaveAttribute(
      "aria-selected",
      "false"
    );
  });

  it("cambia de pestaña al hacer clic y avisa con onChange", async () => {
    const onChange = vi.fn();
    renderWithTheme(<Demo onChange={onChange} />);
    await userEvent.click(screen.getByRole("tab", { name: "Línea de tiempo" }));
    expect(onChange).toHaveBeenCalledWith("b");
    expect(screen.getByRole("tab", { name: "Línea de tiempo" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
  });
});
