import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="relative bg-customGray min-h-screen flex items-center justify-center">
      <div className="absolute top-2 right-42">
        <Image
          src="/images/planet_2.svg"
          alt="planet"
          width={400}
          height={400}
        />
      </div>
      <div className="absolute top-20 right-16">
        <Image
          src="/images/planet_1.svg"
          alt="planet"
          width={500}
          height={500}
        />
      </div>
      <div className="absolute top-1 right-48">
        <Image src="/images/stars.svg" alt="planet" width={450} height={300} />
      </div>

      <div className="relative text-white text-left ">
        <h1 className="text-5xl  bg-custom-gradient shadow-sm font-heading font-semibold mb-4">
          UBC Launch Pad 🪐
        </h1>
        <p className="font-mono text-lg text-left mb-2">
          A student-run software engineering team devoted to building software
          projects in a collaborative and professional environment
        </p>
      </div>
      <div className="absolute bottom-0 left-0 w-full text-center text-white"></div>
    </div>
  );
}
