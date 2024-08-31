"use client";

import { DataTable } from "./data-table";
import { ColumnDef } from "@tanstack/react-table";
import {
  createColumns,
  FormFields,
} from "@/app/portal/admin/forms/[id]/submissions/columns";
import useApplicantPopover from "@/components/forms/applications/applicantPopover";

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
  formFields,
}: DataTableWrapperProps<TData>) {
  const fieldData = data as unknown as (string | number)[];
  const { setAndOpen, applicantPopover } = useApplicantPopover({
    fields: formFields,
  });
  const columns = createColumns(formFields, setAndOpen);
  return (
    <div>
      {applicantPopover}
      <DataTable columns={columns} data={fieldData} />
    </div>
  );
}
