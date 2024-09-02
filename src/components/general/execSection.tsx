"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/primitives/button";
const lpFooterEllipse = "/icons/custom/footerEllipse.svg";

const execs = [
  {
    name: "Armin Talaie",
    image: "/images/execs/armin_talaie.svg",
    title: "Co-President",
  },
  {
    name: "Adrienne Leung",
    image: "/images/execs/adrienne_leung.svg",
    title: "Co-President",
  },
  {
    name: "Xavier Lam",
    image: "/images/execs/xavier_lam.svg",
    title: "Tech Lead",
  },
  {
    name: "Kevin Zhang",
    image: "/images/execs/kevin_zhang.svg",
    title: "Tech Lead",
  },
  {
    name: "Tony Liu",
    image: "/images/execs/tony_liu.svg",
    title: "Tech Lead",
  },
  {
    name: "Jessie Shang",
    image: "/images/execs/jessie_shang.svg",
    title: "Tech Lead",
  },
  {
    name: "Arman Moztarzadeh",
    image: "/images/execs/arman_moztarzadeh.svg",
    title: "Tech Lead",
  },
  {
    name: "Hriday Buddhdev",
    image: "/images/execs/hriday_buddhdev.svg",
    title: "Tech Lead",
  },
  {
    name: "Jena Arianto",
    image: "/images/execs/jena_arianto.svg",
    title: "Design Lead",
  },
  {
    name: "Patty Tancharoen",
    image: "/images/execs/patty_tancharoen.svg",
    title: "Tech Lead",
  },
  {
    name: "Martin Tang",
    image: "/images/execs/martin_tang.svg",
    title: "Operations Lead",
  },
  {
    name: "Allen Nguyen",
    image: "/images/execs/allen_nguyen.svg",
    title: "Sponsorship Coordinator",
  },
  {
    name: "Iris Liu",
    image: "/images/execs/iris_liu.svg",
    title: "Marketing Coordinator",
  },
  {
    name: "Ura Hwang",
    image: "/images/execs/ura_hwang.svg",
    title: "Marketing Coordinator",
  },
];

export default function ExecSection() {
  const text = {
    prev: "Prev",
    next: "Next",
  };

  const [currentPage, setCurrentPage] = useState(0);
  const [execsPerPage, setExecsPerPage] = useState(7);

  useEffect(() => {
    const handleResize = () => {
      // Number of profiles per page based on screen size
      setExecsPerPage(window.innerWidth < 768 ? 3 : 7);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const startIndex = currentPage * execsPerPage;
  const endIndex = startIndex + execsPerPage;
  const currentExecs = execs.slice(startIndex, endIndex);

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (endIndex < execs.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const isPrevDisabled = currentPage === 0;
  const isNextDisabled = endIndex >= execs.length;

  return (
    <div className="w-full min-h-96 relative flex-shrink-0">
      <div className="flex flex-col items-center">
        <div className="flex justify-between items-center w-full">
          <h2 className="md:text-left text-center text-3xl mx-8 md:mx-36 sm:font-semibold whitespace-nowrap ml-8 md:ml-36 mt-12 mb-4">
            Meet our <span className="text-lp-400">2024/2025</span> execs
          </h2>
          <div className="flex space-x-6 mt-16 mr-16">
            <Button
              onClick={handlePrev}
              variant={"dark"}
              className={`p-2 hidden md:flex items-center ${
                isPrevDisabled ? "bg-[#545454]" : "bg-lightPurple text-white"
              } w-24`}
              size="xl"
              icon
              reverse
              disabled={isPrevDisabled}
            >
              <span className="text-lg pl-2">{text.prev}</span>
            </Button>
            <Button
              onClick={handleNext}
              variant={"dark"}
              className={`p-2 hidden md:flex items-center ${
                isNextDisabled ? "bg-[#545454]" : "bg-lightPurple text-white"
              } w-24`}
              size="xl"
              icon
              disabled={isNextDisabled}
            >
              <span className="text-lg pl-4">{text.next}</span>
            </Button>
          </div>
        </div>
        <div className="flex overflow-x-auto no-scrollbar mt-4 z-10">
          <div className="flex flex-nowrap">
            {currentExecs.map((exec, index) => (
              <div key={index} className="flex flex-col items-center m-8">
                <Image
                  src={exec.image}
                  alt={exec.name}
                  width={110}
                  height={110}
                  className="rounded-2xl"
                />
                <p className="mt-2 font-bold text-center text-lg">{exec.name}</p>
                <p className="text-white text-sm">{exec.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Image
        src={lpFooterEllipse}
        alt="Newsletter Image"
        fill={true}
        style={{ objectFit: "cover" }}
        className="absolute top-1/2 left-1/2 transform translate-y-1/2 z-0"
      />
    </div>
  );
}
