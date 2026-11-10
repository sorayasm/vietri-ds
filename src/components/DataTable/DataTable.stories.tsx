import type { Meta, StoryObj } from "@storybook/react-vite";
import { DataTable, type DataTableColumn, type DataTableProps } from "./DataTable";

interface Artist {
  name: string;
  born: number;
  country: string;
}

const rows: Artist[] = [
  { name: "Bessie Smith", born: 1894, country: "United States" },
  { name: "Ma Rainey", born: 1886, country: "United States" },
  { name: "Sister Rosetta Tharpe", born: 1915, country: "United States" },
  { name: "Big Mama Thornton", born: 1926, country: "United States" },
  { name: "Etta James", born: 1938, country: "United States" },
];

const columns: DataTableColumn<Artist>[] = [
  { key: "name", header: "Artist", sortable: true },
  { key: "born", header: "Born", align: "right", sortable: true },
  { key: "country", header: "Country" },
];

const meta: Meta<DataTableProps<Artist>> = {
  title: "Data/DataTable",
  component: DataTable,
  tags: ["autodocs"],
  args: {
    columns,
    rows,
    getRowKey: (row) => row.name,
    caption: "Sample artists",
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
        header: "Country",
        render: (row) => <strong>{row.country}</strong>,
      },
    ],
  },
};

export const Empty: Story = {
  args: { rows: [], emptyMessage: "No artists to show" },
};
