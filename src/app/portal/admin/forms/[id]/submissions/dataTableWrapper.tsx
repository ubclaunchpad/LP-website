"use client";

import { DataTable } from "./data-table";
import { ColumnDef } from "@tanstack/react-table";
import {
  createColumns, FormFields,
} from "@/app/portal/admin/forms/[id]/submissions/columns";

export type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
};

type DataTableWrapperProps<TData> = {
  data: TData[];
  formFields: FormFields;
};


export default function DataTableWrapper<TData>({
  data,
 formFields
}: DataTableWrapperProps<TData>) {
  const fieldData = data as unknown as (string | number)[];
  const columns = createColumns(formFields);
  return <DataTable columns={columns} data={fieldData} />;
}
