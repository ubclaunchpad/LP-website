"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  ColumnFiltersState,
  VisibilityState,
  RowSelectionState,
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

import { Table } from "@/components/primitives/table";
import React, {
  CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AlertTriangleIcon,
  ChartArea,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  ListFilterIcon,
  ListOrderedIcon,
  LoaderCircleIcon,
  MinusIcon,
  SearchIcon,
  TableIcon,
  UserRoundIcon,
  XIcon,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/primitives/dropdown-menu";
import { cn } from "@/lib/utils/helpers";

// The table uses a fixed layout, so header widths define every column.
const columnWidthStyle = (column: Column<any, unknown>): CSSProperties => ({
  width: column.getSize(),
});

const TOOLBAR_BUTTON =
  "inline-flex h-8 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md border px-2.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lp-400 disabled:pointer-events-none disabled:opacity-50";
const TOOLBAR_IDLE =
  "border-background-500 bg-background-600 text-neutral-200 hover:border-background-400 hover:text-white";
const TOOLBAR_ACTIVE =
  "border-lp-400 bg-[color-mix(in_srgb,var(--lp-500)_18%,transparent)] text-lp-100";
const MENU_ITEM =
  "gap-3 text-xs focus:bg-background-500 data-[state=open]:bg-background-500";
const ALL_VALUE = "__all__";

// Column filters that have their own toolbar control, so the Filters badge
// only counts the ones set through the filter dialog.
const QUICK_FILTER_IDS = ["status", "reviewer_id"];

export function DataTable<TData, TValue>({
  columns,
  data,
  refMap,
  config,
  onRowClick,
  onVisibleRowsChange,
  onBulkUpdate,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 50,
  });
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [tabView, setTabView] = useState<"table" | "chart">("table");
  const [bulkLoading, setBulkLoading] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);

  const columnsWithSelection = [
    {
      id: "select",
      header: ({ table }: any) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          indeterminate={table.getIsSomePageRowsSelected()}
          onChange={() => table.toggleAllPageRowsSelected()}
          label="Select all rows on this page"
        />
      ),
      cell: ({ row }: any) => (
        <Checkbox
          checked={row.getIsSelected()}
          onChange={() => row.toggleSelected()}
          label="Select row"
        />
      ),
      enableColumnFilter: false,
      enableSorting: false,
      meta: { scrollOverflow: false },
      size: 44,
    },
    ...columns,
  ];

  // Config-driven project preference filters. Ranking defs look like
  // { fields: ["firstChoice", ...], projects: [{ value, label }] } and live in
  // the form config so any form can opt in without code changes.
  const rankingCfg = config?.ranking;
  const rankProjects: { value: string; label: string }[] = useMemo(
    () => rankingCfg?.projects || [],
    [rankingCfg],
  );
  const rankFields: string[] = useMemo(
    () => rankingCfg?.fields || [],
    [rankingCfg],
  );
  const rankMax = rankFields.length;
  const [rankingFilters, setRankingFilters] = useState<Record<string, number>>(
    {},
  );

  const rankValues = (row: any, field: string): string[] => {
    const v = row?.[field];
    if (v == null) {
      return [];
    }
    return Array.isArray(v) ? v : [String(v)];
  };

  function setRankingFilter(project: string, top: number) {
    setRankingFilters((prev) => {
      const next = { ...prev };
      if (top > 0) {
        next[project] = top;
      } else {
        delete next[project];
      }
      return next;
    });
  }

  const [duplicatesOnly, setDuplicatesOnly] = useState(false);
  const duplicateCount = useMemo(
    () => (data as any[]).filter((row) => row.__duplicate).length,
    [data],
  );

  // Pre-filter rows to applicants who listed a project within their top N,
  // and to flagged duplicates when that toggle is on.
  const prefilteredData = useMemo(() => {
    const active = Object.entries(rankingFilters).filter(([, t]) => t > 0);
    const useRanking = active.length > 0 && rankFields.length > 0;
    if (!useRanking && !duplicatesOnly) {
      return data;
    }
    return (data as any[]).filter(
      (row) =>
        (!duplicatesOnly || row.__duplicate) &&
        (!useRanking ||
          active.every(([value, top]) =>
            rankFields
              .slice(0, top)
              .some((f) => rankValues(row, f).includes(value)),
          )),
    );
  }, [data, rankingFilters, rankFields, duplicatesOnly]);

  // Per-project counts: total who listed it, plus how many have it in top 1..N.
  const rankingCounts = useMemo(() => {
    const out: Record<string, { total: number; byTop: Record<number, number> }> =
      {};
    rankProjects.forEach((p) => {
      const byTop: Record<number, number> = {};
      for (let n = 1; n <= rankMax; n++) {
        byTop[n] = 0;
      }
      out[p.value] = { total: 0, byTop };
    });
    (data as any[]).forEach((row) => {
      rankProjects.forEach((p) => {
        const idx = rankFields.findIndex((f) =>
          rankValues(row, f).includes(p.value),
        );
        if (idx < 0) {
          return;
        }
        const c = out[p.value];
        c.total += 1;
        for (let n = idx + 1; n <= rankMax; n++) {
          c.byTop[n] += 1;
        }
      });
    });
    return out;
  }, [data, rankFields, rankProjects, rankMax]);

  const table = useReactTable({
    data: prefilteredData,
    columns: columnsWithSelection,
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
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
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
      rowSelection,
      ...(config?.columnOrder ? { columnOrder: config.columnOrder } : {}),
    },
  });

  const visibleRows = table.getFilteredRowModel().rows;
  useEffect(() => {
    onVisibleRowsChange?.(visibleRows as any);
  }, [visibleRows, onVisibleRowsChange]);

  const selectedRows = table.getSelectedRowModel().rows;
  const selectedIds = selectedRows.map((r) => (r.original as any)?.id);

  function handleBulk(field: string, value: string) {
    if (!onBulkUpdate || !value) return;
    setBulkLoading(true);
    Promise.resolve(onBulkUpdate(selectedIds, field, value))
      .then(() => setRowSelection({}))
      .finally(() => setBulkLoading(false));
  }

  function setColumnFilter(columnId: string, value: string | undefined) {
    setColumnFilters((prev) => [
      ...prev.filter((c) => c.id !== columnId),
      ...(value ? [{ id: columnId, value }] : []),
    ]);
  }

  // Counts come from the pre-filtered rows so they track data updates and the
  // preference/duplicate filters, but not the column filters they drive.
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    (config?.statusOptions || []).forEach((option: any) => {
      counts[option.id] = 0;
    });
    (prefilteredData as any[]).forEach((row) => {
      if (row?.status) {
        counts[row.status] = (counts[row.status] || 0) + 1;
      }
    });
    return counts;
  }, [config?.statusOptions, prefilteredData]);

  const reviewerCounts = useMemo(() => {
    const counts: Record<string, number> = { __unassigned__: 0 };
    (prefilteredData as any[]).forEach((row) => {
      const rid = row?.reviewer_id;
      if (!rid) {
        counts.__unassigned__ += 1;
      } else {
        counts[rid] = (counts[rid] || 0) + 1;
      }
    });
    return counts;
  }, [prefilteredData]);

  const activeStatusFilter = columnFilters.find((c) => c.id === "status")
    ?.value as string | undefined;

  const activeReviewerFilter = columnFilters.find(
    (c) => c.id === "reviewer_id",
  )?.value as string | undefined;

  const advancedFilterCount = columnFilters.filter(
    (c) => !QUICK_FILTER_IDS.includes(c.id),
  ).length;

  const hasActiveFilters =
    columnFilters.length > 0 ||
    globalFilter !== "" ||
    duplicatesOnly ||
    Object.keys(rankingFilters).length > 0;

  function clearAllFilters() {
    setColumnFilters([]);
    setGlobalFilter("");
    setRankingFilters({});
    setDuplicatesOnly(false);
  }

  const totalCount = data.length;
  const filteredCount = visibleRows.length;

  function handleRowClick(e: React.MouseEvent, row: any) {
    if (!onRowClick) return;
    const target = e.target as HTMLElement;
    if (
      target.closest(
        "button, input, label, textarea, select, a, [role=combobox]",
      )
    ) {
      return;
    }
    onRowClick(row);
  }

  return (
    <div className={"flex flex-col gap-3 px-4 sm:px-10 overflow-hidden pt-4 pb-4"}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-base font-semibold" aria-live="polite">
          {filteredCount === totalCount ? (
            `${totalCount} ${totalCount === 1 ? "result" : "results"}`
          ) : (
            <>
              {filteredCount}{" "}
              <span className="font-normal text-neutral-400">
                of {totalCount} results
              </span>
            </>
          )}
        </p>
        <div className="relative w-full sm:w-72">
          <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" />
          <Input
            placeholder="Search applicants..."
            aria-label="Search applicants"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="h-9 border-background-500 bg-background-600 pl-8"
          />
        </div>
      </div>

      {config?.statusOptions?.length > 0 && (
        <StatusTabs
          options={config.statusOptions}
          counts={statusCounts}
          total={prefilteredData.length}
          active={activeStatusFilter}
          onChange={(id) => setColumnFilter("status", id)}
        />
      )}

      <div className="flex flex-wrap items-center gap-2">
        {config?.reviewerOptions?.length > 0 && (
          <ReviewerMenu
            options={config.reviewerOptions}
            counts={reviewerCounts}
            total={prefilteredData.length}
            active={activeReviewerFilter}
            onChange={(id) => setColumnFilter("reviewer_id", id)}
          />
        )}
        {rankProjects.length > 0 && rankMax > 0 && (
          <PreferencesMenu
            projects={rankProjects}
            counts={rankingCounts}
            rankMax={rankMax}
            selected={rankingFilters}
            onChange={setRankingFilter}
          />
        )}
        {duplicateCount > 0 && (
          <button
            type="button"
            aria-pressed={duplicatesOnly}
            onClick={() => setDuplicatesOnly((v) => !v)}
            title="Applications that share an email or GitHub username with another application"
            className={cn(
              TOOLBAR_BUTTON,
              duplicatesOnly
                ? "border-amber-400/60 bg-amber-400/15 text-amber-100"
                : TOOLBAR_IDLE,
            )}
          >
            <AlertTriangleIcon className="h-3.5 w-3.5 text-amber-400" />
            Duplicates
            <span className="tabular-nums opacity-70">{duplicateCount}</span>
          </button>
        )}
        {config.view?.showFilter && (
          <TableFilter
            refMap={refMap}
            columns={
              table.getAllColumns() as unknown as Column<unknown, unknown>[]
            }
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
            activeCount={advancedFilterCount}
          />
        )}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearAllFilters}
            className="inline-flex h-8 items-center gap-1 rounded-md px-2 text-xs text-neutral-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lp-400"
          >
            <XIcon className="h-3.5 w-3.5" />
            Clear all
          </button>
        )}

        <div className="ml-auto flex items-center gap-2">
          {config.view?.showChart && (
            <div
              role="group"
              aria-label="View"
              className="flex h-8 items-center rounded-md border border-background-500 bg-background-700 p-0.5"
            >
              <ViewToggleButton
                active={tabView === "table"}
                onClick={() => setTabView("table")}
              >
                <TableIcon className="h-3.5 w-3.5" />
                Table
              </ViewToggleButton>
              <ViewToggleButton
                active={tabView === "chart"}
                onClick={() => setTabView("chart")}
              >
                <ChartArea className="h-3.5 w-3.5" />
                Chart
              </ViewToggleButton>
            </div>
          )}
          <DownloadCSV
            data={table.getFilteredRowModel().rows.map((row) => row.original)}
            fileName={config?.title || "submissions"}
          />
        </div>
      </div>

      {selectedRows.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap bg-background-700 border border-lp-700 rounded-lg p-2 text-sm">
          <span className="font-semibold">{selectedRows.length} selected</span>
          {(config?.bulkFields || []).map((bf: any) => (
            <select
              key={bf.id}
              value=""
              onChange={(e) => {
                if (e.target.value) handleBulk(bf.id, e.target.value);
              }}
              className="bg-background-600 border border-background-500 rounded p-1.5 h-8"
              disabled={bulkLoading}
            >
              <option value="">Set {bf.label}…</option>
              {(bf.options || []).map((o: any) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
          ))}
          {selectedRows.length >= 2 &&
            selectedRows.length <= 4 &&
            onBulkUpdate && (
              <Button
                size="fit"
                className="bg-background-600 min-h-none h-8"
                onClick={() => setCompareOpen(true)}
              >
                Compare
              </Button>
            )}
          <Button
            size="fit"
            className="bg-background-600 min-h-none h-8"
            onClick={() => setRowSelection({})}
          >
            Clear
          </Button>
          {bulkLoading && (
            <LoaderCircleIcon className="w-4 h-4 animate-spin text-lp-400" />
          )}
        </div>
      )}
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
        <div className="min-h-0 overflow-auto rounded-lg border border-background-500">
          <Table
            className="table-fixed border-separate border-spacing-0 text-xs"
            style={{ width: table.getTotalSize(), minWidth: "100%" }}
          >
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      scope="col"
                      className="sticky top-0 z-20 h-10 overflow-hidden border-b border-background-500 bg-background-600 px-3 text-left align-middle text-xs font-medium text-neutral-300"
                      style={columnWidthStyle(header.column)}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    data-state={row.getIsSelected() ? "selected" : undefined}
                    onClick={(e) => handleRowClick(e, row)}
                    className="cursor-pointer bg-background-600 transition-colors odd:bg-background-700 hover:bg-background-500 data-[state=selected]:bg-[color-mix(in_srgb,var(--lp-500)_16%,var(--background-700))]"
                  >
                    {row.getVisibleCells().map((cell) => {
                      const content = flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      );
                      // Overflowing values scroll inside their column, except
                      // in cells whose popups or focus rings the scroller
                      // would clip.
                      const scrollOverflow =
                        (cell.column.columnDef.meta as any)?.scrollOverflow !==
                        false;
                      return (
                        <td key={cell.id} className="px-3 py-1.5 align-middle">
                          {scrollOverflow ? (
                            <div className="max-h-16 overflow-auto [scrollbar-width:thin]">
                              {content}
                            </div>
                          ) : (
                            content
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={table.getVisibleLeafColumns().length}
                    className="px-3 py-12 text-left text-sm text-neutral-400"
                  >
                    No results match the current search or filters.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      )}
      {tabView === "table" && (
        <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-300">
          <button
            type="button"
            className={cn(TOOLBAR_BUTTON, TOOLBAR_IDLE)}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon className="h-3.5 w-3.5" />
            Prev
          </button>
          <span className="px-1 tabular-nums">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount() || 1}
          </span>
          <button
            type="button"
            className={cn(TOOLBAR_BUTTON, TOOLBAR_IDLE)}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
            <ChevronRightIcon className="h-3.5 w-3.5" />
          </button>
          <select
            aria-label="Rows per page"
            className="h-8 rounded-md border border-background-500 bg-background-600 px-2 text-xs"
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
      )}

      {compareOpen && selectedRows.length >= 2 && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-40 flex items-center justify-center p-4"
          onClick={() => setCompareOpen(false)}
        >
          <div
            className="bg-background-800 border border-background-600 rounded-lg p-4 max-w-7xl w-full max-h-[90dvh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-3">
              <h3 className="font-semibold text-lg">
                Comparing {selectedRows.length} applicants
              </h3>
              <button
                onClick={() => setCompareOpen(false)}
                className="rounded p-1 hover:bg-background-600"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>
            <div
              className="grid gap-3"
              style={{
                gridTemplateColumns: `repeat(${selectedRows.length}, minmax(260px, 1fr))`,
              }}
            >
              {selectedRows.map((row) => (
                <ApplicantCompareCard
                  key={row.id}
                  applicant={row.original as any}
                  fields={config?.compareFields || {}}
                  refMap={refMap}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Checkbox({
  checked,
  indeterminate = false,
  onChange,
  label,
}: {
  checked: boolean;
  indeterminate?: boolean;
  onChange: () => void;
  label: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const isMixed = indeterminate && !checked;

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = isMixed;
    }
  }, [isMixed]);

  // The label widens the hit area so a near miss doesn't open the row
  return (
    <label className="-m-2 inline-flex h-8 w-8 cursor-pointer items-center justify-center">
      <span className="relative inline-flex h-4 w-4">
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          onClick={(e) => e.stopPropagation()}
          aria-label={label}
          className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-background-300 bg-background-800 transition-colors hover:border-background-200 checked:border-lp-500 checked:bg-lp-500 indeterminate:border-lp-500 indeterminate:bg-lp-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lp-400 focus-visible:ring-offset-1 focus-visible:ring-offset-background-700"
        />
        <CheckIcon
          strokeWidth={3}
          className="pointer-events-none absolute inset-0 m-auto h-3 w-3 text-white opacity-0 peer-checked:opacity-100"
        />
        <MinusIcon
          strokeWidth={3}
          className="pointer-events-none absolute inset-0 m-auto h-3 w-3 text-white opacity-0 peer-indeterminate:opacity-100"
        />
      </span>
    </label>
  );
}

function StatusTabs({
  options,
  counts,
  total,
  active,
  onChange,
}: {
  options: { id: string; label: string }[];
  counts: Record<string, number>;
  total: number;
  active: string | undefined;
  onChange: (id: string | undefined) => void;
}) {
  // An empty status would only lead to an empty table, so it stays hidden
  // unless it is the active filter.
  const tabs = [
    { id: undefined as string | undefined, label: "All", count: total },
    ...options
      .filter((o) => (counts[o.id] || 0) > 0 || o.id === active)
      .map((o) => ({ id: o.id, label: o.label, count: counts[o.id] || 0 })),
  ];

  return (
    <div
      role="group"
      aria-label="Filter by status"
      className="flex gap-5 overflow-x-auto shadow-[inset_0_-1px_0_var(--background-500)]"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id ?? ALL_VALUE}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              "flex shrink-0 items-baseline gap-1.5 whitespace-nowrap rounded-t-sm border-b-2 px-0.5 pb-2 pt-1 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-lp-400",
              isActive
                ? "border-lp-400 text-white"
                : "border-transparent text-neutral-400 hover:text-neutral-100",
            )}
          >
            {tab.label}
            <span
              className={cn(
                "text-xs tabular-nums",
                isActive ? "text-lp-200" : "text-neutral-500",
              )}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function ReviewerMenu({
  options,
  counts,
  total,
  active,
  onChange,
}: {
  options: { id: string; label: string }[];
  counts: Record<string, number>;
  total: number;
  active: string | undefined;
  onChange: (id: string | undefined) => void;
}) {
  const activeLabel = !active
    ? undefined
    : active === "__unassigned__"
      ? "Unassigned"
      : options.find((o) => o.id === active)?.label ?? "Unknown";
  const withApplicants = options.filter((o) => (counts[o.id] || 0) > 0);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(TOOLBAR_BUTTON, activeLabel ? TOOLBAR_ACTIVE : TOOLBAR_IDLE)}
        >
          <UserRoundIcon className="h-3.5 w-3.5" />
          {activeLabel ? `Reviewer: ${activeLabel}` : "Reviewer"}
          <ChevronDownIcon className="h-3.5 w-3.5 opacity-60" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="max-h-80 w-56 overflow-y-auto"
      >
        <DropdownMenuRadioGroup
          value={active ?? ALL_VALUE}
          onValueChange={(v) => onChange(v === ALL_VALUE ? undefined : v)}
        >
          <DropdownMenuRadioItem value={ALL_VALUE} className={MENU_ITEM}>
            <span className="flex-1">Anyone</span>
            <MenuCount value={total} />
          </DropdownMenuRadioItem>
          {counts.__unassigned__ > 0 && (
            <DropdownMenuRadioItem value="__unassigned__" className={MENU_ITEM}>
              <span className="flex-1">Unassigned</span>
              <MenuCount value={counts.__unassigned__} />
            </DropdownMenuRadioItem>
          )}
          {withApplicants.length > 0 && (
            <DropdownMenuSeparator className="bg-background-500" />
          )}
          {withApplicants.map((o) => (
            <DropdownMenuRadioItem key={o.id} value={o.id} className={MENU_ITEM}>
              <span className="min-w-0 flex-1 truncate">{o.label}</span>
              <MenuCount value={counts[o.id]} />
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function PreferencesMenu({
  projects,
  counts,
  rankMax,
  selected,
  onChange,
}: {
  projects: { value: string; label: string }[];
  counts: Record<string, { total: number; byTop: Record<number, number> }>;
  rankMax: number;
  selected: Record<string, number>;
  onChange: (project: string, top: number) => void;
}) {
  const activeCount = Object.keys(selected).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            TOOLBAR_BUTTON,
            activeCount > 0 ? TOOLBAR_ACTIVE : TOOLBAR_IDLE,
          )}
        >
          <ListOrderedIcon className="h-3.5 w-3.5" />
          Preferences
          {activeCount > 0 && <CountBadge value={activeCount} />}
          <ChevronDownIcon className="h-3.5 w-3.5 opacity-60" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-80 max-w-[calc(100vw-2rem)]"
      >
        <DropdownMenuLabel className="pb-1 text-xs font-normal text-neutral-400">
          Applicants who ranked each project
        </DropdownMenuLabel>
        {projects.map((p) => {
          const top = selected[p.value] || 0;
          const c = counts[p.value] || { total: 0, byTop: {} };
          return (
            <DropdownMenuSub key={p.value}>
              <DropdownMenuSubTrigger
                className={cn(MENU_ITEM, top > 0 && "text-lp-100")}
              >
                <span
                  className="line-clamp-2 min-w-0 flex-1 leading-snug"
                  title={p.label}
                >
                  {p.label}
                </span>
                {top > 0 && (
                  <span className="shrink-0 rounded bg-lp-900 px-1.5 text-[10px] leading-4 text-lp-100">
                    Top {top}
                  </span>
                )}
                <MenuCount value={top > 0 ? c.byTop[top] : c.total} />
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="w-40 border-background-500 bg-background-600">
                  <DropdownMenuRadioGroup
                    value={String(top)}
                    onValueChange={(v) => onChange(p.value, Number(v))}
                  >
                    {Array.from({ length: rankMax + 1 }, (_, n) => (
                      <DropdownMenuRadioItem
                        key={n}
                        value={String(n)}
                        className={MENU_ITEM}
                        // Keep the menu open so several projects can be set
                        onSelect={(e) => e.preventDefault()}
                      >
                        <span className="flex-1">
                          {n === 0 ? "Any rank" : `Top ${n}`}
                        </span>
                        <MenuCount value={n === 0 ? c.total : c.byTop[n]} />
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ViewToggleButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "inline-flex h-full items-center gap-1.5 rounded px-2.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lp-400",
        active
          ? "bg-background-500 text-white"
          : "text-neutral-400 hover:text-neutral-100",
      )}
    >
      {children}
    </button>
  );
}

function MenuCount({ value }: { value: number | undefined }) {
  return (
    <span className="shrink-0 tabular-nums text-neutral-400">{value ?? 0}</span>
  );
}

function CountBadge({ value }: { value: number }) {
  return (
    <span className="rounded bg-lp-500 px-1.5 text-[10px] leading-4 text-white tabular-nums">
      {value}
    </span>
  );
}

function ApplicantCompareCard({
  applicant,
  fields,
  refMap,
}: {
  applicant: any;
  fields: FormFields;
  refMap: ReferenceMap;
}) {
  return (
    <div className="bg-background-700 border border-background-600 rounded-lg p-3 flex flex-col gap-2 text-xs">
      <p className="font-semibold text-sm truncate">
        {applicant.firstName || ""} {applicant.lastName || ""}{" "}
        {(!applicant.firstName && !applicant.lastName && applicant.email) || ""}
      </p>
      {applicant.email && (
        <p className="text-gray-400 truncate">{applicant.email}</p>
      )}
      {Object.entries(fields).map(([key, field]) => {
        const value = applicant[key];
        if (key === "email") return null;
        const display = resolveCompareValue(value, field, refMap);
        return (
          <div key={key} className="border-t border-background-500 pt-1">
            <p className="text-gray-400">{field.label}</p>
            <p
              className={
                key === "status" && value
                  ? `inline-block rounded px-2 py-0.5 ${STATUS_COLORS[value.toString().toLowerCase()] ?? ""}`
                  : ""
              }
            >
              {display}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function resolveCompareValue(value: any, field: any, refMap: ReferenceMap) {
  if (value === null || value === undefined || value === "") {
    return "—";
  }
  const resolveOne = (v: any): string => {
    if (field.type === "person") {
      const membersMap = (refMap as any)?.members;
      return membersMap?.[v]?.label ?? String(v);
    }
    if (field.type === "select") {
      const opt = field.options?.find((o: any) => o.id === v);
      if (opt) return opt.label;
    }
    return String(v);
  };
  if (Array.isArray(value)) {
    return value.map(resolveOne).join(", ");
  }
  return resolveOne(value);
}

function TableFilter({
  columns,
  columnFilters,
  setColumnFilters,
  refMap,
  activeCount,
}: {
  columns: Column<RowData, unknown>[];
  columnFilters: ColumnFiltersState;
  setColumnFilters: (value: ColumnFiltersState) => void;
  refMap: ReferenceMap;
  activeCount: number;
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

  const trigger = (
    <button
      type="button"
      onClick={() => setShowFilters(true)}
      className={cn(
        TOOLBAR_BUTTON,
        activeCount > 0 ? TOOLBAR_ACTIVE : TOOLBAR_IDLE,
      )}
    >
      <ListFilterIcon className="h-3.5 w-3.5" />
      Filters
      {activeCount > 0 && <CountBadge value={activeCount} />}
    </button>
  );

  if (!showFilters) {
    return trigger;
  }

  return (
    <>
      {trigger}
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
                      className="flex flex-col sm:flex-row items-stretch sm:items-center w-full flex-shrink-0 gap-2 rounded pl-2 border border-background-500 bg-background-600 py-2 sm:py-0"
                    >
                      <span className="text-white text-sm w-full sm:w-44 truncate">
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

const DownloadCSV = ({ data, fileName }: { data: any[]; fileName: string }) => {
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
    <button
      type="button"
      onClick={downloadCSV}
      className={cn(TOOLBAR_BUTTON, TOOLBAR_IDLE)}
    >
      <DownloadIcon className="h-3.5 w-3.5" />
      Download CSV
    </button>
  );
};
