"use client";
import React from "react";

type LPContent = {
  teams: any[];
};

export const lpContext = React.createContext({} as LPContent);

export function LPContextProvider({
  children,
  data,
}: {
  children: React.ReactNode;
  data: LPContent;
}) {
  return <lpContext.Provider value={data}>{children}</lpContext.Provider>;
}
