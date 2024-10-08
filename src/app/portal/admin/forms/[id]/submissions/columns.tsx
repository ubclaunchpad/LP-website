import { ColumnDef, Row } from "@tanstack/react-table";
import { useContext, useEffect, useState } from "react";
import MultiSelect from "@/components/general/multiSelect";
import {
  sendStatusEmailToUser,
  updateSubmissionField,
} from "@/app/portal/admin/actions";
import { toast } from "sonner";
import FloatingTextArea from "@/components/primitives/floatingTextArea";
import { Button } from "@/components/primitives/button";
import { formContext } from "@/components/layouts/formTabView";
import {
  CircleCheckIcon,
  LoaderCircleIcon,
  MailIcon,
  Maximize2Icon,
} from "lucide-react";

export type FormFields = {
  [key: string]: {
    id: string | undefined;
    type:
      | "number"
      | "select"
      | "email"
      | "text"
      | "date"
      | "textarea"
      | "checkbox"
      | "url"
      | "person";
    meta?: any;
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

export type ReferenceItem = {
  id: string;
  label: string;
};

export type ReferenceMap = {
  [key: string]: ReferenceItem | ReferenceMap | string;
};

export function populateReferenceMap(
  fields: FormFields,
  others: { id: string; label: string; options: any[] }[],
) {
  const referenceMap: ReferenceMap = {};
  Object.entries(fields).forEach(([key, field]) => {
    if (field.type === "person") {
      referenceMap[key] = "members";
    }
    if (field.type === "select") {
      if (!field.options) {
        return;
      }

      referenceMap[key] = field.options?.reduce((acc: ReferenceMap, option) => {
        acc[option.id] = option;
        return acc;
      }, {});
    }
  });
  others.forEach((other) => {
    const ref: ReferenceMap = {};
    other.options.forEach((option) => {
      ref[option.id] = option;
    });
    referenceMap[other.id] = ref;
  });

  return referenceMap;
}

export function createColumns<TData>(
  fields: FormFields,
  members: { id: string; email: string; display_name: string | undefined }[],
  setAndOpen: any,
): ColumnDef<keyof FormFields>[] {
  const general: any[] = Object.entries(fields).map(([key, field]) => {
    return {
      meta: { field: field, id: key },
      accessorKey: key as keyof TData,
      size: 250,
      header: (body: any) => {
        if (!body) {
          return <span>{field.label}</span>;
        }
        const column = body.column;
        return (
          <Button
            className={
              " hover:bg-transparent flex text-left justify-start items-start min-h-none h-fit p-0 w-full bg-transparent "
            }
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {field.label}
          </Button>
        );
      },
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
          console.log(filterValue);
          if (!field.options) {
            return row.original[key]
              .toString()
              .toLowerCase()
              .includes(filterValue.toLowerCase());
          }

          const matchCriteria = field.options?.filter((op) =>
            filterValue.includes(op.id),
          );
          return (
            matchCriteria?.filter((op) => {
              if (
                row.original[key] === null ||
                row.original[key] === undefined
              ) {
                return false;
              }
              return row.original[key]
                .toString()
                .toLowerCase()
                .includes(op.id.toLowerCase());
            }).length > 0
          );
        }

        if (!row.original[key]) {
          return false;
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

          if (field.type === "person") {
            const submissionId = row.original.id;
            const memberOptions = members.map((member) => ({
              ...member,
              label: member.display_name || member.email,
            }));
            return (
              <div>
                <SelectField
                  options={memberOptions}
                  field={field}
                  value={value?.toString()}
                  submissionId={submissionId}
                  id={key}
                />
              </div>
            );
          }

          if (field.type === "select") {
            const submissionId = row.original.id;
            return (
              <SelectField
                options={field.options}
                field={field}
                value={value?.toString()}
                submissionId={submissionId}
                id={key}
              />
            );
          }

          if (!value) {
            return <span className={"text-gray-400"}>N/A</span>;
          }
          if (field.type === "date") {
            const date = new Date(row.original[key]);
            return date.toDateString();
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
          return row.getValue(key);
        }
      },
    };
  });
  return [
    {
      accessorKey: "popover",
      header: "Actions",
      enableColumnFilter: false,
      size: 300,
      maxSize: 300,
      cell: ({ row }) => {
        return (
          <div className="flex gap-2 flex-1  justify-start items-center  rounded-lg  ">
            <button
              onClick={() => {
                setAndOpen({ applicant: row });
              }}
              className={
                "  h-fit bg-background-500 rounded-md p-2   w-fit  flex  border border-transparent hover:border-background-500 items-center justify-center gap-2  "
              }
            >
              <Maximize2Icon className=" h-3 w-3" />
              View
            </button>
            <NotifyButtonForEmail row={row} />
          </div>
        );
      },
    },
    ...general,
  ];
}

function NotifyButtonForEmail({ row }: { row: any }) {
  const [emailState, setEmailState] = useState<"idle" | "loading" | "sent">(
    "idle",
  );

  useEffect(() => {
    if (emailState === "sent") {
      const timer = setTimeout(() => {
        setEmailState("idle");
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [emailState]);

  return (
    <button
      onClick={async () => {
        setEmailState("loading");
        await sendStatusEmailToUser(row.original.id, row.original.status);
        setEmailState("sent");
      }}
      className={
        "disabled:opacity-55 text-neutral-200 rounded-md p-2 bg-background-500 h-fit w-fit  flex  border border-transparent hover:border-background-500 items-center justify-center gap-2  "
      }
    >
      {emailState === "loading" && (
        <span className={"text-xs flex items-center gap-2"}>
          <LoaderCircleIcon className={"w-3 h-3 animate-spin"} />
          Sending Email...
        </span>
      )}
      {emailState === "sent" && (
        <span className={"text-xs flex items-center gap-2"}>
          <CircleCheckIcon className={"w-3 h-3"} />
          Email Sent
        </span>
      )}
      {emailState === "idle" && (
        <span className={"text-xs flex items-center gap-2"}>
          <MailIcon className={"w-3 h-3"} />
          {row.original.notified_on ? "Resend Email" : "Notify via Email"}
        </span>
      )}
    </button>
  );
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

export function SelectField({
  submissionId,
  value,
  field,
  id,
  options,
}: {
  submissionId: string;
  value: string;
  id: string;
  options: { label: string; id: string }[] | undefined;
  field: FormFields[keyof FormFields];
}) {
  const nullLabel = field.options?.find((op) => op.id === null)?.label;
  const fOptions = field.options || [];
  const overrideOptions = options || [];
  const optionsMap = new Map();

  fOptions.forEach((option) => {
    if (option.id === null) {
      return;
    }
    optionsMap.set(option.id, option);
  });

  overrideOptions.forEach((option) => {
    if (option.id === null) {
      return;
    }
    optionsMap.set(option.id, option);
  });

  const selectOptions = Array.from(optionsMap.values());
  const [selected, setSelected] = useState(value);
  const canUpdate = field.config?.allowUpdate;
  const { mergeNewData } = useContext(formContext);
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
    const setVal = val === undefined || val === null || val === "" ? null : val;
    setSelected(setVal);
    updateSubmissionField(submissionId, id, field.config?.tableName, setVal)
      .then(() => {
        // mergeNewData({ [id]: val }, "id", submissionId);
        toast.success("Field updated successfully");
      })
      .catch(() => {
        setSelected(prev);
        toast.error("Error updating field");
      });
  };

  return (
    <>
      <MultiSelect
        className={
          "w-full bg-transparent border-none hover:bg-lp-500 duration-300"
        }
        onChange={(e) => updateField(e[0])}
        allowMultiple={false}
        emptyText={nullLabel?.toString() || "None"}
        value={Array.isArray(selected) ? selected : [selected]}
        options={
          selectOptions?.map((op) => ({
            label: op.label,
            value: op.id,
          })) || []
        }
      ></MultiSelect>
    </>
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
  const { mergeNewData } = useContext(formContext);
  const canUpdate = field.config?.allowUpdate;
  if (!canUpdate) {
    if (value?.toString().length > 10) {
      return <FieldPopover field={field} value={value.toString()} />;
    }
    return <span>{value}</span>;
  }
  const updateField = async (val: string) => {
    const prev = text;
    const setVal = val === undefined || val === null || val === "" ? null : val;
    setText(setVal);
    updateSubmissionField(submissionId, id, field.config?.tableName, setVal)
      .then(() => {
        mergeNewData({ [id]: setVal }, "id", submissionId);
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
