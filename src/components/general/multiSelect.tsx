// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
"use client";

import { useState } from "react";

export default function MultiSelect({
  options,
  value,
  onChange,
  allowMultiple = false,
}: {
  value: (string | number)[];
  options: Record<string, string>[];
  onChange: (value: string[]) => void;
  allowMultiple: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOptions = options.filter((option) =>
    value.includes(option.value),
  );

  return (
    <div className="relative flex flex-col w-full">
      <button
        className="flex border border-background-600 bg-background-700  items-center min-h-11 rounded p-2 gap-2"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span className="text-white justify-center flex items-center gap-2 ">
          {selectedOptions.map((option) => (
            <span key={option.label} className="p-0.5 px-2 rounded bg-lp-500">
              {option.label}
            </span>
          ))}
          <span className={"text-background-600 text-sm"}>
            {selectedOptions.length === 0 && "Choose"}
          </span>
        </span>
      </button>
      {isOpen && (
        <div
          className="fixed h-screen w-screen bg-black bg-opacity-30 z-20 top-0 left-0"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      {isOpen && (
        <div className="absolute max-h-80 overflow-y-scroll bg-background-700 gap-1 flex flex-col rounded border border-background-600 top-0  shadow-lg left-0 w-full transform z-40 overflow-hidden p-2 ">
          {options.map((option, index) => (
            <div
              key={index}
              className={`flex items-center h-10 flex-shrink-0 gap-2 rounded p-2 ${
                value?.includes(option.value)
                  ? "bg-lp-500"
                  : "hover:bg-background-800 bg-opacity-45"
              }`}
              onClick={() => {
                if (!allowMultiple) {
                  onChange([option.value]);
                  setIsOpen(false);
                  return;
                }
                if (value?.includes(option.value)) {
                  onChange(value.filter((value) => value !== option.value));
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
