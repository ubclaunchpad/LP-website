import { getSubmissions, getUsers } from "@/app/portal/admin/actions";
import DataTableWrapper from "@/app/portal/admin/forms/[id]/submissions/dataTableWrapper";

async function getData<T>(formId: string | undefined): Promise<T[]> {
  if (!formId) {
    return [];
  }
  return (await getSubmissions(parseInt(formId))) as unknown as T[];
}

export default async function DemoPage({ params }: { params: { id: string } }) {
  const users = await getUsers();
  const data = await getData<any>(params.id);

  return (
    <div className="overflow-hidden max-w-screen p-10 py-1">
      <DataTableWrapper users={users} data={data} />
    </div>
  );
}
