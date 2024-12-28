import React, { Suspense } from "react";
import PortalNavbar from "@/components/portal/portalNav";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-dvw h-dvh  bg-background-900 relative flex flex-col overflow-x-hidden overscroll-none ">
      <PortalNavbar />
      <Suspense>{children}</Suspense>
    </div>
  );
}
