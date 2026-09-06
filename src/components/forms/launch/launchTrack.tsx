import React from "react";
import LaunchRocket from "./launchRocket";

/**
 * Phase rail for the wizard: one node per step, a gradient fill that climbs
 * as the applicant advances, and the launch rocket riding the leading edge.
 * The rocket is idle on the pad at step 0 and firing from step 1 on.
 */
export default function LaunchTrack({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  if (total <= 1) {
    return null;
  }
  const pct = total <= 1 ? 0 : (current / (total - 1)) * 100;

  return (
    <div
      className="relative w-full"
      style={{ paddingTop: "10px", paddingBottom: "14px" }}
    >
      {/* rail */}
      <div className="relative h-[3px] rounded-full bg-white/10 overflow-hidden mx-1">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-lp-600 via-lp-500 to-lp-300 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* nodes */}
      {Array.from({ length: total }, (_, i) => {
        const reached = i <= current;
        const nodeLeft = total === 1 ? 0 : (i / (total - 1)) * 100;
        return (
          <span
            key={i}
            className={`absolute top-[16px] -translate-x-1/2 rounded-full transition-colors duration-500 ${
              reached
                ? "bg-lp-300 shadow-[0_0_8px_1px_rgba(128,156,255,0.9)]"
                : "bg-white/20"
            }`}
            style={{
              left: `${nodeLeft}%`,
              width: reached ? 7 : 5,
              height: reached ? 7 : 5,
            }}
          />
        );
      })}

      {/* the rocket */}
      <div
        className="absolute top-[3px] transition-[left] duration-500 ease-out"
        style={{ left: `${pct}%`, transform: "translateX(-50%)" }}
      >
        <LaunchRocket
          firing={current > 0}
          direction="right"
          size={30}
          className="drop-shadow-[0_0_10px_rgba(128,156,255,0.55)]"
        />
      </div>
    </div>
  );
}
