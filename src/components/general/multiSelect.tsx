import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/helpers";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/primitives/popover";

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
  const [open, setOpen] = useState(false);
  const selectedOptions = options.filter((option) => {
    if (value === null) return false;
    if (Array.isArray(value)) return value.includes(option.value);
    return value === option.value;
  });

  useEffect(() => {
    if (!open && onBlur) {
      onBlur();
    }
  }, [open, onBlur]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "flex w-full border border-background-600 bg-background-700 items-center min-h-11 rounded p-2 gap-2",
            className,
          )}
          type="button"
        >
          <span className="text-white justify-center flex items-center gap-2">
            {selectedOptions !== [null] &&
              selectedOptions.map((option) => (
                <span
                  key={option.value}
                  className="p-0.5 px-2 rounded bg-lp-500"
                >
                  {option.label}
                </span>
              ))}
            <span className="text-background-200 text-sm">
              {selectedOptions.length === 0 && emptyText}
            </span>
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 bg-background-700 border-background-600">
        <div className="max-h-80 overflow-y-auto">
          {options.map((option, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center h-10 flex-shrink-0 gap-2 p-2",
                value?.includes(option.value)
                  ? "bg-lp-500"
                  : "hover:bg-background-800 bg-opacity-45",
              )}
              onClick={() => {
                if (!allowMultiple) {
                  if (value?.includes(option.value)) {
                    onChange([]);
                    setOpen(false);
                    return;
                  }
                  onChange([option.value]);
                  setOpen(false);
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
      </PopoverContent>
    </Popover>
  );
}
