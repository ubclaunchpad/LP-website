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
  getPaginationRowModel,
  Column,
  RowData,
  SortingState,
} from "@tanstack/react-table";
import { json2csv } from "json-2-csv";
import { Button } from "@/components/primitives/button";
import { Input } from "@/components/primitives/input";

import { Table, TableCell, TableRow } from "@/components/primitives/table";
import React, { CSSProperties, Fragment, useMemo, useState } from "react";
import {
  ChartArea,
  ChevronLeftIcon,
  ChevronRightIcon,
  ListFilterIcon,
  SearchIcon,
  TableIcon,
} from "lucide-react";
import { DataTableProps } from "@/components/forms/applications/dataTableWrapper";
import AnalyticsPage from "@/components/forms/applications/AnalyticsPage";
import {
  FormFields,
  ReferenceItem,
  ReferenceMap,
  STATUS_COLORS,
} from "@/components/forms/applications/columns";
import MultiSelect from "@/components/general/multiSelect";

const getCommonPinningStyles = (column: Column<Person>): CSSProperties => {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === "left" && column.getIsLastColumn("left");
  const isFirstRightPinnedColumn =
    isPinned === "right" && column.getIsFirstColumn("right");

  return {
    boxShadow: undefined,
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    opacity: isPinned ? 0.95 : 1,
    // position: isPinned ? "sticky" : "relative",
    width: column.getSize(),
    // zIndex: isPinned ? 1 : 0,
  };
};

export function DataTable<TData, TValue>({
  columns,
  data,
  refMap,
  config,
  onRowClick,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 50,
  });
  const [tabView, setTabView] = useState<"table" | "chart">("table");

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(), // client-side faceting
    getFacetedUniqueValues: getFacetedUniqueValues(), // generate unique values for select filter/autocomplete
    getFacetedMinMaxValues: getFacetedMinMaxValues(), // generate min/max values for range filter
    debugColumns: false,
    enableColumnFilters: true,
    state: {
      // columnPinning: {
      //   left: ["popover"],
      // },
      columnFilters,
      columnVisibility,
      sorting,
      globalFilter,
      pagination,
      ...(config?.columnOrder ? { columnOrder: config.columnOrder } : {}),
    },
  });

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    (config?.statusOptions || []).forEach((option: any) => {
      counts[option.id] = 0;
    });
    table
      .getCoreRowModel()
      .rows.forEach((row) => {
        const status = (row.original as any)?.status;
        if (status && status in counts) {
          counts[status] += 1;
        } else if (status) {
          counts[status] = (counts[status] || 0) + 1;
        }
      });
    return counts;
  }, [config?.statusOptions, table]);

  const activeStatusFilter = columnFilters.find((c) => c.id === "status")
    ?.value as string | undefined;

  function toggleStatusFilter(statusId: string) {
    const isActive = activeStatusFilter === statusId;
    setColumnFilters([
      ...columnFilters.filter((c) => c.id !== "status"),
      ...(isActive ? [] : [{ id: "status", value: statusId }]),
    ]);
  }

  function handleRowClick(e: React.MouseEvent, row: any) {
    if (!onRowClick) return;
    const target = e.target as HTMLElement;
    if (target.closest("button, input, textarea, select, a, [role=combobox]")) {
      return;
    }
    onRowClick(row);
  }

  return (
    <div className={"flex flex-col px-10 overflow-hidden  pb-4"}>
      <div className="flex items-center w-full gap-2 py-4  flex-wrap">
        <div className="flex items-center flex-1 p-2 gap-2">
          <span className="text-lg font-bold">
            {table.getFilteredRowModel().rows.length} {"Results"}
          </span>
        </div>

        <Input
          placeholder="Search applicants..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="w-64 h-10 bg-background-600 border-background-500"
        />

        {config?.statusOptions?.length > 0 && (
          <div className="flex items-center gap-1 flex-wrap">
            {(config.statusOptions as any[]).map((option) => {
              const count = statusCounts[option.id] || 0;
              const active = activeStatusFilter === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => toggleStatusFilter(option.id)}
                  className={`rounded-full px-3 py-1 text-xs border transition-colors ${
                    active
                      ? "border-lp-400 bg-lp-500 text-white"
                      : "border-background-500 bg-background-600 text-neutral-200 hover:border-background-400"
                  }`}
                >
                  {option.label}
                  <span className="ml-1 opacity-70">{count}</span>
                </button>
              );
            })}
          </div>
        )}

        <div
          className={
            "flex relative items-center bg-background-600 rounded-lg border-background-500 border-none h-10 p-1  gap-2"
          }
        >
          <Button
            onClick={() => {
              setTabView("table");
            }}
            size={"fit"}
            className={`bg-background-600 w-24 h-full min-h-none gap-2 border-none ${tabView === "table" ? "bg-background-500" : ""}`}
          >
            <TableIcon className={"h-4 w-4"} />
            Table
          </Button>
          {config.view?.showChart && (
            <Button
              onClick={() => {
                setTabView("chart");
              }}
              size={"fit"}
              className={`bg-background-600 w-24 h-full   border-none border-background-500 gap-2 ${tabView === "chart" ? "bg-background-500" : ""}`}
            >
              <ChartArea className={"h-4 w-4"} />
              Chart
            </Button>
          )}
        </div>
        {config.view?.showFilter && (
          <TableFilter
            refMap={refMap}
            columns={
              table.getAllColumns() as unknown as Column<unknown, unknown>[]
            }
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
          />
        )}
        <DownloadCSV
          data={table.getFilteredRowModel().rows.map((row) => row.original)}
          fileName={config?.title || "submissions"}
        />
      </div>
      {table.getFilteredRowModel().rows.length > 0 && tabView === "chart" && (
        <AnalyticsPage
          columns={config.analytics.columns}
          refMap={refMap}
          submissions={table
            .getFilteredRowModel()
            .rows.map((row) => row.original)}
        />
      )}
      {tabView === "table" && (
        <div className="rounded-md border shadow-sm overflow-auto min-h-0 border-background-500 ">
          <Table className="w-full h-[1px]   ">
            <thead className={" left-0 top-0  "}>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className={"border-background-500 w-full flex-shrink-0"}
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <td
                        key={header.id}
                        className={
                          " flex bg-background-600 text-xs flex-col   w-fit flex-shrink-0  border-background-500  font-semibold  justify-center  overflow-hidden line-clamp-2  text-ellipsis"
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
            <tbody className={" overflow-auto "}>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    className={
                      "border-background-500 p-0 flex-shrink-0 w-full  bg-background-600 odd:bg-background-700 hover:bg-background-500 cursor-pointer transition-colors"
                    }
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={(e) => handleRowClick(e, row)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className={"  h-full text-xs  flex-shrink-0   w-fit  "}
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
      {tabView === "table" && (
        <Fragment>
          <div className="flex items-center gap-3 py-2 text-sm text-neutral-300">
            <Button
              size={"fit"}
              className="bg-background-600 min-h-none h-8 gap-1"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeftIcon className="h-4 w-4" />
              Prev
            </Button>
            <span>
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount() || 1}
            </span>
            <Button
              size={"fit"}
              className="bg-background-600 min-h-none h-8 gap-1"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <select
              className="bg-background-600 border border-background-500 rounded p-1 h-8"
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                const size =
                  e.target.value === "all"
                    ? table.getFilteredRowModel().rows.length || 1
                    : Number(e.target.value);
                table.setPageSize(size);
              }}
            >
              {[25, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {size} / page
                </option>
              ))}
              <option value="all">All</option>
            </select>
          </div>
        </Fragment>
      )}
    </div>
  );
}

function TableFilter({
  columns,
  columnFilters,
  setColumnFilters,
  refMap,
}: {
  columns: Column<RowData, unknown>[];
  columnFilters: ColumnFiltersState;
  setColumnFilters: (value: ColumnFiltersState) => void;
  refMap: ReferenceMap;
}) {
  const [showFilters, setShowFilters] = useState(false);

  const groupColumnsByType = useMemo(() => {
    return columns.reduce(
      (acc, column) => {
        if (
          !column.columnDef ||
          !column.columnDef.meta ||
          !column.columnDef.meta.field ||
          !column.columnDef.meta.field.type
        ) {
          return acc;
        }
        const type = column.columnDef.meta.field.type;
        if (!acc[type]) {
          acc[type] = [];
        }

        acc[type].push(column);

        return acc;
      },
      {} as Record<string, Column<RowData, unknown>[]>,
    );
  }, [columns]);

  if (!showFilters) {
    return (
      <Button
        onClick={() => setShowFilters(true)}
        variant="outline"
        size={"fit"}
        className="bg-background-600 w-24 h-10 min-h-none gap-2 border-none"
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
          "fixed h-dvh flex justify-center items-center  w-dvw bg-black bg-opacity-30 z-40 top-0 left-0"
        }
      >
        <div
          className=" min-h-screen gap-3  items-center justify-center static overflow-y-scroll  w-screen flex flex-col pointer-events-none  transform  overflow-hidden p-2
            left-0 top-0
            "
        >
          <div className="flex z-50  flex-col max-h-screen overflow-y-scroll items-center p-4 w-full justify-between gap-2  pb-2 px-4 max-w-2xl rounded border border-background-600 bg-background-700 pointer-events-auto  shadow-lg">
            <h3 className="text-lg w-full text-left pb-4 font-semibold">
              Filters
            </h3>
            {Object.values(groupColumnsByType).map((columns, groupIndex) => (
              <div className="py-2 w-full" key={groupIndex}>
                {columns
                  .filter((c) => c.getCanFilter())
                  .map((column, columnIndex) => (
                    <div
                      key={column.id}
                      className="flex items-center w-full flex-shrink-0 gap-2 rounded pl-2 border border-background-500 bg-background-600"
                    >
                      <span className="text-white text-sm w-44 truncate">
                        {column.columnDef.header()}
                      </span>
                      <ColumnFilterInput
                        id={column.columnDef.meta.id}
                        field={column.columnDef.meta.field}
                        refItem={
                          (typeof refMap[column.columnDef.meta.id] === "string"
                            ? refMap[refMap[column.columnDef.meta.id] as string]
                            : refMap[column.columnDef.meta.id]) as
                            | ReferenceItem
                            | undefined
                        }
                        column={column}
                        columnFilter={columnFilters.find(
                          (c) => c.id === column.id,
                        )}
                        updateColumnFilter={(value) =>
                          setColumnFilters([
                            ...columnFilters.filter((c) => c.id !== column.id),
                            ...value,
                          ])
                        }
                      />
                    </div>
                  ))}
              </div>
            ))}

            <div className="flex items-end justify-between w-full flex-1 gap-2 pt-4">
              <Button
                disabled={columnFilters.length === 0}
                className={"bg-lp-400 max-w-md w-full"}
                onClick={() => {
                  setColumnFilters([]);
                  setShowFilters(false);
                }}
              >
                {columnFilters.length === 0 ? "No filters" : "Clear filters"}
              </Button>
              <Button
                className={"bg-background-500 max-w-md w-full"}
                onClick={() => {
                  setShowFilters(false);
                }}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

interface ColumnFilterInputProps<TData> {
  column: Column<TData, unknown>;
  columnFilter: any;
  updateColumnFilter: (value: ColumnFiltersState) => void;
  refItem: ReferenceItem | undefined;
  field: FormFields[keyof FormFields];
  id: string;
}

function ColumnFilterInput<TData>({
  column,
  field,
  columnFilter,
  refItem,
  updateColumnFilter,
}: ColumnFilterInputProps<TData>) {
  const [value, setValue] = useState(columnFilter?.value ?? "");

  if ((field.type === "person" || field.type === "select") && refItem) {
    const options: { label: string; value: string }[] = refItem
      ? Object.values(refItem).map((item: any) => ({
          label: item.label,
          value: item.id,
        }))
      : [];

    return (
      <>
        <MultiSelect
          allowMultiple={false}
          options={options}
          value={[value]}
          onChange={(e) => {
            setValue(e ? e[0] : "");
          }}
          onBlur={() => {
            updateColumnFilter([{ id: column.id, value }]);
          }}
        />
      </>
    );
  }

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

const DownloadCSV = ({ data, fileName }) => {
  const downloadCSV = () => {
    const csvData = json2csv(data, { expandArrayObjects: true });
    const blob = new Blob([csvData], { type: "text/csv" });
    const csvURL = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = csvURL;
    link.download = `${fileName}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button
      variant={"dark"}
      className="bg-background-600"
      onClick={downloadCSV}
    >
      Download CSV
    </Button>
  );
};
