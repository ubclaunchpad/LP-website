"use client";
import DataTableWrapper from "@/components/forms/applications/dataTableWrapper";
import { useContext } from "react";
import { formContext } from "@/components/layouts/formTabView";

export default function FormSubmissionsPage() {
  const { formFields, submissions } = useContext(formContext);
  return <DataTableWrapper data={submissions} formFields={formFields} />;
}
