import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen min-h-screen bg-background-950 justify-center items-center relative flex flex-col ">
      <div className=" w-full flex flex-col flex-1   p-4 justify-center items-center gap-10 z-10 *:z-20">
        {children}
      </div>
    </div>
  );
}
