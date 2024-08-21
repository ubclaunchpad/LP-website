"use client";

import React from "react";
import { redirect } from "next/navigation";
//@ts-expect-error: The type definitions for @supabase/auth-js exists but the IDE is not able to find it
import { User } from "@supabase/auth-js";

type UserContext = {
  user: User;
};

export const userContext = React.createContext({} as UserContext);

export function UserContextProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User;
}) {
  if (!user) {
    redirect("/portal/auth");
  }

  return (
    <userContext.Provider
      value={{
        user: user,
      }}
    >
      {children}
    </userContext.Provider>
  );
}
