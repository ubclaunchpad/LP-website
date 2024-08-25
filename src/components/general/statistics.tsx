import React from "react";
import Image from "next/image";
import {statsData} from "@/lib/data/generalData";

export interface Stat {
  value: string;
  label: string;
}

export default function Statistics() {
  return (
    <div className="relative hidden md:flex justify-center items-center w-full flex-wrap min-h-80 px-4">
      <Image
        src="/images/eclipse.svg"
        alt="eclipse"
        fill={true}
        objectFit={"fit"}
        className="absolute w-full max-w-none top-1/2 left-0 transform  -translate-y-1/2"
      />
      <div className="flex justify-center flex-wrap gap-6 w-full absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="bg-lightPurple text-white p-6 rounded-lg text-center min-w-[200px] max-w-36 h-[164px] w-full shadow-lg"
          >
            <h2 className="text-4xl font-semibold">{stat.value}</h2>
            <p className="text-md text-lightPurple3 bg-lightPurple2 rounded-lg px-4 py-1 mt-4 mx-auto inline-block">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
