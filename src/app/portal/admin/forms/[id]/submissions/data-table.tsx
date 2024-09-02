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
import React, {CSSProperties, useContext, useState} from "react";
import { Columns3, ListFilterIcon, RefreshCcwIcon, XIcon } from "lucide-react";
import { DataTableProps } from "@/app/portal/admin/forms/[id]/submissions/dataTableWrapper";
import { formContext } from "@/components/layouts/formTabView";
import { getAllFormDetails } from "@/app/portal/admin/actions";
import { toast } from "sonner";


const getCommonPinningStyles = (column: Column<any>): CSSProperties => {
  const isPinned = column.getIsPinned()
  const isLastLeftPinnedColumn =
      isPinned === 'left' && column.getIsLastColumn('left')
  const isFirstRightPinnedColumn =
      isPinned === 'right' && column.getIsFirstColumn('right')

  return {
    ...(isLastLeftPinnedColumn ? { borderRight: `1px solid var(--background-500)` } : {}),
    ...(isFirstRightPinnedColumn ? { borderLeft: `1px solid var(--background-500)` } : {}),
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    opacity: isPinned ? 0.95 : 1,
    position: isPinned ? 'sticky' : 'relative',
    width: column.getSize() ? column.getSize() : '300px',
    // zIndex: isPinned ? 1 : 0,
  };
}

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
    // getPaginationRowModel: getPaginationRowModel(),
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
      columnOrder: ['status','level', 'reviewer_id', 'interviewer_id','notes','popover'],
      // columnPinning: {
      //   left: ['status','level', 'reviewer_id', 'interviewer_id','notes','popover'],
      // }
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
                    {typeof column.columnDef.header === "function"
                      ? column.columnDef.header()
                      : column.columnDef.header}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border shadow-sm  border-background-500 overflow-hidden  ">
        <Table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className={"border-background-500"}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <td
                      key={header.id}
                      className={
                        " flex bg-background-600 text-xs flex-col   border-background-500  font-semibold  justify-center  overflow-hidden line-clamp-2  text-ellipsis"
                      }
                        style={{...getCommonPinningStyles(header.column)}}
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
                        style={{...getCommonPinningStyles(cell.column)}}
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
      <div className="flex items-center justify-end space-x-2 py-4">
        {/*<div className="text-sm flex-1 px-2  text-zinc-200">*/}
        {/*  <span>*/}
        {/*    Showing {table.getState().pagination.pageIndex + 1} out of{" "}*/}
        {/*    {table.getPageCount()} pages*/}
        {/*  </span>*/}
        {/*</div>*/}
        {/*<Button*/}
        {/*  variant="outline"*/}
        {/*  size="sm"*/}
        {/*  className={"bg-lp-400"}*/}
        {/*  onClick={() => table.previousPage()}*/}
        {/*  disabled={!table.getCanPreviousPage()}*/}
        {/*>*/}
        {/*  Previous*/}
        {/*</Button>*/}
        {/*<Button*/}
        {/*  variant="outline"*/}
        {/*  size="sm"*/}
        {/*  className={"bg-lp-400"}*/}
        {/*  onClick={() => table.nextPage()}*/}
        {/*  disabled={!table.getCanNextPage()}*/}
        {/*>*/}
        {/*  Next*/}
        {/*</Button>*/}
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
