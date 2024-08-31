// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils/helpers";

export default function FloatingTextArea({
  value,
  onChange,
  className,
}: {
  value: string | undefined;
  onChange: (value: string) => void;
  className?: string;
}) {
  const [text, setText] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="relative flex flex-col w-full" ref={ref}>
      <button
        className={cn(
          "flex border border-background-600 bg-background-700  items-center min-h-11 rounded p-2 gap-2",
          className,
        )}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span className="text-white justify-center flex items-center gap-2 ">
          {value && value.length > 0 ? (
            <span className={"line-clamp-1"}>{value}</span>
          ) : null}
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
          className="fixed white-glow left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2

               max-w-2xl overflow-y-scroll min-w-xl  bg-background-700 gap-1 flex flex-col rounded border border-background-600    w-full  z-40 overflow-hidden "
        >
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={() => {
              if (text !== value) {
                onChange(text);
              }
              setIsOpen(false);
            }}
            className={
              "w-full p-4 text-left min-h-[50vh] bg-background-800 p-2 rounded outline-none shadow-lg text-white"
            }
          />
        </div>
      )}
    </div>
  );
}
