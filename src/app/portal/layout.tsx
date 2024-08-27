import React, { Suspense } from "react";
import { UserContextProvider } from "@/lib/context/usercontext";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/utils/supabase/server";
import { db } from "@/db";

async function getUserMetadata(id: string) {
  return db.roles.findUnique({
    where: {
      id: id,
    },
  });
}

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

  const userMetadata = await getUserMetadata(data.user.id);

  return (
    <Suspense>
      <UserContextProvider user={data.user} userMetadata={userMetadata}>
        {children}
      </UserContextProvider>
    </Suspense>
  );
}