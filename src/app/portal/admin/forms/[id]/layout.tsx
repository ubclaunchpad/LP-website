import React from "react";
import FormTabView, { Tab } from "@/components/layouts/formTabView";
import { getAdminMembers, getAllFormDetails } from "@/app/portal/admin/actions";

export default async function Layout({
  params,
  children,
}: {
  params: { id: string };
  children: React.ReactNode;
}) {
  const formId = BigInt(params.id);
  const formDetails = await getAllFormDetails(formId);
  const members = ((await getAdminMembers()) || []) as any[];
  const tabs: Tab[] = [
    {
      label: "Submissions",
      route: `/portal/admin/forms/${params.id}/submissions`,
    },
  ];

  return (
    <FormTabView tabs={tabs} form={formDetails} members={members}>
      {children}
    </FormTabView>
  );
}
