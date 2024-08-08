"use client";

import { useState } from "react";

export default function Select({
  options,
  value,
}: {
  options: Record<string, string>[];
  value: string;
}) {
  const [selectedOption, setSelectedOption] = useState<String>(value);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex flex-col w-full">
      <button
        className="flex bg-neutral-800 items-center  h-11 rounded p-2 gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption ? (
          <span className="text-white flex items-center gap-2 ">
            {options.find((option) => option.value.toString() === selectedOption.toString())?.label}
          </span>
        ) : (
          <span className="text-white opacity-60 flex items-center gap-2 ">
            Select an option
          </span>
        )}
      </button>
      {isOpen && (
        <div
          className="fixed h-screen w-screen bg-neutral-950 bg-opacity-65 z-20 top-0 left-0"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      {isOpen && (
        <div className="absolute max-h-80 overflow-y-scroll  bg-neutral-800 gap-1 flex flex-col rounded border border-neutral-900 top-0 shadow-xl left-0 w-full transform z-40 overflow-hidden p-2 ">
          {options.map((option, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 h-10 flex-shrink-0 rounded p-2 ${
                selectedOption === option.value
                  ? "bg-indigo-800"
                  : "hover:bg-neutral-600 bg-opacity-45"
              }`}
              onClick={() => {
                setSelectedOption(option.value);
                setIsOpen(false);
              }}
            >
              <span className="w-6">
                {selectedOption === option.value ? "✓" : ""}
              </span>
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
