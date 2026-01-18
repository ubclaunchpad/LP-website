"use client";

import { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "@/components/primitives/button";
import useIsMobile from "@/app/lib/hooks/useIsMobile";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import "swiper/css";

const lpFooterEllipse = "/icons/custom/footerEllipse.svg";
const execs = [
  {
    name: "Xavier Lam",
    image: "/images/execs/xavier_lam.png",
    title: "Co-President",
    linkedIn: "https://www.linkedin.com/in/xavier-lam/",
  },
  {
    name: "Tony Liu",
    image: "/images/execs/tony_liu.jpg",
    title: "Co-President",
    linkedIn: "https://www.linkedin.com/in/yunxiaotonyliu/",
  },
  {
    name: "Alex Luo",
    image: "/images/execs/alex_luo.jpg",
    title: "Tech Lead",
    linkedIn: "https://www.linkedin.com/in/alexluo602/",
  },
  {
    name: "Theo Siemens-Rhodes",
    image: "/images/execs/theo_siemens_rhodes.jpeg",
    title: "Tech Lead",
    linkedIn: "https://www.linkedin.com/in/theo-siemens-rhodes/",
  },
  {
    name: "Harsh Amin",
    image: "/images/execs/harsh_amin.jpeg",
    title: "Tech Lead",
    linkedIn: "https://www.linkedin.com/in/hamin06/",
  },
  {
    name: "Daniel Yoo",
    image: "/images/execs/daniel_yoo.jpg",
    title: "Tech Lead",
    linkedIn: "https://www.linkedin.com/in/yood2/",
  },
  {
    name: "Jessie Megan",
    image: "/images/execs/jessie_megan.jpg",
    title: "Design Lead",
    linkedIn: "https://www.linkedin.com/in/jessiemegan/",
  },
  {
    name: "Jackie Crowley",
    image: "/images/execs/jackie_crowley.jpeg",
    title: "Design Lead",
    linkedIn: "https://www.linkedin.com/in/jackiehcrowley/",
  },
  {
    name: "Ura Hwang",
    image: "/images/execs/ura_hwang.jpeg",
    title: "Operations Lead",
    linkedIn: "https://www.linkedin.com/in/ura-hwang-748336282/",
  },
  {
    name: "Iris Liu",
    image: "/images/execs/iris_liu.png",
    title: "Marketing Coordinator",
    linkedIn: "https://www.linkedin.com/in/irisdan/",
  },
  {
    name: "Boris Wang",
    image: "/images/execs/boris_wang.jpg",
    title: "Strategy Coordinator",
    linkedIn: "https://www.linkedin.com/in/boriswangcs/",
  },
  {
    name: "Pearl Dhingra",
    image: "/images/execs/pearl_dhingra.png",
    title: "Sponsorship Coordinator",
    linkedIn: "https://www.linkedin.com/in/pearl-dhingra/",
  },
  {
    name: "Vanshika Dixit",
    image: "/images/execs/vanshika_dixit.jpeg",
    title: "Events Coordinator",
    linkedIn: "https://www.linkedin.com/in/vdixit20/",
  },
];

export default function ExecSection() {
  const LARGE_SIZE = 1600;
  const TABLET_SIZE = 900;
  const MOBILE_SIZE = 768;
  const isLargeScreen = !useIsMobile(LARGE_SIZE);
  const isTablet = useIsMobile(TABLET_SIZE);
  const isMobile = useIsMobile(MOBILE_SIZE);

  const carouselSize = useMemo(() => {
    if (isLargeScreen) return 6;
    if (isTablet) return 4;
    if (isMobile) return 3;
    return 8;
  }, [isLargeScreen, isTablet, isMobile]);

  return (
    <div className="w-full min-h-96 relative flex-shrink-0">
      <div className="flex flex-col items-center justify-center md:justify-between py-10 w-full">
        <div className="flex flex-col md:flex-row text-center items-center justify-between w-full md:px-10 py-10">
          <div className="flex flex-col-reverse md:flex-row items-center">
            <h2 className="text-3xl font-semibold py-2 md:py-0 md:pr-4">
              Meet our <span className="text-lp-400">2025/2026</span> execs
            </h2>
          </div>
          <span className="hidden md:flex md:flex-row md:space-x-2">
            <Button variant={"dark"} className="swiper-button-prev gap-2">
              <ArrowLeft size={20} />
            </Button>
            <Button variant={"dark"} className="swiper-button-next gap-2">
              <ArrowRight size={20} />
            </Button>
          </span>
        </div>
        <div className="flex overflow-x-auto no-scrollbar mt-4 z-10 w-full">
          <Swiper
            spaceBetween={10}
            slidesPerView={carouselSize}
            loop={true}
            modules={[Navigation]}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
          >
            {execs.map((exec, index) => (
              <SwiperSlide
                key={index}
                className="flex justify-center items-center min-h-[250px] p-4"
              >
                <div className="flex flex-col items-center">
                  <a
                    href={exec.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${exec.name} LinkedIn`}
                  >
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 overflow-hidden rounded-2xl drop-shadow-xl">
                      <Image
                        src={exec.image}
                        alt={exec.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, (max-width: 1024px) 112px, 128px"
                      />
                    </div>
                  </a>
                  <p className="mt-2 font-bold text-center text-lg">
                    {exec.name}
                  </p>
                  <p className="text-white text-sm text-center">{exec.title}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
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
