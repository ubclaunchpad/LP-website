import React from "react";

export default function Loading({
  size = "medium",
  color = "lp-500",
}: {
  size?: "small" | "medium" | "large";
  color?: string;
}) {
  const sizeClasses = {
    small: "w-6 h-6 border-2",
    medium: "w-8 h-8 border-4",
    large: "w-12 h-12 border-6",
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div
        className={`${sizeClasses[size]} border-t-transparent border-${color} rounded-full animate-spin`}
      ></div>
      <p className={`mt-4 text-${color}`}>Loading...</p>
    </div>
  );
}
