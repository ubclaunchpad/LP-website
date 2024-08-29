import Link from "next/link";
import {redirect} from "next/navigation";

export default function page({ params }: { params: { id: string } }) {
  if (!params.id) {
    return <ErrorDiv />;
  }
  redirect(`/portal/admin/forms/${params.id}/submissions`);
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
