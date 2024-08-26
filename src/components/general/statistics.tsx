import React from "react";
import Image from "next/image";
import { statsData } from "@/lib/data/generalData";

export interface Stat {
  value: string;
  label: string;
}

export default function Statistics() {
  return (
    <div className="relative overflow-visible hidden md:flex justify-center items-center w-full flex-wrap min-h-[200px]  px-4">
      <Image
        src="/images/eclipse.svg"
        alt="eclipse"
        fill={true}
        objectFit={"cover"}
        className="absolute   max-w-none  pt-8 overflow-visible top-1/2 left-0 transform  z-10 translate-y"
      />

      <div className="flex justify-center flex-wrap gap-6 w-full absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="bg-lightPurple flex flex-col justify-center gap-2 text-white p-6 rounded-lg text-center min-w-[170px] max-w-[180px] h-[164px] w-full "
            style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
          >
            <h2 className="text-4xl text-center w-full font-heading font-semibold">
              {stat.value}
            </h2>
            <p className="text-md text-lightPurple3 bg-lightPurple2 rounded-lg px-4 py-1  mx-auto inline-block">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
