import Image from "next/image";
import { Button } from "@/components/primitives/button";
import Link from "next/link";

const text = {
  title: "UBC Launch Pad ",
  titleEnd: "🪐",
  description:
    "A student-run software engineering team devoted to building software projects in a collaborative and professional environment",
  joinus: "Join Our Team",
};

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full overflow-hidden min-h-1/2 items-center">
      <div
        className={
          "flex flex-col-reverse md:flex-row justify-between  w-full max-w-[1340px] min-h-96 py-16  px-20 gap-20"
        }
      >
        <div className="relative text-white flex flex-col justify-center items-center md:items-start text-left w-full gap-6 md:max-w-2xl flex-1">
          <h1 className="text-[56px]  font-heading ">
            <span className="text-white">{text.title}</span>
            <span> {text.titleEnd}</span>
          </h1>
          <p className=" text-lg text-center md:text-left text-white ">
            {text.description}
          </p>
          <Link href="/portal/forms/241">
            <Button className="p-3 px-6" size={"xl"}>
              <label className="text-lg">{text.joinus}</label>
            </Button>
          </Link>
        </div>
        <div
          className={
            "relative flex md:flex-1 flex-shrink-0 md:h-full h-40 max-w-96  "
          }
        >
          <div className="absolute -top-10 z-2 -left-32">
            <Image
              src="/images/planet_2.svg"
              alt="planet"
              width={300}
              height={300}
            />
          </div>
          <div className="md:absolute hidden top-20 z-2 -right-32">
            <Image
              src="/images/planet_1.svg"
              alt="planet"
              width={500}
              height={500}
            />
          </div>
          <div className="absolute -top-10 z-1 -right-20">
            <Image
              src="/images/stars.svg"
              alt="planet"
              width={450}
              height={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
}