"use client";
import DataTableWrapper from "@/app/portal/admin/forms/[id]/submissions/dataTableWrapper";
import { useContext } from "react";
import { formContext } from "@/components/layouts/formTabView";

export default function FormSubmissionsPage() {
  const { formFields, submissions } = useContext(formContext);
  return <DataTableWrapper data={submissions} formFields={formFields} />;
}
