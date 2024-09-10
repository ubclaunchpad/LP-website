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
    name: "Armin Talaie",
    image: "/images/execs/armin_talaie.png",
    title: "Co-President",
    linkedIn: "https://www.linkedin.com/in/armin-talaie/",
  },
  {
    name: "Adrienne Leung",
    image: "/images/execs/adrienne_leung.png",
    title: "Co-President",
    linkedIn: "https://www.linkedin.com/in/adrienne-leung/",
  },
  {
    name: "Xavier Lam",
    image: "/images/execs/xavier_lam.png",
    title: "Tech Lead",
    linkedIn: "https://www.linkedin.com/in/xavier-lam/",
  },
  {
    name: "Kevin Zhang",
    image: "/images/execs/kevin_zhang.png",
    title: "Tech Lead",
    linkedIn: "https://www.linkedin.com/in/-kevin-zhang-/",
  },
  {
    name: "Tony Liu",
    image: "/images/execs/tony_liu.png",
    title: "Tech Lead",
    linkedIn: "https://www.linkedin.com/in/yunxiaotonyliu/",
  },
  {
    name: "Jessie Shang",
    image: "/images/execs/jessie_shang.png",
    title: "Tech Lead",
    linkedIn: "https://www.linkedin.com/in/shangjessie/",
  },
  {
    name: "Arman Moztarzadeh",
    image: "/images/execs/arman_moztarzadeh.png",
    title: "Tech Lead",
    linkedIn: "https://www.linkedin.com/in/arman-moztarzadeh/",
  },
  {
    name: "Hriday Buddhdev",
    image: "/images/execs/hriday_buddhdev.png",
    title: "Tech Lead",
    linkedIn: "https://www.linkedin.com/in/hriday-buddhdev-127a74202/",
  },
  {
    name: "Jena Arianto",
    image: "/images/execs/jena_arianto.png",
    title: "Design Lead",
    linkedIn: "https://www.linkedin.com/in/jena-arianto/",
  },
  {
    name: "Daphne Tian",
    image: "/images/execs/daphne_tian.png",
    title: "Design Lead",
    linkedIn: "https://www.linkedin.com/in/daphne-tian/",
  },
  {
    name: "Patty Tancharoen",
    image: "/images/execs/patty_tancharoen.png",
    title: "Design Lead",
    linkedIn: "https://www.linkedin.com/in/pattytanch/",
  },
  {
    name: "Martin Tang",
    image: "/images/execs/martin_tang.png",
    title: "Operations Lead",
    linkedIn: "https://www.linkedin.com/in/martin-txng/",
  },
  {
    name: "Allen Nguyen",
    image: "/images/execs/allen_nguyen.png",
    title: "Sponsorship Coordinator",
    linkedIn: "https://www.linkedin.com/in/allendnguyen/",
  },
  {
    name: "Iris Liu",
    image: "/images/execs/iris_liu.png",
    title: "Marketing Coordinator",
    linkedIn: "https://www.linkedin.com/in/irisdan/",
  },
  {
    name: "Ura Hwang",
    image: "/images/execs/ura_hwang.png",
    title: "Marketing Coordinator",
    linkedIn: "https://www.linkedin.com/in/ura-hwang-748336282/",
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
              Meet our <span className="text-lp-400">2024/2025</span> execs
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
                  <a href={exec.linkedIn}>
                    <Image
                      src={exec.image}
                      alt={exec.name}
                      width={110}
                      height={110}
                      className="rounded-2xl drop-shadow-xl"
                    />
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
