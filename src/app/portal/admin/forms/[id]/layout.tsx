import React from "react";
import { redirect } from "next/navigation";
import TabView, { Tab } from "@/components/layouts/tabView";
import { createClient } from "@/lib/utils/supabase/server";
import { headers } from "next/headers";

export default async function Layout({
  params,
  children,
}: {
  params: { id: string };
  children: React.ReactNode;
}) {
  const headerList = headers();
  const pathname = headerList.get("x-current-path")!;
  const subPath = null; // pathname.split("/").pop()?.split("?")[0];
  const supabase = createClient();
  const tabs: Tab[] = [
    {
      label: "Questions",
      route: `/portal/admin/forms/${params.id}/questions`,
    },
    {
      label: "Submissions",
      route: `/portal/admin/forms/${params.id}/submissions`,
    },
    {
      label: "Settings",
      route: `/portal/admin/forms/${params.id}/settings`,
    },
  ];

  const { data, error } = await supabase.auth.getUser();

  if (!data.user || error) {
    redirect("/portal/auth");
  }

  return <TabView tabs={tabs}>{children}</TabView>;
}
