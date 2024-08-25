"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getFilteredRowModel,
    ColumnFiltersState,
    getPaginationRowModel,
    VisibilityState, getFacetedRowModel, getSortedRowModel, getFacetedUniqueValues, getFacetedMinMaxValues,

} from "@tanstack/react-table"

import {Button} from "@/components/primitives/button";
import { Input } from "@/components/primitives/input"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/primitives/dropdown-menu"


import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/primitives/table"
import React, {useState} from "react";
import {Columns3, FilterIcon, ListFilterIcon, XIcon} from "lucide-react";
import {DataTableProps} from "@/app/portal/admin/forms/[id]/submissions/dataTableWrapper";



export function DataTable<TData, TValue>({
                                             columns,
                                             data,
    fields
                                         }: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        useState<VisibilityState>({})
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(), // client-side faceting
        getFacetedUniqueValues: getFacetedUniqueValues(), // generate unique values for select filter/autocomplete
        getFacetedMinMaxValues: getFacetedMinMaxValues(), // generate min/max values for range filter
        debugTable: true,
        debugHeaders: true,
        debugColumns: false,
        state: {
            columnFilters,
            columnVisibility,
        },
    })



    return (
        <div>
            <div className="flex items-center w-full gap-2 py-4 flex-wrap">
                {/*{table.getHeaderGroups()[0].headers.map((header) => (*/}
                {/*    <div key={header.id} className={"flex items-center  overflow-hidden gap-1 rounded bg-background-700 p-0 py-1 h-fit border border-background-600"}>*/}
                {/*        <p className={" truncate p-1 px-2 text-sm   flex items-center   max-w-[100px]  "}>{header.column.columnDef.header?.toString()}</p>*/}
                {/*        <Filter column={header.column}*/}
                {/*        />*/}
                {/*        <Button*/}
                {/*            // onClick={() => filter.column.setFilterValue("")}*/}
                {/*            variant="ghost"*/}

                {/*            className={"h-fit w-fit p-1 px-2"}*/}
                {/*        >*/}
                {/*            <XIcon className="h-4 w-4" />*/}
                {/*        </Button>*/}

                {/*    </div>*/}
                {/*))}*/}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button  className=" gap-4 bg-background-800 border-background-600 border">
                            <ListFilterIcon className="h-4 w-4" />
                            Filters
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">

                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button  className=" gap-4 bg-background-800 border-background-600 border">
                            <Columns3 className="h-4 w-4" />
                            Columns
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter(
                                (column) => column.getCanHide()
                            )
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border border-background-500 overflow-hidden  ">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}
                                                   className={"w-40 flex flex-col h-fit max-w-40 text-nowrap overflow-hidden overflow-ellipsis"}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}

                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody className={"odd:bg-background-200"}>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className={"w-40  h-fit text-xs max-w-40 overflow-hidden flex-wrap"}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 flex-shrink-0 w-fit text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>


    )
}



function Filter({ column }: { column: any }) {
    const { filterVariant } = column.columnDef.meta ?? {}

    const columnFilterValue = column.getFilterValue()

    const sortedUniqueValues = React.useMemo(
        () =>
            filterVariant === 'range'
                ? []
                : Array.from(column.getFacetedUniqueValues().keys())
                    .sort()
                    .slice(0, 5000),
        [column.getFacetedUniqueValues(), filterVariant]
    )

    return filterVariant === 'range' ? (
        <div>
            <div className="flex space-x-2">
                <DebouncedInput
                    type="number"
                    min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
                    max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
                    value={(columnFilterValue as [number, number])?.[0] ?? ''}
                    onChange={value =>
                        column.setFilterValue((old: [number, number]) => [value, old?.[1]])
                    }
                    placeholder={`Min ${
                        column.getFacetedMinMaxValues()?.[0] !== undefined
                            ? `(${column.getFacetedMinMaxValues()?.[0]})`
                            : ''
                    }`}
                    className="w-24 border shadow rounded"
                />
                <DebouncedInput
                    type="number"
                    min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
                    max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
                    value={(columnFilterValue as [number, number])?.[1] ?? ''}
                    onChange={value =>
                        column.setFilterValue((old: [number, number]) => [old?.[0], value])
                    }
                    placeholder={`Max ${
                        column.getFacetedMinMaxValues()?.[1]
                            ? `(${column.getFacetedMinMaxValues()?.[1]})`
                            : ''
                    }`}
                    className="w-24 border shadow rounded"
                />
            </div>
            <div className="h-1" />
        </div>
    ) : filterVariant === 'select' ? (
        <select
            onChange={e => column.setFilterValue(e.target.value)}
            value={columnFilterValue?.toString()}
        >
            <option value="">All</option>
            {sortedUniqueValues.map(value => (
                //dynamically generated select options from faceted values feature
                <option value={value as string} key={value as string}>
                    {value as string}
                </option>
            ))}
        </select>
    ) : (
        <>
            {/* Autocomplete suggestions from faceted values feature */}
            <datalist id={column.id + 'list'}>
                {sortedUniqueValues.map((value: any) => (
                    <option value={value} key={value} />
                ))}
            </datalist>
            <DebouncedInput
                type="text"
                value={(columnFilterValue ?? '') as string}
                onChange={value => column.setFilterValue(value)}
                placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
                className="w-36 border shadow rounded"
                list={column.id + 'list'}
            />
            <div className="h-1" />
        </>
    )
}


function DebouncedInput({
                            value: initialValue,
                            onChange,
                            debounce = 500,
                            ...props
                        }: {
    value: string | number
    onChange: (value: string | number) => void
    debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
    const [value, setValue] = React.useState(initialValue)

    React.useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value)
        }, debounce)

        return () => clearTimeout(timeout)
    }, [value])

    return (
        <Input {...props} value={value} onChange={e => setValue(e.target.value)} />
    )
}