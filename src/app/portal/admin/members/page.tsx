"use client";
import { objectToQueryString } from "@/lib/utils/helpers";
import useSWRF from "@/lib/context/useSWRF";
import { Button } from "@/components/primitives/button";
import { DataTable } from "../forms/[id]/submissions/data-table";
import { FormFields } from "../forms/[id]/submissions/columns";
import { ColumnDef } from "@tanstack/react-table";
import Loading from "../../loading";

function createColumns<TData>(fields: any[]): ColumnDef<keyof FormFields>[] {
  const general: any[] = fields.map((field) => {
    return {
      meta: { field: field, id: field },
      accessorKey: field as keyof TData,
      size: 250,
      header: (body: any) => {
        if (!body) {
          return <span>{field}</span>;
        }
        const column = body.column;
        return (
          <Button
            className={
              " hover:bg-transparent flex text-left justify-start items-start min-h-none h-fit p-0 w-full bg-transparent "
            }
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {field}
          </Button>
        );
      },
      cell: ({ row }: { row: any }) => {
        const value = row.getValue(field);
        if (typeof value === "object") {
          if (Array.isArray(value)) {
            return value
              .map((v) => {
                return Object.values(v).join(", ");
              })
              .join(";");
          }
          return <span>{JSON.stringify(value)}</span>;
        } else {
          return row.getValue(field);
        }
      },
    };
  });
  return general;
}

export default function MembersDatabase() {
  const { members, error, isLoading } = useMembers({ filters: {} });
  const config = {
    columnOrder: ["firstName", "lastName", "email", "teams"],
  };
  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div className="flex-1 min-h-screen">error</div>;
  }

  const columns = createColumns(Object.keys(members[0]));
  return (
    <div className="w-full flex-1 flex flex-col">
      <div className="flex px-10 py-4">
        <h1 className="text-2xl font-normal">Members</h1>
      </div>
      <DataTable data={members} columns={columns} config={config} />
    </div>
  );
}

type MemberQuery = {
  filters: {
    startYear?: number | undefined;
    endYear?: number | undefined;
    name?: string | undefined;
  };
};

function useMembers({ filters }: MemberQuery) {
  const { data, error, isLoading } = useSWRF({
    url: `/portal/api/v1/members?${objectToQueryString(filters)}`,
  });
  return {
    members: data,
    error,
    isLoading,
  };
}
