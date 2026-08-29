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
import { Fragment, useCallback, useContext, useMemo, useState } from "react";
import { formContext } from "@/components/layouts/formTabView";
import { bulkUpdateSubmissionField } from "@/app/portal/admin/actions";
import { toast } from "sonner";

export type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  refMap: ReferenceMap;
  config: any;
  onRowClick?: (row: any) => void;
  onVisibleRowsChange?: (rows: any[]) => void;
  onBulkUpdate?: (ids: string[], field: string, value: any) => Promise<any>;
};

type DataTableWrapperProps<TData> = {
  data: TData[];
  formFields: FormFields;
};

export default function DataTableWrapper<TData>({
  data,
  formFields,
}: DataTableWrapperProps<TData>) {
  const [visibleRows, setVisibleRows] = useState<any[]>([]);
  const { setAndOpen, applicantPopover } = useApplicantPopover({
    fields: formFields,
    rows: visibleRows,
  });
  const { members, rawForm } = useContext(formContext);
  const membersWithLabel = useMemo(
    () =>
      members.map((member) => ({
        ...member,
        label: member.display_name || member.email,
      })),
    [members],
  );
  const refMap = populateReferenceMap(formFields, [
    { id: "members", options: membersWithLabel, label: "members" },
  ]);
  const handleVisibleRows = useCallback((rows: any[]) => {
    setVisibleRows(rows);
  }, []);

  const handleBulkUpdate = useCallback(
    (ids: string[], field: string, value: any) => {
      return bulkUpdateSubmissionField(ids, field, value)
        .then((count) => {
          toast.success(
            `Updated ${count} applicant${count === 1 ? "" : "s"}`,
          );
        })
        .catch(() => {
          toast.error("Bulk update failed");
          throw new Error("bulk update failed");
        });
    },
    [],
  );

  // Flag duplicate applications (same email or GitHub username)
  const markedData = useMemo(() => {
    const emailCounts: Record<string, number> = {};
    const githubCounts: Record<string, number> = {};
    (data as any[]).forEach((row) => {
      if (row.email) {
        const key = row.email.toString().toLowerCase();
        emailCounts[key] = (emailCounts[key] || 0) + 1;
      }
      if (row.github_username) {
        const key = row.github_username.toString().toLowerCase();
        githubCounts[key] = (githubCounts[key] || 0) + 1;
      }
    });
    return (data as any[]).map((row) => {
      const dupEmail =
        row.email && emailCounts[row.email.toString().toLowerCase()] > 1;
      const dupGithub =
        row.github_username &&
        githubCounts[row.github_username.toString().toLowerCase()] > 1;
      return {
        ...row,
        __duplicate: !!(dupEmail || dupGithub),
      };
    });
  }, [data]);

  // Status chips = configured options + "submitted" + any status in the data
  const statusOptions = useMemo(() => {
    const configured = formFields["status"]?.options?.filter((o) => o.id) || [];
    const labelMap: Record<string, string> = {};
    configured.forEach((o) => {
      labelMap[o.id] = o.label;
    });
    const ids = new Set<string>(["submitted"]);
    configured.forEach((o) => ids.add(o.id));
    (data as any[]).forEach((row) => {
      if (row.status) ids.add(row.status);
    });
    return [...ids].map((id) => ({
      id,
      label:
        labelMap[id] ||
        id.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    }));
  }, [formFields, data]);

  const columns = createColumns(formFields, members, setAndOpen);
  const config = {
    title: rawForm?.title,
    view: {
      showFilter: true,
      showChart: true,
    },
    statusOptions,
    reviewerOptions: membersWithLabel,
    bulkFields: [
      {
        id: "reviewer_id",
        label: "Reviewer",
        options: membersWithLabel,
      },
      {
        id: "interviewer_id",
        label: "Interviewer",
        options: membersWithLabel,
      },
      {
        id: "level",
        label: "Level",
        options: formFields["level"]?.options || [],
      },
    ],
    compareFields: formFields,
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
      "select",
      "__duplicate",
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
        columns={columns as ColumnDef<any, any>[]}
        data={markedData as unknown as (string | number)[]}
        refMap={refMap}
        config={config}
        onRowClick={(row) => setAndOpen({ applicant: row })}
        onVisibleRowsChange={handleVisibleRows}
        onBulkUpdate={handleBulkUpdate}
      />
    </Fragment>
  );
}
