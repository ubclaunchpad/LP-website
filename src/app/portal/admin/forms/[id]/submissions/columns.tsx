import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";
import { ExpandIcon } from "lucide-react";
import MultiSelect from "@/components/general/multiSelect";
import { updateSubmissionField } from "@/app/portal/admin/actions";
import { toast } from "sonner";
import FloatingTextArea from "@/components/primitives/floatingTextArea";

export type FormFields = {
  [key: string]: {
    type:
      | "number"
      | "select"
      | "email"
      | "text"
      | "date"
      | "textarea"
      | "checkbox"
      | "url";
    label: string;
    options?: { label: string; id: string }[];
    cell?: (row: any) => string;
    config?: {
      tableName: string;
      allowUpdate: boolean;
    };
    enableColumnFilter?: boolean;
    filterFn?: (
      row: Row<any>,
      columnId: string,
      filterValue: any,
      addMeta: (meta: any) => void,
    ) => boolean;
  };
};

export function createColumns<TData>(
  fields: FormFields,
  setAndOpen: any,
): ColumnDef<keyof FormFields>[] {
  const general = Object.entries(fields).map(([key, field]) => {
    return {
      accessorKey: key as keyof TData,
      header: field.label,
      enableColumnFilter: field.type !== "textarea" && field.type !== "url",
      filterFn: (
        row: Row<any>,
        columnId: string,
        filterValue: any,
        addMeta: (meta: any) => void,
      ) => {
        if (!filterValue) {
          return true;
        }
        if (field.type === "select") {
          if (!field.options) {
            return row.original[key]
              .toString()
              .toLowerCase()
              .includes(filterValue.toLowerCase());
          }
          const matchCriteria = field.options?.filter(
            (op) =>
              filterValue.includes(op.label) || filterValue.includes(op.id),
          );
          return (
            matchCriteria?.filter((op) =>
              row.original[key]
                .toString()
                .toLowerCase()
                .includes(op.label.toLowerCase()),
            ).length > 0
          );
        }
        return row.original[key]
          .toString()
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      },
      cell: ({ row }: { row: any }) => {
        if (Object.hasOwn(field, "cell")) {
          const cellResolver = field.cell as (row: any) => string;
          return cellResolver({ row });
        } else {
          const value = row.getValue(key);
          if (field.type === "textarea") {
            return (
              <TextareaField
                field={field}
                value={value?.toString()}
                submissionId={row.original.id}
                id={key}
              />
            );
          }
          if (!value) {
            return <span className={"text-gray-400"}>N/A</span>;
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
            const isSafe = value.toString().startsWith("https://");
            return (
              <span className={"flex flex-col"}>
                <span className={`${isSafe ? "" : "text-red-300"}`}>
                  {isSafe ? " " : " (Caution) "}
                </span>
                <a
                  href={
                    isSafe ? value.toString() : `https://${value.toString()}`
                  }
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
            const submissionId = row.original.id;
            return (
              <SelectField
                field={field}
                value={value.toString()}
                submissionId={submissionId}
                id={key}
              />
            );
          }
          return row.getValue(key);
        }
      },
    };
  });
  return [
    {
      accessorKey: "popover",
      header: "Applicant",
      enableColumnFilter: false,
      cell: ({ row }) => {
        return (
          <button
            onClick={() => {
              setAndOpen({ applicant: row });
            }}
            className={
              "text-lp-200  rounded-xl w-full justify-start flex items-center gap-2  py-1"
            }
          >
            <ExpandIcon size={12} />
            View
          </button>
        );
      },
    },
    ...general,
  ];
}

function FieldPopover({
  value,
}: {
  value: string;
  field: FormFields[keyof FormFields];
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={"flex relative flex-col gap-2"}>
      <button
        className={`text-left  ${isOpen ? "" : "line-clamp-2"}  text-xs cursor-ns-resize
         `}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {value}{" "}
      </button>
    </div>
  );
}

function SelectField({
  submissionId,
  value,
  field,
  id,
}: {
  submissionId: string;
  value: string;
  id: string;
  field: FormFields[keyof FormFields];
}) {
  const [selected, setSelected] = useState(value);
  const canUpdate = field.config?.allowUpdate;
  if (!canUpdate) {
    return (
      <span className={"flex flex-wrap gap-2"}>
        {value
          .toString()
          .split(",")
          .map((option: any) => (
            <span
              key={option}
              className={
                "border rounded-full border-background-500  bg-background-600 shadow-md p-1 px-2"
              }
            >
              {option}
            </span>
          ))}
      </span>
    );
  }

  const updateField = async (val: any) => {
    const prev = selected;
    setSelected(val);
    updateSubmissionField(submissionId, id, field.config?.tableName, val)
      .then(() => {
        toast.success("Field updated successfully");
      })
      .catch(() => {
        setSelected(prev);
        toast.error("Error updating field");
      });
  };

  return (
    <MultiSelect
      className={
        "w-full bg-transparent border-none hover:bg-lp-500 duration-300"
      }
      onChange={(e) => updateField(e[0])}
      allowMultiple={false}
      value={Array.isArray(selected) ? selected : [selected]}
      options={
        field.options?.map((op) => ({
          label: op.label,
          value: op.id,
        })) || []
      }
    ></MultiSelect>
  );
}

function TextareaField({
  submissionId,
  value,
  field,
  id,
}: {
  submissionId: string;
  value: string;
  id: string;
  field: FormFields[keyof FormFields];
}) {
  const [text, setText] = useState(value);
  const canUpdate = field.config?.allowUpdate;
  if (!canUpdate) {
    if (value?.toString().length > 10) {
      return <FieldPopover field={field} value={value.toString()} />;
    }
    return <span>{value}</span>;
  }
  const updateField = async (val: string) => {
    const prev = text;
    setText(val);
    updateSubmissionField(submissionId, id, field.config?.tableName, val)
      .then(() => {
        toast.success("Field updated successfully");
      })
      .catch(() => {
        setText(prev);
        toast.error("Error updating field");
      });
  };
  return (
    <FloatingTextArea
      className={
        "w-full bg-transparent border-none  hover:bg-lp-500 duration-300"
      }
      value={text}
      onChange={(e) => updateField(e)}
    />
  );
}
