"use client";
import DataTableWrapper from "@/app/portal/admin/forms/[id]/submissions/dataTableWrapper";
import { useContext } from "react";
import { formContext } from "@/components/layouts/formTabView";

export default function FormSubmissionsPage() {
  const { formFields, submissions } = useContext(formContext);
  return (
    <div className="overflow-hidden flex flex-col max-w-screen pb-32 py-1">
      <div
        className={"flex p-2 px-10 justify-between items-center gap-2"}
      ></div>

      <DataTableWrapper data={submissions} formFields={formFields} />
    </div>
  );
}
