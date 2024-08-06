import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

export default function InfoButton({ text, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1 bg-zinc-400 text-stone-400 rounded-md text-sm"
    >
      {text}
    </button>
  );
};
