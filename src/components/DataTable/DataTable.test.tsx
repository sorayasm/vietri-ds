import { describe, it, expect } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../test/utils";
import { DataTable, type DataTableColumn } from "./DataTable";

interface Row {
  name: string;
  year: number;
}

const rows: Row[] = [
  { name: "Bessie Smith", year: 1894 },
  { name: "Ma Rainey", year: 1886 },
  { name: "Etta James", year: 1938 },
];

const columns: DataTableColumn<Row>[] = [
  { key: "name", header: "Artista", sortable: true },
  { key: "year", header: "Año", align: "right", sortable: true },
];

function renderTable(extra: { rows?: Row[]; emptyMessage?: string } = {}) {
  return renderWithTheme(
    <DataTable<Row>
      caption="Artistas"
      columns={columns}
      rows={extra.rows ?? rows}
      getRowKey={(row) => row.name}
      emptyMessage={extra.emptyMessage}
    />
  );
}

/** Nombres de las filas de datos, en el orden en que aparecen. */
function firstColumnOrder() {
  return screen
    .getAllByRole("row")
    .slice(1)
    .map((row) => within(row).getAllByRole("rowheader")[0].textContent);
}

describe("DataTable", () => {
  it("muestra el título accesible y los encabezados", () => {
    renderTable();
    expect(screen.getByRole("table", { name: "Artistas" })).toBeInTheDocument();
    expect(screen.getAllByRole("columnheader")).toHaveLength(2);
  });

  it("muestra una fila por dato, en el orden original", () => {
    renderTable();
    expect(firstColumnOrder()).toEqual(["Bessie Smith", "Ma Rainey", "Etta James"]);
  });

  it("ordena de forma ascendente al pulsar el encabezado de un número", async () => {
    renderTable();
    await userEvent.click(screen.getByRole("button", { name: "Año" }));
    expect(firstColumnOrder()).toEqual(["Ma Rainey", "Bessie Smith", "Etta James"]);
    expect(screen.getByRole("columnheader", { name: /Año/ })).toHaveAttribute(
      "aria-sort",
      "ascending"
    );
  });

  it("invierte el orden al pulsar de nuevo", async () => {
    renderTable();
    const header = screen.getByRole("button", { name: "Año" });
    await userEvent.click(header);
    await userEvent.click(header);
    expect(firstColumnOrder()).toEqual(["Etta James", "Bessie Smith", "Ma Rainey"]);
    expect(screen.getByRole("columnheader", { name: /Año/ })).toHaveAttribute(
      "aria-sort",
      "descending"
    );
  });

  it("ordena texto alfabéticamente", async () => {
    renderTable();
    await userEvent.click(screen.getByRole("button", { name: "Artista" }));
    expect(firstColumnOrder()).toEqual(["Bessie Smith", "Etta James", "Ma Rainey"]);
  });

  it("no ordena columnas que no son sortable", () => {
    renderWithTheme(
      <DataTable<Row>
        columns={[{ key: "name", header: "Artista" }]}
        rows={rows}
        getRowKey={(row) => row.name}
      />
    );
    expect(screen.queryByRole("button", { name: "Artista" })).not.toBeInTheDocument();
  });

  it("muestra el mensaje cuando no hay datos", () => {
    renderTable({ rows: [], emptyMessage: "Nada que mostrar" });
    expect(screen.getByText("Nada que mostrar")).toBeInTheDocument();
  });

  it("usa render para celdas personalizadas", () => {
    renderWithTheme(
      <DataTable<Row>
        columns={[
          { key: "name", header: "Artista" },
          { key: "year", header: "Año", render: (row) => <em>nació en {row.year}</em> },
        ]}
        rows={[rows[0]]}
        getRowKey={(row) => row.name}
      />
    );
    expect(screen.getByText("nació en 1894")).toBeInTheDocument();
  });
});
