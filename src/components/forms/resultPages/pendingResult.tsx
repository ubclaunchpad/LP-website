import { Form } from "@/lib/types/application";
import Link from "next/link";

const text = {
  pending:
    "Your application is currently not finished. You have until the deadline to finish it.",
  continue: "Continue my application",
};

export default function PendingForm({ application }: { application: Form }) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-10 gap-10 w-full z-10 *:z-20">
      <div className="flex flex-col w-full  max-w-3xl gap-10 flex-1  p-10">
        <h1 className="text-5xl text-left w-full font-heading text-white">
          {application.title}
        </h1>
        <div className="flex  justify-between gap-10">
          <h2 className="text-xl  font-heading text-white">{text.pending}</h2>
          <Link
            href={`/portal/applications/${application.id}/apply`}
            className="bg-white w-fit h-fit flex-shrink-0 text-black rounded-lg px-4 text-lg p-2"
          >
            {text.continue}
          </Link>
        </div>
      </div>
    </div>
  );
}
