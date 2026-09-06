import Image from "next/image";

const TWINKLES: { top: string; left: string; size: number; delay: number }[] = [
  { top: "12%", left: "8%", size: 2, delay: 0.4 },
  { top: "22%", left: "22%", size: 2, delay: 1.6 },
  { top: "9%", left: "38%", size: 3, delay: 2.4 },
  { top: "31%", left: "56%", size: 2, delay: 0.9 },
  { top: "16%", left: "76%", size: 2, delay: 2.9 },
  { top: "42%", left: "88%", size: 3, delay: 1.2 },
  { top: "58%", left: "12%", size: 2, delay: 2.1 },
  { top: "68%", left: "30%", size: 2, delay: 0.2 },
  { top: "52%", left: "68%", size: 2, delay: 3.1 },
  { top: "74%", left: "82%", size: 2, delay: 1.8 },
  { top: "85%", left: "46%", size: 3, delay: 0.6 },
  { top: "90%", left: "18%", size: 2, delay: 2.6 },
];

/**
 * Fixed night-sky layer for the applicant journey: deep-space gradient,
 * starfield, drifting nebula glows, twinkling specks, floating planets and a
 * rare comet. dim = quieter (used behind the question wizard so form panels
 * stay the hero).
 */
export default function SpaceBackground({ dim = false }: { dim?: boolean }) {
  return (
    <div
      aria-hidden
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{
        background:
          "radial-gradient(130% 90% at 72% -12%, #252c58 0%, #131530 42%, #07080f 100%)",
      }}
    >
      <Image
        src="/images/assets/starsBg.svg"
        alt=""
        fill
        className={`object-cover ${dim ? "opacity-25" : "opacity-45"}`}
      />

      {/* nebula glows */}
      <div
        className={`absolute rounded-full blur-[110px] animate-nebula ${dim ? "opacity-20" : "opacity-35"}`}
        style={{
          width: "55vw",
          height: "55vw",
          top: "-14vw",
          left: "-12vw",
          background:
            "radial-gradient(circle, rgba(91, 114, 249, 0.55), transparent 65%)",
        }}
      />
      <div
        className={`absolute rounded-full blur-[130px] animate-nebula ${dim ? "opacity-15" : "opacity-25"}`}
        style={{
          width: "48vw",
          height: "48vw",
          bottom: "-16vw",
          right: "-10vw",
          background:
            "radial-gradient(circle, rgba(143, 112, 216, 0.5), transparent 65%)",
          animationDelay: "-14s",
        }}
      />

      {/* twinkling specks */}
      {TWINKLES.map((star, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationDelay: `${star.delay}s`,
            boxShadow: "0 0 6px 1px rgba(255,255,255,0.6)",
          }}
        />
      ))}

      {!dim && (
        <>
          {/* drifting planets */}
          <div className="hidden xl:block absolute w-[300px] h-[300px] right-10 top-6 space-flow">
            <Image
              src="/images/assets/planet1.svg"
              alt=""
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="hidden xl:block absolute w-[267px] h-[200px] left-30 bottom-10 space-flow">
            <Image
              src="/images/assets/planet2.svg"
              alt=""
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </>
      )}

      {!dim && (
        <div className="absolute top-[10%] right-[8%] animate-comet">
          <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_14px_3px_rgba(255,255,255,0.9)]" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-28 h-[2px] origin-right -rotate-[142deg] bg-gradient-to-r from-transparent via-white/50 to-white" />
        </div>
      )}
    </div>
  );
}
