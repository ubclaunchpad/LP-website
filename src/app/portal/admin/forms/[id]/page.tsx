import Link from "next/link";
import { getForm } from "@/app/portal/admin/actions";

const navItems = [
  {
    label: "Questions",
    rel: "questions",
  },
  {
    label: "Submissions",
    rel: "submissions",
  },
  {
    label: "Settings",
    rel: "settings",
  },
  {
    label: "Preview",
    rel: "preview",
  },
];

export default async function page({ params }: { params: { id: string } }) {
  if (!params.id) {
    return <ErrorDiv />;
  }
  const form = await getForm(Number(params.id));
  if (!form) {
    return <ErrorDiv />;
  }

  return (
    <div className="flex flex-col gap-4 flex-1 w-full overflow-hidden">
      <div
        className={
          "flex flex-col  justify-center items-center w-full gap-2 p-2"
        }
      >
        <section className=" gap-4 flex-1 w-full overflow-hidden grid-cols-2 grid max-w-3xl">
          {navItems.map((item, index) => (
            <Link
              key={index}
              className="flex flex-col
                    items-center
                    justify-center
                    text-3xl
                     gap-2 border rounded h-60 bg-background-800 flex-1 p-2"
              href={`/portal/admin/forms/${form.id}/${item.rel}`}
            >
              {item.label}
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}

function ErrorDiv() {
  return (
    <div className="flex flex-col gap-4 flex-1 w-full p-4">
      <div className="flex justify-between items-center gap-2">
        <div></div>
        <Link
          href={"/portal/admin/forms"}
          className="border flex items-center justify-between border-background-800 w-full bg-background-900 text-lg px-4 hover:bg-lp-500 p-2 rounded duration-300"
        >
          <div className="flex flex-row gap-2">
            <span>Back</span>
          </div>
        </Link>
      </div>
      <div className="w-full flex justify-center">Form not found</div>
    </div>
  );
}
