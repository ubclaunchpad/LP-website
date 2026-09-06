import React from "react";

/**
 * Hand-drawn launch rocket. Drawn nose-up; pass direction="right" to lay it
 * horizontally (used riding the phase track). Flame renders behind the body
 * when firing, with a CSS flicker (see .animate-flame).
 */
export default function LaunchRocket({
  firing = false,
  direction = "right",
  size = 24,
  className = "",
}: {
  firing?: boolean;
  direction?: "up" | "right";
  size?: number;
  className?: string;
}) {
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const bodyGrad = `body-${id}`;
  const glassGrad = `glass-${id}`;
  const accentGrad = `accent-${id}`;

  return (
    <div
      aria-hidden
      className={`relative inline-flex items-center justify-center ${direction === "right" ? "rotate-90" : ""} ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 24 40" className="w-full h-full">
        <defs>
          <linearGradient id={bodyGrad} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#b7bfd0" />
          </linearGradient>
          <linearGradient id={accentGrad} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#809cff" />
            <stop offset="1" stopColor="#3d4aee" />
          </linearGradient>
          <radialGradient id={glassGrad} cx="0.35" cy="0.35" r="0.9">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#809cff" />
          </radialGradient>
        </defs>

        {firing && (
          <g className="animate-flame">
            <path
              d="M12 22.5 C 8.6 27, 6.6 30.5, 12 39.5 C 17.4 30.5, 15.4 27, 12 22.5 Z"
              fill="#ff7a3d"
              opacity="0.9"
            />
            <path
              d="M12 25 C 10.4 28, 9.8 30.5, 12 34.5 C 14.2 30.5, 13.6 28, 12 25 Z"
              fill="#ffd166"
            />
          </g>
        )}

        {/* fins */}
        <path d="M7.2 15 L3.6 23 L7.2 23 Z" fill={`url(#${accentGrad})`} />
        <path d="M16.8 15 L20.4 23 L16.8 23 Z" fill={`url(#${accentGrad})`} />

        {/* body */}
        <rect
          x="7"
          y="6"
          width="10"
          height="17.5"
          rx="4"
          fill={`url(#${bodyGrad})`}
        />
        {/* accent stripe */}
        <rect
          x="10.3"
          y="6"
          width="1.7"
          height="17.5"
          fill={`url(#${accentGrad})`}
        />
        {/* nose cone */}
        <path
          d="M7 7.4 C 7 4, 9 2.4, 12 2 C 15 2.4, 17 4, 17 7.4 Z"
          fill={`url(#${accentGrad})`}
        />
        {/* window */}
        <circle cx="12" cy="13.5" r="3.1" fill={`url(#${glassGrad})`} />
        <circle cx="11.1" cy="12.4" r="0.9" fill="#ffffff" opacity="0.75" />
      </svg>
    </div>
  );
}
