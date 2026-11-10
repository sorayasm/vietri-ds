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
  { key: "name", header: "Artist", sortable: true },
  { key: "year", header: "Year", align: "right", sortable: true },
];

function renderTable(extra: { rows?: Row[]; emptyMessage?: string } = {}) {
  return renderWithTheme(
    <DataTable<Row>
      caption="Artists"
      columns={columns}
      rows={extra.rows ?? rows}
      getRowKey={(row) => row.name}
      emptyMessage={extra.emptyMessage}
    />
  );
}

/** Names of the data rows, in the order they appear. */
function firstColumnOrder() {
  return screen
    .getAllByRole("row")
    .slice(1)
    .map((row) => within(row).getAllByRole("rowheader")[0].textContent);
}

describe("DataTable", () => {
  it("shows the accessible title and the headers", () => {
    renderTable();
    expect(screen.getByRole("table", { name: "Artists" })).toBeInTheDocument();
    expect(screen.getAllByRole("columnheader")).toHaveLength(2);
  });

  it("shows one row per data item, in the original order", () => {
    renderTable();
    expect(firstColumnOrder()).toEqual(["Bessie Smith", "Ma Rainey", "Etta James"]);
  });

  it("sorts ascending when a numeric header is clicked", async () => {
    renderTable();
    await userEvent.click(screen.getByRole("button", { name: "Year" }));
    expect(firstColumnOrder()).toEqual(["Ma Rainey", "Bessie Smith", "Etta James"]);
    expect(screen.getByRole("columnheader", { name: /Year/ })).toHaveAttribute(
      "aria-sort",
      "ascending"
    );
  });

  it("reverses the order when clicked again", async () => {
    renderTable();
    const header = screen.getByRole("button", { name: "Year" });
    await userEvent.click(header);
    await userEvent.click(header);
    expect(firstColumnOrder()).toEqual(["Etta James", "Bessie Smith", "Ma Rainey"]);
    expect(screen.getByRole("columnheader", { name: /Year/ })).toHaveAttribute(
      "aria-sort",
      "descending"
    );
  });

  it("sorts text alphabetically", async () => {
    renderTable();
    await userEvent.click(screen.getByRole("button", { name: "Artist" }));
    expect(firstColumnOrder()).toEqual(["Bessie Smith", "Etta James", "Ma Rainey"]);
  });

  it("does not sort columns that are not sortable", () => {
    renderWithTheme(
      <DataTable<Row>
        columns={[{ key: "name", header: "Artist" }]}
        rows={rows}
        getRowKey={(row) => row.name}
      />
    );
    expect(screen.queryByRole("button", { name: "Artist" })).not.toBeInTheDocument();
  });

  it("shows the message when there is no data", () => {
    renderTable({ rows: [], emptyMessage: "Nothing to show" });
    expect(screen.getByText("Nothing to show")).toBeInTheDocument();
  });

  it("uses render for custom cells", () => {
    renderWithTheme(
      <DataTable<Row>
        columns={[
          { key: "name", header: "Artist" },
          { key: "year", header: "Year", render: (row) => <em>born in {row.year}</em> },
        ]}
        rows={[rows[0]]}
        getRowKey={(row) => row.name}
      />
    );
    expect(screen.getByText("born in 1894")).toBeInTheDocument();
  });
});
