"use client";
import React, { useEffect } from "react";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { redirect } from "next/navigation";

type User = {
  email: string;
  name: string;
  role: "default" | "developer" | "designer" | "exec";
  username: string;
  id: string;
  avatar: string;
};

type UserContext = {
    user: User;
}

export const userContext = React.createContext({} as UserContext);

export function UserContextProvider({
  children,
  authCookie,
}: {
  children: React.ReactNode;
  authCookie: RequestCookie;
}) {
  const [user, setUser] = React.useState<UserContext | null | undefined>(undefined);

  async function getUser() {
    try {
      const user = JSON.parse(authCookie.value);
      setUser({ user: user.model });
    } catch (error) {
      setUser(null);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  if (user === undefined) {
    return <div></div>;
  }

  if (!user) {
    redirect("/portal/auth");
  }

  return <userContext.Provider value={user}>{children}</userContext.Provider>;
}
