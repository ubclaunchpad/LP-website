import React, { Suspense } from "react";
import { UserContextProvider } from "@/lib/context/usercontext";
import { redirect } from "next/navigation";
import PortalNavbar from "@/components/portal/portalNav";
import { createClient } from "@/lib/utils/supabase/server";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (!data.user || error) {
    redirect("/portal/auth");
  }

  return (
    <UserContextProvider user={data.user}>
      <div className="w-screen min-h-screen bg-background-900 relative flex flex-col overflow-x-hidden ">
        <PortalNavbar />
        <Suspense>{children}</Suspense>
      </div>
    </UserContextProvider>
  );
}
