"use client";

import React from "react";
//@ts-expect-error: The type definitions for @supabase/auth-js exists but the IDE is not able to find it
import { User } from "@supabase/auth-js";

type UserContext = {
  user: User;
  userMetadata: UserMetadata;
};

export const userContext = React.createContext({} as UserContext);

type UserMetadata = {
  [key: string]: any;
  member?: {
    team_members: {
      member_id: string;
      team_id: bigint;
      joined_on: Date | null;
      role: string | null;
    }[];
  };
};

export function UserContextProvider({
  children,
  user,
  userMetadata,
}: {
  children: React.ReactNode;
  user: User;
  userMetadata: UserMetadata;
}) {
  return (
    <userContext.Provider
      value={{
        user: user,
        userMetadata: userMetadata ? userMetadata : {},
      }}
    >
      {children}
    </userContext.Provider>
  );
}
