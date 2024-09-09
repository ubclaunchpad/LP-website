import Link from "next/link";
import Image from "next/image";
import React from "react";

type GenericGreeterProps = {
  children: React.ReactNode;
  includeStyle?: boolean;
};

export default function GenericGreeter({
  children,
  includeStyle = true,
}: GenericGreeterProps) {
  return (
    <div className="w-screen h-screen max-w-screen max-h-screen bg-primary overflow-hidden fixed flex justify-center items-center">
      <div className={"fixed space-flow top-0 left-0 w-screen h-screen"}>
        <div className={"w-[300px]  h-[300px] absolute  right-10 top-0"}>
          <Image
            src={"/images/assets/planet1.svg"}
            alt={"planet"}
            layout={"fill"}
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className={"w-[267px] h-[200px] absolute  left-40 bottom-10"}>
          <Image
            src={"/images/assets/planet2.svg"}
            alt={"planet"}
            layout={"fill"}
            style={{ objectFit: "contain" }}
          />
        </div>
        <Image
          src={"/images/assets/starsBg.svg"}
          alt={"planet"}
          layout={"fill"}
          style={{ objectFit: "cover" }}
        />
      </div>
      {includeStyle ? (
        <div className="text-4xl flex-col flex gap-6 justify-center items-center">
          <div
            className={
              "  z-40 border-background-600  p-10 rounded-xl flex-col w-full max-w-4xl flex gap-10 justify-center items-center"
            }
          >
            {children}
          </div>
        </div>
      ) : (
        <div
          className={
            "z-40  w-full h-full flex flex-col justify-center lg:p-10 py-10 bg-black bg-opacity-80"
          }
        >
          <div
            className={
              "flex flex-col gap-10 justify-center flex-1 items-center"
            }
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
