import React from "react";
import FormTabView, { Tab } from "@/components/layouts/formTabView";
import { getAllFormDetails } from "@/app/portal/admin/actions";

export default async function Layout({
  params,
  children,
}: {
  params: { id: string };
  children: React.ReactNode;
}) {
  const formId = BigInt(params.id);
  const formDetails = await getAllFormDetails(formId);
  const tabs: Tab[] = [
    {
      label: "Submissions",
      route: `/portal/admin/forms/${params.id}/submissions`,
    },
    {
      label: "Analytics",
      route: `/portal/admin/forms/${params.id}/analytics`,
    },
  ];

  return (
    <FormTabView tabs={tabs} form={formDetails}>
      {children}
    </FormTabView>
  );
}
