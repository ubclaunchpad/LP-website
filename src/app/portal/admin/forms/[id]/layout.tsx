import React from "react";

export default async function Layout({
  children,
}: {
  params: { id: string };
  children: React.ReactNode;
}) {
  return <div className="flex flex-col gap-4 flex-1 w-full ">{children}</div>;
}
