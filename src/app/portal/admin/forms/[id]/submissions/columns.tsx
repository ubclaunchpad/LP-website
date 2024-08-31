import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { ExpandIcon } from "lucide-react";
import MultiSelect from "@/components/general/multiSelect";

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
    options?: { label: string; value: string }[];
    cell?: (row: any) => string;
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
      cell: ({ row }: { row: any }) => {
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
            console.log(value);
            if (field.label === "Status") {
              return <ApplicationStatus status={value.toString()} />;
            }
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

          return row.getValue(key);
        }
      },
    };
  });
  return [
    {
      accessorKey: "popover",
      header: "Applicant",
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

function ApplicationStatus({ status }: { status: string }) {
  const [option, setOption] = useState(status);
  const options = [
    {
      id: "to review",
      label: "To Review",
      description:
        "The initial status for all applications, indicating that the application has been received and is awaiting review.",
    },
    {
      id: "reviewed",
      label: "Reviewed",
      description:
        "The application has been reviewed by the admissions team, but a decision has not yet been made on whether to proceed to the interview stage.",
    },
    {
      id: "to_interview",
      label: "To Interview",
      description:
        "The application has passed the initial review. The candidate meets the required criteria and falls within the interview quota, making them eligible for the interview stage.",
    },
    {
      id: "interviewed",
      label: "Interviewed",
      description:
        "The candidate has completed a 30-minute interview. The admissions team is now deliberating on whether to extend an offer based on both the application and interview performance.",
    },
    {
      id: "offered",
      label: "Offered",
      description:
        "The candidate has successfully met all application and interview criteria. An offer has been extended to join the program or cohort.",
    },
    {
      id: "declined",
      label: "Declined",
      description:
        "The candidate has chosen to reject the offer extended to them and will not be joining the program.",
    },
    {
      id: "rejected",
      label: "Rejected",
      description:
        "The candidate did not meet the necessary criteria at one or more stages of the process and has been informed that their application will not proceed further.",
    },
    {
      id: "accepted",
      label: "Accepted",
      description:
        "The candidate has accepted the offer to join the program and has completed any necessary formalities, such as paying the membership fee.",
    },
  ];
  return (
    <MultiSelect
      options={options.map((op) => ({
        label: op.label,
        value: op.id,
      }))}
      value={[option]}
      onChange={(e) => setOption(e[0])}
      allowMultiple={false}
    />
  );
}
