"use client";

import { DataTable } from "./data-table";
import { ColumnDef } from "@tanstack/react-table";
import {
  createColumns,
  FormFields,
  populateReferenceMap,
  ReferenceMap,
} from "@/app/portal/admin/forms/[id]/submissions/columns";
import useApplicantPopover from "@/components/forms/applications/applicantPopover";
import { useContext } from "react";
import { formContext } from "@/components/layouts/formTabView";

export type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  refMap: ReferenceMap;
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
  const { members } = useContext(formContext);
  const membersWithLabel = members.map((member) => ({
    ...member,
    label: member.display_name || member.email,
  }));
  const refMap = populateReferenceMap(formFields, [
    { id: "members", options: membersWithLabel, label: "members" },
  ]);
  const columns = createColumns(formFields, members, setAndOpen);

  return (
    <div>
      {applicantPopover}
      <DataTable columns={columns} data={fieldData} refMap={refMap} />
    </div>
  );
}
