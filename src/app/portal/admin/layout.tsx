"use client";
import React, { useContext } from "react";
import { userContext } from "@/lib/context/usercontext";
import { redirect } from "next/navigation";
import { Unauthorized } from "@/components/layouts/inaccessiblePageWrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, userMetadata } = useContext(userContext);
  if (!user) {
    redirect("/portal/auth");
  }
  if (
    !userMetadata ||
    !userMetadata.roles ||
    userMetadata.roles.split(",")[0] !== "admin"
  ) {
    return <Unauthorized />;
  }

  return <div className={"text-white bg-background-800"}>{children}</div>;
}
