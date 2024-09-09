import Image from "next/image";
import { Button } from "@/components/primitives/button";
import Link from "next/link";

const text = {
  title: "UBC Launch Pad",
  titleEnd: "🪐",
  description:
    "A student-run software engineering team devoted to building software projects in a collaborative and professional environment",
  joinUs: "Join Our Team",
};

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full overflow-hidden min-h-1/2 items-center">
      <div
        className={
          "flex flex-col-reverse md:flex-row justify-between w-full max-w-[1360px] min-h-96 py-12 px-6 gap-20"
        }
      >
        <div className="relative text-white flex flex-col justify-center items-center md:items-start sm:text-left text-center w-full gap-6 md:max-w-2xl flex-1">
          <h1 className="md:text-[56px] sm:text-[44px] text-[32px] font-heading pt-12">
            <span className="gradient-title drop-shadow-2xl">{text.title}</span>
            <span> {text.titleEnd}</span>
          </h1>
          <p className="text-lg w-full text-center md:text-left gradient-subtitle">
            {text.description}
          </p>
          <Link href="/portal/forms/241">
            <Button className="p-3 px-6" size={"xl"} icon>
              <span className="text-lg">{text.joinUs}</span>
            </Button>
          </Link>
        </div>
        <div
          className={
            "relative flex md:flex-1 flex-shrink-0 md:h-full h-40 max-w-96"
          }
        >
          <div className="absolute -top-10 -left-32">
            <Image
              src="/images/planet_purple.svg"
              alt="planet"
              width={400}
              height={400}
              className="sm:mx-auto w-24 h-20 md:w-auto md:h-auto ml-52 mt-48 sm:mt-0 sm:w-auto"
            />
          </div>
          <div className="absolute top-28 -right-8 z-0">
            <Image
              src="/images/planet_blue.svg"
              alt="planet"
              width={500}
              height={500}
              className="sm:mx-auto w-20 h-20 md:w-auto md:h-auto mr-24 mt-16 sm:mt-0 sm:w-auto"
            />
          </div>
          <div className="absolute md:-bottom-72 sm:-bottom-36 -right-2">
            <Image
              src="/images/stars.svg"
              alt="planet"
              width={450}
              height={400}
              className="md:w-72 md:h-72 sm:w-36 sm:h-36 w-20 h-20 mt-44 sm:mt-0 mr-32"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
