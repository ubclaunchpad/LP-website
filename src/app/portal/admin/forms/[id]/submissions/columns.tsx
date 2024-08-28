import { ColumnDef } from "@tanstack/react-table";
import {useState} from "react";

export type FormFields = {
  [key: string]: {
    type:  "number" | "select" | "email" | "text" | "date" | "textarea" | "checkbox" | "url"
    label: string;
    options?: { label: string; value: string }[];
    cell?: (row: any) => string;
  };
};

export function createColumns<TData>(
  fields: FormFields,
): ColumnDef<keyof FormFields>[] {
  return Object.entries(fields).map(([key, field]) => {
    return {
      accessorKey: key as keyof TData,
      header: field.label,
      cell: ({ row }) => {
        if (Object.hasOwn(field, "cell")) {
          const cellResolver = field.cell as (row: any) => string;
          return cellResolver({ row });
        } else {
          const value = row.getValue(key);
          if (!value) {
            return <span className={"text-gray-400"}>N/A</span>;
          }
          if (field.type === "textarea" && value.toString().length > 10) {
            return <FieldPopover field={field} value={value.toString()} />;
          }
          if (field.type === "email") {
            return (
                <a
                    href={`mailto:${value.toString()}`}
                    className={"text-lp-200 underline"}
                >
                  {value.toString()}
                </a>
            );
          }
          if (field.type === "url") {
            const isSafe = value.toString().startsWith("https://") || value.toString().startsWith("www.linkedin.com/in/")
            || value.toString().startsWith("linkedin.com/in/") || value.toString().startsWith("github.com/")
            return (
                <span className={"flex flex-col"}>
                   <span className={`${isSafe ? "" : "text-red-300"}`}
                   >
                  {isSafe ? " " : " (Caution) "}
                </span>
              <a
                  href={value.toString()}
                  target="_blank"
                  rel="noreferrer"
                  className={`text-lp-200 underline`}
              >

                {value.toString()}
              </a>
                </span>
            );
          }
          if (field.type === "select") {
            return <span className={"flex flex-wrap gap-2"}>
              {value.toString().split(",").map((option) => (
                  <span key={option} className={"border rounded-full border-background-500  bg-background-600 shadow-md p-1 px-2"}>{option}</span>
              ))}
            </span>;
          }

          return row.getValue(key);
        }
      },
    };
  });
}


function FieldPopover({  value }: { value: string, field: FormFields[keyof FormFields] }) {
  const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={"flex relative flex-col gap-2"}>
        <button className={`text-left  ${isOpen? "": "line-clamp-2"}  text-xs cursor-ns-resize
         `}
                onClick={() => setIsOpen(prev => !prev)}
        >{value} </button>
        </div>
    );
}