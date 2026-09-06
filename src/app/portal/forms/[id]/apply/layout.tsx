import React, { Suspense } from "react";
import GenericGreeter from "@/components/layouts/genericGreeter";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GenericGreeter includeStyle={false} spaceBg="dim">
      <Suspense>{children}</Suspense>
    </GenericGreeter>
  );
}
