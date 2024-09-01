"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  ColumnFiltersState,
  getPaginationRowModel,
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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/primitives/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/primitives/table";
import React, { useContext, useState } from "react";
import { Columns3, ListFilterIcon, RefreshCcwIcon, XIcon } from "lucide-react";
import { DataTableProps } from "@/app/portal/admin/forms/[id]/submissions/dataTableWrapper";
import { formContext } from "@/components/layouts/formTabView";
import { getAllFormDetails } from "@/app/portal/admin/actions";
import { toast } from "sonner";

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [sorting, setSorting] = React.useState<SortingState>([]);

  // const [isRefreshing, setIsRefreshing] = useState(false);

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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
    },
  });

  // const formDetails = useContext(formContext);
  // async function refresh() {
  //   try {
  //     setIsRefreshing(true);
  //     const res = await getAllFormDetails(formDetails.rawForm.id);
  //     setData(res.submissions);
  //     toast.success("Data refreshed");
  //   } catch (e) {
  //     toast.error("Failed to refresh data");
  //   } finally {
  //     setIsRefreshing(false);
  //   }
  // }

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
        {/*<Button*/}
        {/*  disabled={isRefreshing}*/}
        {/*  className=" gap-4 bg-background-600 border border-background-500"*/}
        {/*  onClick={refresh}*/}
        {/*>*/}
        {/*  <RefreshCcwIcon*/}
        {/*    className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}*/}
        {/*  />*/}
        {/*  {isRefreshing ? "Refreshing" : "Refresh"}*/}
        {/*</Button>*/}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className=" gap-4 bg-background-600 border border-background-500">
              <Columns3 className="h-4 w-4" />
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="max-w-[300px] truncate"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.columnDef.header?.toString().slice(0, 30)}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border shadow-sm  border-background-500 overflow-hidden  ">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className={"border-background-500"}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={
                        "w-60 flex bg-background-600 text-xs flex-col  font-semibold  justify-center  overflow-hidden line-clamp-2  text-ellipsis"
                      }
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className={""}>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className={
                    "border-background-500  bg-background-600 odd:bg-background-700"
                  }
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={
                        "w-60  h-fit text-xs min-h-0 left-0 overflow-hidden "
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
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
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-sm flex-1 px-2  text-zinc-200">
          <span>
            Showing {table.getState().pagination.pageIndex + 1} out of{" "}
            {table.getPageCount()} pages
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          className={"bg-lp-400"}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          className={"bg-lp-400"}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
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
          className="fixed min-h-[50vh] gap-2 overflow-y-scroll bg-background-700 gap-1 flex flex-col rounded border border-background-600  shadow-lg  w-full transform z-40 overflow-hidden p-2
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
                  {column.columnDef.header}
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
