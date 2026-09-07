import NewFormDialog from "@/components/portal/admin/newFormDialog";
import CloneFormButton from "@/components/portal/admin/cloneFormButton";
import { getForms } from "@/app/portal/admin/actions";
import Link from "next/link";
import { Form } from "@/lib/types/application";

export default async function Page() {
  const forms = (await getForms()) as unknown as Form[];
  return (
    <div className="flex flex-col gap-4 flex-1 w-full min-h-dvh p-4">
      <div className="flex justify-between items-center gap-2">
        <div></div>
        <NewFormDialog />
      </div>
      <ul className="flex flex-col gap-2 py-2 w-full">
        {forms.map((form) => (
          <li key={form.id} className="flex flex-col gap-2">
            <div className="border flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-background-800 w-full bg-zinc-900 text-lg px-4 hover:bg-lp-500 p-2 rounded duration-300">
              <Link
                href={`/portal/admin/forms/${form.id}`}
                className="flex flex-row gap-2 flex-1 min-w-0"
              >
                <span className="truncate">{form.title}</span>
              </Link>
              <div className="flex text-sm flex-row gap-2 items-center">
                <span className="hidden sm:inline">{form.open_at?.toLocaleDateString()}</span>
                {form.close_at && <span className="hidden sm:inline"> - </span>}
                <span className="hidden sm:inline">{form.close_at?.toLocaleDateString()}</span>
                <CloneFormButton formId={Number(form.id)} formTitle={form.title} />
              </div>
            </div>
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
