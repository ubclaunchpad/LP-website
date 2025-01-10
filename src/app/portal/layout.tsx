import React, { Suspense } from "react";
import { UserContextProvider } from "@/lib/context/usercontext";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/utils/supabase/server";
import { db } from "@/db";
import { Toaster } from "@/components/primitives/sonner";
import { LPContextProvider } from "@/lib/context/LPContext";

async function getUserMetadata(id: string) {
  const rolesP = db.roles.findUnique({
    where: {
      id: id,
    },
  });
  const memberP = db.members.findUnique({
    where: {
      id: id,
    },
    include: {
      team_members: {
        include: {
          teams: true,
        },
      },
    },
  });
  const [roles, member] = await Promise.all([rolesP, memberP]);
  return {
    roles: roles?.roles,
    member: member,
  };
}

async function getLPData() {
  const teams = await db.teams.findMany({});
  return {
    teams: teams.reduce((acc, team) => {
      acc[team.id] = team;
      return acc;
    }, {}),
  };
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (!data.user || error) {
    redirect("/auth");
  }

  const userMetadata = await getUserMetadata(data.user.id);
  const lpData = await getLPData();

  return (
    <Suspense>
      <LPContextProvider data={lpData}>
        <UserContextProvider user={data.user} userMetadata={userMetadata}>
          <Toaster position={"top-right"} />
          {children}
        </UserContextProvider>
      </LPContextProvider>
    </Suspense>
  );
}
