"use client";

import { cn } from "@/app/lib/util/helpers";

export default function Input({ ...props }) {
  return (
    <input
   
      {...props}
      className={cn(
        "p-2 px-4 h-11 rounded border-neutral-800 border bg-neutral-800",
        props.className
      )}
    />
  );
}
