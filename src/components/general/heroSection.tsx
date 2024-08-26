import Hero from "@/components/general/hero";
import Statistics from "@/components/general/statistics";
import AlumniCarousel from "@/components/general/alumniCarousel";

export default function HeroSection() {
  return (
    <>
      <section className="flex flex-col items-center overflow-visible w-full gap-60 text-center">
        <Hero />
        <Statistics />
      </section>
      <AlumniSection />
    </>
  );
}

const text = {
  alum: "Our Alumni have worked as Developers & Designers, and more at",
};

function AlumniSection() {
  return (
    <div className="flex flex-col py-16 gap-3 w-screen text-center">
      {text.alum}
      <div className="w-full white-glow bg-white  overflow-hidden max-w-screen">
        <AlumniCarousel />
      </div>
    </div>
  );
}
