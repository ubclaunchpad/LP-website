import React, { Suspense } from "react";
import PortalNavbar from "@/components/portal/portalNav";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen min-h-screen max-w-screen  bg-background-900 relative flex flex-col overflow-x-hidden ">
      <PortalNavbar />
      <Suspense>{children}</Suspense>
    </div>
  );
}
