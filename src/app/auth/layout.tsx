import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen min-h-screen bg-background-950 justify-center items-center relative flex flex-col ">
      <Link
        href={"/"}
        className={
          "rounded-full absolute  top-0 left-4 transform  border-4 border-primary  z-40"
        }
      >
        <Image
          src="/images/logo_circle.png"
          width={80}
          height={80}
          className=""
          alt="UBC Launch Pad logo"
        />
      </Link>
      <div className="w-screen h-screen bg-primary flex justify-center items-center">
        <div className={"fixed space-flow top-0 left-0 w-screen h-screen"}>
          <div className={"w-[300px]  h-[300px] absolute  right-10 top-0"}>
            <Image
              src={"/images/assets/planet1.svg"}
              alt={"planet"}
              fill={true}
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className={"w-[267px] h-[200px] absolute  left-40 bottom-10"}>
            <Image
              src={"/images/assets/planet2.svg"}
              alt={"planet"}
              fill={true}
              style={{ objectFit: "contain" }}
            />
          </div>
          <Image
            src={"/images/assets/starsBg.svg"}
            alt={"planet"}
            fill={true}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="text-4xl flex-col flex gap-6 justify-center items-center">
          <div
            className={
              "  z-40 border-background-600  p-10 rounded-xl flex-col w-full max-w-4xl flex gap-10 justify-center items-center"
            }
          >
            {children}
          </div>
          <div className={"flex  flex-col w-full items-center gap-4 "}></div>
        </div>
      </div>
    </div>
  );
}
