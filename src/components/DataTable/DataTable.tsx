import { useMemo, useState, type ReactNode } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Typography from "@mui/material/Typography";

type SortDirection = "asc" | "desc";

export interface DataTableColumn<T> {
  /** Key of the row property this column displays. */
  key: string;
  header: string;
  align?: "left" | "center" | "right";
  /** Allows sorting the table by this column. */
  sortable?: boolean;
  /** Custom cell content. */
  render?: (row: T) => ReactNode;
  /** Value used for sorting, when it differs from the displayed value. */
  sortValue?: (row: T) => string | number;
}

export interface DataTableProps<T extends object> {
  columns: DataTableColumn<T>[];
  rows: T[];
  getRowKey: (row: T) => string | number;
  /** Accessible title of the table. */
  caption?: string;
  emptyMessage?: string;
}

function rawValue<T extends object>(row: T, column: DataTableColumn<T>): unknown {
  return (row as unknown as Record<string, unknown>)[column.key];
}

function sortableValue<T extends object>(
  row: T,
  column: DataTableColumn<T>
): string | number {
  if (column.sortValue) return column.sortValue(row);
  const raw = rawValue(row, column);
  return typeof raw === "number" ? raw : String(raw ?? "");
}

function compare(a: string | number, b: string | number): number {
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a).localeCompare(String(b), undefined, { numeric: true });
}

export function DataTable<T extends object>({
  columns,
  rows,
  getRowKey,
  caption,
  emptyMessage = "No data",
}: DataTableProps<T>) {
  const [sort, setSort] = useState<{ key: string; direction: SortDirection } | null>(
    null
  );

  const sortedRows = useMemo(() => {
    if (!sort) return rows;
    const column = columns.find((c) => c.key === sort.key);
    if (!column) return rows;
    const factor = sort.direction === "asc" ? 1 : -1;
    return [...rows].sort(
      (a, b) => factor * compare(sortableValue(a, column), sortableValue(b, column))
    );
  }, [rows, columns, sort]);

  const toggleSort = (key: string) => {
    setSort((current) =>
      current?.key === key && current.direction === "asc"
        ? { key, direction: "desc" }
        : { key, direction: "asc" }
    );
  };

  // With horizontal scroll, the container must be able to receive focus (WCAG 2.1.1).
  return (
    <TableContainer tabIndex={0} sx={{ overflowX: "auto" }}>
      <Table>
        {caption && (
          <Typography
            component="caption"
            variant="body2"
            color="text.secondary"
            sx={{ captionSide: "top", textAlign: "left", pb: 2 }}
          >
            {caption}
          </Typography>
        )}
        <TableHead>
          <TableRow>
            {columns.map((column) => {
              const direction = sort?.key === column.key ? sort.direction : undefined;
              return (
                <TableCell
                  key={column.key}
                  align={column.align}
                  sortDirection={direction ?? false}
                >
                  {column.sortable ? (
                    <TableSortLabel
                      active={direction !== undefined}
                      direction={direction ?? "asc"}
                      onClick={() => toggleSort(column.key)}
                    >
                      {column.header}
                    </TableSortLabel>
                  ) : (
                    column.header
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedRows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            sortedRows.map((row) => (
              <TableRow key={getRowKey(row)}>
                {columns.map((column, index) => (
                  <TableCell
                    key={column.key}
                    align={column.align}
                    component={index === 0 ? "th" : "td"}
                    scope={index === 0 ? "row" : undefined}
                  >
                    {column.render
                      ? column.render(row)
                      : String(rawValue(row, column) ?? "")}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
