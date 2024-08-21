import React from "react";
import Image from "next/image";
interface Stat {
  value: string;
  label: string;
}

const statsData: Stat[] = [
  { value: "500+", label: "Members" },
  { value: "50+", label: "Projects" },
  { value: "7+", label: "Majors" },
];

export default function Statistics() {
  return (
    <div className="relative flex justify-center items-center mb-20 mx-auto flex-wrap max-w-screen-lg px-4">
      <Image
        src="/images/eclipse.svg"
        alt="eclipse"
        width={20}
        height={20}
        className="absolute w-full max-w-none -z-10"
      />
      <div className="flex justify-center flex-wrap gap-6 w-full">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="bg-lightPurple text-white p-6 rounded-lg text-center min-w-[200px] w-full sm:w-auto shadow-lg"
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
