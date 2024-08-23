import NewFormDialog from "@/components/portal/admin/newFormDialog";
import { getForms } from "@/app/portal/admin/actions";
import Link from "next/link";
import { Form } from "@/lib/types/application";

// TODO: Replace dialog with built-in HTML dialog
export default async function Page() {
  const forms = (await getForms()) as unknown as Form[];

  return (
    <div className="flex flex-col gap-4 flex-1 w-full p-4">
      <div className="flex justify-between items-center gap-2">
        <div></div>
        <NewFormDialog />
      </div>
      <ul className="flex flex-col gap-2 py-2 w-full">
        {forms.map((form) => (
          <li key={form.id} className="flex flex-col gap-2">
            <Link
              href={`/portal/admin/forms/${form.id}`}
              className="border flex items-center justify-between border-background-800 w-full bg-background-900 text-lg px-4 hover:bg-lp-500 p-2 rounded duration-300"
            >
              <div className="flex flex-row gap-2">
                <span>{form.title}</span>
              </div>
              <div className="flex text-sm flex-row gap-2">
                <span>{form.open_at?.toLocaleDateString()}</span>
                {form.close_at && <span> - </span>}
                <span>{form.close_at?.toLocaleDateString()}</span>
              </div>
            </Link>
          </li>
        ))}
        {!forms ||
          (forms.length === 0 && (
            <div className={"w-full flex justify-center"}>No forms found</div>
          ))}
      </ul>
    </div>
  );
}
