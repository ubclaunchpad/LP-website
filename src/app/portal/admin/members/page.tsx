"use client";
import { objectToQueryString } from "@/lib/utils/helpers";
import useSWRF from "@/lib/context/useSWRF";
import { Button } from "@/components/primitives/button";
import { DataTable } from "../../../../components/forms/applications/data-table";
import { FormFields } from "../../../../components/forms/applications/columns";
import { ColumnDef } from "@tanstack/react-table";
import { isNil } from "lodash";
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
    columnOrder: [
      "firstName",
      "lastName",
      "email",
      "teams",
      "discordId",
      "githubUsername",
    ],
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div className="flex-1 min-h-screen">error</div>;
  }

  return (
    <div className="w-full min-h-screen flex-1 flex flex-col">
      <div className="flex px-10 py-4">
        <h1 className="text-2xl font-normal">Members</h1>
      </div>
      {!isNil(members) && members.length > 0 ? (
        <DataTable
          data={members}
          columns={createColumns(Object.keys(members[0]))}
          config={config}
          refMap={{}}
        />
      ) : (
        <div className="flex items-center justify-center">
          <span>No Members</span>
        </div>
      )}
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

type MemberResult = {
  members: string[];
  error: string | undefined;
  isLoading: boolean;
};

function useMembers({ filters }: MemberQuery) {
  const { data, error, isLoading } = useSWRF({
    url: `/portal/api/v1/members?${objectToQueryString(filters)}`,
  });

  const result: MemberResult = {
    members: data,
    error,
    isLoading,
  };

  return result;
}
