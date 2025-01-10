"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/helpers";

function OptionsDropdown({
  options,
  value,
  onChange,
  allowMultiple,
  onClose,
  listboxId,
}: {
  options: Record<string, string>[];
  value: (string | number)[];
  onChange: (value: string[]) => void;
  allowMultiple: boolean;
  onClose: () => void;
  listboxId: string;
}) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (activeIndex >= 0) {
      const activeItem = listRef.current?.children[activeIndex] as HTMLElement;
      activeItem?.focus();
    }
  }, [activeIndex]);

  return (
    <ul
      id={listboxId}
      ref={listRef}
      role="listbox"
      aria-label="Options"
      aria-multiselectable={allowMultiple}
      tabIndex={-1}
      className="absolute border border-background-500 top-full mt-1 max-h-80 w-full overflow-y-scroll bg-background-700  flex flex-col rounded  shadow-lg transform overflow-hidden z-50"
    >
      {options.map((option, index) => (
        <li
          key={index}
          role="option"
          tabIndex={0}
          aria-selected={value?.includes(option.value)}
          className={cn(
            "flex items-center h-10 flex-shrink-0 gap-2  p-2 outline-none :not(:first) border-t border-background-500",
            value?.includes(option.value)
              ? "bg-lp-500"
              : "hover:bg-background-800 bg-opacity-45",
            "focus:ring-2 focus:ring-lp-500",
          )}
          onClick={() => {
            if (!allowMultiple) {
              if (value?.includes(option.value)) {
                onChange([]);
                onClose();
                return;
              }
              onChange([option.value]);
              onClose();
              return;
            }
            if (value?.includes(option.value)) {
              onChange(value.filter((value) => value !== option.value));
            } else {
              onChange([...(value || []), option.value]);
            }
          }}
          onKeyDown={(e) => {
            switch (e.key) {
              case "Enter":
              case " ":
                e.preventDefault();
                if (!allowMultiple) {
                  if (value?.includes(option.value)) {
                    onChange([]);
                    onClose();
                    return;
                  }
                  onChange([option.value]);
                  onClose();
                  return;
                }
                if (value?.includes(option.value)) {
                  onChange(value.filter((value) => value !== option.value));
                } else {
                  onChange([...(value || []), option.value]);
                }
                break;
              case "ArrowDown":
                e.preventDefault();
                setActiveIndex(Math.min(index + 1, options.length - 1));
                break;
              case "ArrowUp":
                e.preventDefault();
                setActiveIndex(Math.max(index - 1, 0));
                break;
              case "Escape":
                e.preventDefault();
                onClose();
                break;
            }
          }}
        >
          <span className="w-6">
            {value?.includes(option.value) ? "✓" : ""}
          </span>
          <span>{option.label}</span>
        </li>
      ))}
    </ul>
  );
}

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
    if (value === null) return false;
    if (Array.isArray(value)) return value.includes(option.value);
    return value === option.value;
  });

  const listboxId = "multiselect-listbox";
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen && onBlur) {
      onBlur();
    }
  }, [isOpen]);

  return (
    <div className="relative w-full" ref={ref}>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
        ></div>
      )}

      <button
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        className={cn(
          "flex border border-background-600 bg-background-700 items-center min-h-11 rounded p-2 gap-2 w-full",
          className,
          isOpen && "border border-background-500 border-solid",
        )}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span className="text-white justify-center flex items-center gap-2">
          {selectedOptions !== [null] &&
            selectedOptions.map((option) => (
              <span key={option.value} className="p-0.5 px-2 rounded bg-lp-500">
                {option.label}
              </span>
            ))}
          <span className="text-background-200 text-sm">
            {selectedOptions.length === 0 && emptyText}
          </span>
        </span>
      </button>

      {isOpen && (
        <OptionsDropdown
          options={options}
          value={value}
          onChange={onChange}
          allowMultiple={allowMultiple}
          onClose={() => setIsOpen(false)}
          listboxId={listboxId}
        />
      )}
    </div>
  );
}
