"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  ColumnFiltersState,
  VisibilityState,
  getFacetedRowModel,
  getSortedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  Column,
  RowData,
  SortingState,
} from "@tanstack/react-table";

import { Button } from "@/components/primitives/button";
import { Input } from "@/components/primitives/input";

import { Table, TableCell, TableRow } from "@/components/primitives/table";
import React, { CSSProperties, useState } from "react";
import { ChartArea, ListFilterIcon, TableIcon } from "lucide-react";
import { DataTableProps } from "@/app/portal/admin/forms/[id]/submissions/dataTableWrapper";
import AnalyticsPage from "@/app/portal/admin/forms/[id]/submissions/AnalyticsPage";

const getCommonPinningStyles = (column: Column<any>): CSSProperties => {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === "left" && column.getIsLastColumn("left");
  const isFirstRightPinnedColumn =
    isPinned === "right" && column.getIsFirstColumn("right");

  return {
    ...(isLastLeftPinnedColumn
      ? { borderRight: `1px solid var(--background-500)` }
      : {}),
    ...(isFirstRightPinnedColumn
      ? { borderLeft: `1px solid var(--background-500)` }
      : {}),
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    opacity: isPinned ? 0.95 : 1,
    position: isPinned ? "sticky" : "relative",
    width: column.getSize() ? column.getSize() : "300px",
    // zIndex: isPinned ? 1 : 0,
  };
};

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [tabView, setTabView] = useState<"table" | "chart">("table");

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(), // client-side faceting
    getFacetedUniqueValues: getFacetedUniqueValues(), // generate unique values for select filter/autocomplete
    getFacetedMinMaxValues: getFacetedMinMaxValues(), // generate min/max values for range filter
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
    enableColumnFilters: true,
    state: {
      columnFilters,
      columnVisibility,
      sorting,
      columnOrder: [
        "status",
        "level",
        "reviewer_id",
        "interviewer_id",
        "notes",
        "popover",
      ],
    },
  });

  return (
    <div className={"overflow-hidden flex flex-col px-10  py-1"}>
      <div className="flex items-center w-full gap-2 py-4  flex-wrap">
        <div className="flex items-center flex-1 p-2 gap-2">
          <span className="text-lg font-bold">
            {table.getFilteredRowModel().rows.length} {"Results"}
          </span>
        </div>
        <TableFilter
          columns={
            table.getAllColumns() as unknown as Column<unknown, unknown>[]
          }
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
        />

        <div
          className={
            "flex relative items-center bg-background-600 rounded-lg border-background-500 border gap-2"
          }
        >
          <Button
            onClick={() => {
              setTabView("table");
            }}
            className={`bg-background-600 w-24  gap-2 border-background-500 ${tabView === "table" ? "bg-lp-400" : ""}`}
          >
            <TableIcon className={"h-4 w-4"} />
            Table
          </Button>
          <Button
            onClick={() => {
              setTabView("chart");
            }}
            className={`bg-background-600  w-24 border-background-500 gap-2 ${tabView === "chart" ? "bg-lp-400" : ""}`}
          >
            <ChartArea className={"h-4 w-4"} />
            Chart
          </Button>
        </div>
      </div>
      {table.getFilteredRowModel().rows.length > 0 && tabView === "chart" && (
        <AnalyticsPage
          submissions={table
            .getFilteredRowModel()
            .rows.map((row) => row.original)}
        />
      )}

      {tabView === "table" && (
        <div className="rounded-md border shadow-sm  border-background-500 overflow-hidden  ">
          <Table>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className={"border-background-500"}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <td
                        key={header.id}
                        className={
                          " flex bg-background-600 text-xs flex-col   border-background-500  font-semibold  justify-center  overflow-hidden line-clamp-2  text-ellipsis"
                        }
                        style={{ ...getCommonPinningStyles(header.column) }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody className={"relative"}>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    className={
                      "border-background-500 p-0   bg-background-600 odd:bg-background-700"
                    }
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className={
                          "  h-full text-xs min-h-24   overflow-hidden "
                        }
                        style={{ ...getCommonPinningStyles(cell.column) }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 flex-shrink-0 w-fit text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}

function TableFilter({
  columns,
  columnFilters,
  setColumnFilters,
}: {
  columns: Column<RowData, unknown>[];
  columnFilters: ColumnFiltersState;
  setColumnFilters: (value: ColumnFiltersState) => void;
}) {
  const [showFilters, setShowFilters] = useState(false);

  if (!showFilters) {
    return (
      <Button
        onClick={() => setShowFilters(true)}
        variant="outline"
        className="bg-background-600 border border-background-500 gap-2"
      >
        <ListFilterIcon size={16} />
        {columnFilters.length === 0
          ? "Filter"
          : `${columnFilters.length} filter(s)`}
      </Button>
    );
  }

  return (
    <>
      <Button
        onClick={() => setShowFilters(true)}
        variant="outline"
        className="bg-background-600 border border-background-500 gap-2"
      >
        <ListFilterIcon size={16} />
        {columnFilters.length === 0
          ? "Filter"
          : `${columnFilters.length} filter(s)`}
      </Button>
      <div
        className={
          "fixed h-screen  w-screen bg-black bg-opacity-30 z-20 top-0 left-0"
        }
      >
        <button
          className={
            "fixed h-screen   w-screen bg-black bg-opacity-30 z-20 top-0 left-0"
          }
          onClick={() => setShowFilters(false)}
        ></button>
        <div
          className="fixed min-h-[50vh] gap-2 overflow-y-scroll bg-background-700  flex flex-col rounded border border-background-600  shadow-lg  w-full transform z-40 overflow-hidden p-2
            left-1/2 top-1/2 max-w-2xl -translate-x-1/2 -translate-y-1/2
            "
        >
          {columns
            .filter((c) => c.getCanFilter())
            .map((column: any, index: number) => (
              <div
                key={index}
                className="flex items-center w-full  flex-shrink-0 gap-2 rounded pl-2 border border-background-500    bg-background-600"
              >
                <span className="text-white text-sm w-44 truncate">
                  {column.columnDef.header()}
                </span>
                <ColumnFilterInput
                  column={column}
                  columnFilter={columnFilters.find((c) => c.id === column.id)}
                  updateColumnFilter={(value) =>
                    setColumnFilters([
                      ...columnFilters.filter((c) => c.id !== column.id),
                      ...value,
                    ])
                  }
                />
              </div>
            ))}
          <Button
            disabled={columnFilters.length === 0}
            className={"bg-lp-400"}
            onClick={() => {
              setColumnFilters([]);
              setShowFilters(false);
            }}
          >
            {columnFilters.length === 0 ? "No filters" : "Clear filters"}
          </Button>
        </div>
      </div>
    </>
  );
}

interface ColumnFilterInputProps<TData> {
  column: Column<TData, unknown>;
  columnFilter: any;
  updateColumnFilter: (value: ColumnFiltersState) => void;
}

function ColumnFilterInput<TData>({
  column,
  columnFilter,
  updateColumnFilter,
}: ColumnFilterInputProps<TData>) {
  const [value, setValue] = useState(columnFilter?.value ?? "");

  return (
    <Input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => {
        updateColumnFilter([{ id: column.id, value }]);
      }}
      className="w-full min-h-none h-fit border shadow rounded"
    />
  );
}
