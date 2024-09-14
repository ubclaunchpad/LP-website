// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/helpers";

export default function MultiSelect({
  options,
  value,
  onChange,
  allowMultiple = false,
  emptyText = "Choose",
  className,
  onBlur,
}: {
  value: (string | number)[];
  options: Record<string, string>[];
  onChange: (value: string[]) => void;
  allowMultiple: boolean;
  className?: string;
  emptyText?: string;
  onBlur?: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOptions = options.filter((option) => {
    if (value === null) {
      return false;
    }
    if (Array.isArray(value)) {
      return value.includes(option.value);
    }
    console.log(value, option.value);
    return value === option.value;
  });

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen && onBlur) {
      onBlur();
    }
  }, [isOpen]);

  return (
    <div className="relative flex flex-col w-full" ref={ref}>
      <button
        className={cn(
          "flex border border-background-600 bg-background-700 z-10  items-center min-h-11 rounded p-2 gap-2",
          className,
        )}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span className="text-white justify-center flex z-1 items-center gap-2 ">
          {/*{JSON.stringify(selectedOptions)}*/}
          {selectedOptions !== [null] &&
            selectedOptions.map((option) => (
              <span
                key={option.value}
                className="p-0.5 px-2 z-1! rounded bg-lp-500"
              >
                {option.label}
              </span>
            ))}
          <span className={"text-background-600 text-sm"}>
            {selectedOptions.length === 0 && emptyText}
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
        <div
          className="fixed max-h-80 overflow-y-scroll bg-background-700 gap-1 flex flex-col rounded border border-background-600  shadow-lg  w-full transform z-40 overflow-hidden p-2 "
          style={{
            top: ref.current?.getBoundingClientRect().top,
            left: ref.current?.getBoundingClientRect().left,
            width: ref.current?.getBoundingClientRect().width,
          }}
        >
          {options.map((option, index) => (
            <div
              key={index}
              className={`flex items-center h-10  z-40 flex-shrink-0 gap-2 rounded p-2 ${
                value?.includes(option.value)
                  ? "bg-lp-500"
                  : "hover:bg-background-800 bg-opacity-45"
              }`}
              onClick={() => {
                if (!allowMultiple) {
                  if (value?.includes(option.value)) {
                    onChange([]);
                    setIsOpen(false);
                    return;
                  }
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
