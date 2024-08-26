import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

export default function InfoButton({ text, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1 bg-secondary text-[#8A7DA1] rounded-lg text-xs"
    >
      {text}
    </button>
  );
}
