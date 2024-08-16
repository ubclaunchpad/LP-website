"use client";

import { useState } from "react";

export default function MultiSelect({
  options,
  value,
  onChange,
}: {
  value: string[];
  options: Record<string, string>[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex flex-col w-full">
      <button
        className="flex bg-neutral-800  h-11 rounded p-2 gap-2"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span className="text-white flex items-center gap-2 ">
          {options
            .filter((option) => value?.includes(option.value))
            .map((option) => (
              <span
                key={option.label}
                className="p-1 px-2 rounded bg-indigo-700"
              >
                {option.label}
              </span>
            ))}
        </span>
      </button>
      {isOpen && (
        <div
          className="fixed h-screen w-screen bg-neutral-900 bg-opacity-35 z-20 top-0 left-0"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      {isOpen && (
        <div className="absolute max-h-80 overflow-y-scroll bg-neutral-800 gap-1 flex flex-col rounded border border-neutral-800 top-0  shadow-lg left-0 w-full transform z-40 overflow-hidden p-2 ">
          {options.map((option, index) => (
            <div
              key={index}
              className={`flex items-center h-10 flex-shrink-0 gap-2 rounded p-2 ${
                value?.includes(option.value)
                  ? "bg-indigo-800"
                  : "hover:bg-neutral-600 bg-opacity-45"
              }`}
              onClick={() => {
                if (value?.includes(option.value)) {
                  onChange(
                    value.filter((value) => value !== option.value)
                  );
                } else {
                  onChange([...(value || []), option.value]);
                }
              }}
            >
              <span className="w-6">
                {value?.includes(option.value) ? "✓" : ""}
              </span>
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
