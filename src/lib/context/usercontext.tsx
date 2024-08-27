"use client";

import React from "react";
//@ts-expect-error: The type definitions for @supabase/auth-js exists but the IDE is not able to find it
import { User } from "@supabase/auth-js";

type UserContext = {
  user: User;
  userMetadata: { [key: string]: any } | null;
};

export const userContext = React.createContext({} as UserContext);

export function UserContextProvider({
  children,
  user,
  userMetadata,
}: {
  children: React.ReactNode;
  user: User;
  userMetadata: { [key: string]: any } | null;
}) {
  return (
    <userContext.Provider
      value={{
        user: user,
        userMetadata: userMetadata,
      }}
    >
      {children}
    </userContext.Provider>
  );
}
