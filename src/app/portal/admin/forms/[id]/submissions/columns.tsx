import { ColumnDef } from "@tanstack/react-table";

export type FormFields = {
  [key: string]: {
    type:
      | "text"
      | "textarea"
      | "select"
      | "radio"
      | "checkbox"
      | "email"
      | "number"
      | "url";
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
          return row.getValue(key);
        }
      },
    };
  });
}
