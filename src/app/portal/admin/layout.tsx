import React from "react";
import { UserContextProvider } from "@/lib/context/usercontext";
import { redirect } from "next/navigation";
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

  return <UserContextProvider user={data.user}>{children}</UserContextProvider>;
}
