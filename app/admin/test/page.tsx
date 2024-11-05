"use client";
import { fetchAllPurchase } from "@/src/purchase";
import Select from "@/components/custom/select";
import { useState, useEffect } from "react";
import { purchase } from "@/lib/types";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";

interface ColumnFilter {
  id: string;
  value: unknown;
}
type ColumnFiltersState = ColumnFilter[];
let columnHelper = createColumnHelper<purchase>();
let columns = [
  columnHelper.accessor("id", {
    header: "purchase id",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("quantity", {
    header: "Quantity",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("confirmed", {
    header: "Status",
    cell: (info) => info.getValue(),
  }),
];

export default function AdminPage() {
  const [data, setData] = useState<purchase[]>([]); // Initialize as empty array
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    {
      id: "id",
      value: "f913409c-daf0-4d11-ade1-09aa556fbd29",
    },
  ]);
  useEffect(() => {
    // Fetch data asynchronously and set it to the state
    async function fetchData() {
      const purchases = await fetchAllPurchase();
      setData(purchases);
    }
    fetchData();
  }, []);

  const table = useReactTable({
    columns,
    data, // This now has a consistent type of purchase[]
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
  });

  return (
    <>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
