import React from "react";
import SpaceBackground from "@/components/forms/launch/spaceBackground";

type GenericGreeterProps = {
  children: React.ReactNode;
  includeStyle?: boolean;
  spaceBg?: "none" | "scene" | "dim";
};

export default function GenericGreeter({
  children,
  includeStyle = true,
  spaceBg = "none",
}: GenericGreeterProps) {
  return (
    <React.Fragment>
      {spaceBg !== "none" && <SpaceBackground dim={spaceBg === "dim"} />}
      {includeStyle ? (
        <div className="text-4xl flex-col flex flex-1 gap-6 w-full overflow-hidden lg:pt-10 justify-center items-center relative">
          <div
            className={
              "z-40 border-background-600 h-full overflow-y-scroll max-h-[90svh] p-4 xl:p-10 rounded-xl flex-col w-full flex gap-10 justify-center items-center"
            }
          >
            {children}
          </div>
        </div>
      ) : (
        <div className="z-40 w-full flex-1 flex flex-col justify-center lg:p-10 py-10">
          <div className={"flex flex-col gap-10 justify-center flex-1 items-center"}>
            {children}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
