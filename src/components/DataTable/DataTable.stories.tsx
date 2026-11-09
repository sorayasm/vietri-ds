import type { Meta, StoryObj } from "@storybook/react";
import { DataTable, type DataTableColumn, type DataTableProps } from "./DataTable";

interface Artist {
  name: string;
  born: number;
  country: string;
}

const rows: Artist[] = [
  { name: "Bessie Smith", born: 1894, country: "Estados Unidos" },
  { name: "Ma Rainey", born: 1886, country: "Estados Unidos" },
  { name: "Sister Rosetta Tharpe", born: 1915, country: "Estados Unidos" },
  { name: "Big Mama Thornton", born: 1926, country: "Estados Unidos" },
  { name: "Etta James", born: 1938, country: "Estados Unidos" },
];

const columns: DataTableColumn<Artist>[] = [
  { key: "name", header: "Artista", sortable: true },
  { key: "born", header: "Nacimiento", align: "right", sortable: true },
  { key: "country", header: "País" },
];

const meta: Meta<DataTableProps<Artist>> = {
  title: "Data/DataTable",
  component: DataTable,
  tags: ["autodocs"],
  args: {
    columns,
    rows,
    getRowKey: (row) => row.name,
    caption: "Artistas de ejemplo",
  },
};

export default meta;
type Story = StoryObj<DataTableProps<Artist>>;

export const Default: Story = {};

export const WithoutSorting: Story = {
  args: {
    columns: columns.map((column) => ({ ...column, sortable: false })),
  },
};

export const CustomCell: Story = {
  args: {
    columns: [
      ...columns.slice(0, 2),
      {
        key: "country",
        header: "País",
        render: (row) => <strong>{row.country}</strong>,
      },
    ],
  },
};

export const Empty: Story = {
  args: { rows: [], emptyMessage: "No hay artistas para mostrar" },
};
