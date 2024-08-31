import React, { useMemo, useState } from "react";
import { FormFields } from "@/app/portal/admin/forms/[id]/submissions/columns";
import { ColumnDef, flexRender, Row } from "@tanstack/react-table";
import { TableCell } from "@/components/primitives/table";

export default function useApplicantPopover({
  fields,
}: {
  fields: FormFields;
}) {
  const [open, setOpen] = useState(false);
  const [applicant, setApplicant] = useState<Row<string | number> | null>(null);

  function setAndOpen({ applicant }: { applicant: Row<string | number> }) {
    setApplicant(applicant);
    setOpen(true);
  }

  const applicantPopover = useMemo(() => {
    if (!applicant || !open) return null;
    console.log(applicant.getVisibleCells());
    console.log(fields);
    return (
      <div
        className={
          "fixed inset-0 flex-col  bg-black bg-opacity-50 flex items-end justify-end h-screen p-2 w-screen z-30"
        }
      >
        <button
          className={"absolute w-screen h-screen bg-transparent"}
          onClick={() => setOpen(false)}
        ></button>
        <div className="flex z-40 flex-col flex-shrink-0 gap-2 bg-background-800  overflow-y-scroll border border-background-700 shadow p-4 max-w-xl min-w-[400px]  flex-1 rounded-lg">
          {applicant.getVisibleCells().map((cell, index) => (
            <TableCell
              key={cell.id}
              className={
                "w-full border-b border-b-background-500 flex-shrink-0  flex  flex-col gap-2  pb-4 pl-0  text-xs  left-0  "
              }
            >
              {fields[cell.column.id] && (
                <div className={"flex gap-2"}>
                  <span className={"font-semibold"}>
                    {fields[cell.column.id].label}
                  </span>
                  {/*<span>{cell.value}</span>*/}
                  {/*<span>{cell.value}</span>*/}
                </div>
              )}
              <div className={"flex gap-2 "}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            </TableCell>
          ))}
        </div>
        {/*<button onClick={() => setOpen(false)}>Close</button>*/}
      </div>
    );
  }, [applicant, open]);

  return {
    open,
    setOpen,
    setApplicant,
    applicant,
    applicantPopover: applicantPopover,
    setAndOpen,
  };
}
