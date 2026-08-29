"use client";

import { DataTable } from "./data-table";
import { ColumnDef } from "@tanstack/react-table";
import {
  createColumns,
  FormFields,
  populateReferenceMap,
  ReferenceMap,
} from "@/components/forms/applications/columns";
import useApplicantPopover from "@/components/forms/applications/applicantPopover";
import { Fragment, useContext } from "react";
import { formContext } from "@/components/layouts/formTabView";

export type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  refMap: ReferenceMap;
  config: any;
  onRowClick?: (row: any) => void;
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
  const { members, rawForm } = useContext(formContext);
  const membersWithLabel = members.map((member) => ({
    ...member,
    label: member.display_name || member.email,
  }));
  const refMap = populateReferenceMap(formFields, [
    { id: "members", options: membersWithLabel, label: "members" },
  ]);
  const columns = createColumns(formFields, members, setAndOpen);
  const config = {
    title: rawForm?.title,
    view: {
      showFilter: true,
      showChart: true,
    },
    statusOptions: formFields["status"]?.options,
    analytics: {
      columns: [
        "status",
        "team_id",
        "level",
        "role",
        "reviewer_id",
        "interviewer_id",
        "year",
        "faculty",
        "specialization",
        "graduationYear",
        "lp-team",
      ],
    },
    columnOrder: [
      "popover",
      "status",
      "team_id",
      "notified_on",
      "level",
      "reviewer_id",
      "interviewer_id",
      "email",
      "student email",
      "role",
    ],
  };

  return (
    <Fragment>
      {applicantPopover}
      <DataTable
        columns={columns}
        data={fieldData}
        refMap={refMap}
        config={config}
        onRowClick={(row) => setAndOpen({ applicant: row })}
      />
    </Fragment>
  );
}
