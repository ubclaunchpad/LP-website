import { Form } from "@/lib/types/application";
import Link from "next/link";

const text = {
  pending:
    "Your form is still in progress.",
  deadline: "Make sure to submit by $.",
  continue: "Continue my application",
};

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric" , hour: "numeric", minute: "numeric"});
}


export default function PendingForm({ application }: { application: Form }) {

  return (
    <div className="flex flex-col items-center justify-center h-full p-10 gap-10 w-full z-10 *:z-20">
      <div className="flex flex-col w-full  max-w-3xl gap-10 flex-1  p-10">
        <h1 className="text-5xl text-left w-full font-heading text-white">
          {application.title}
        </h1>
        <div className="flex flex-col justify-between gap-3">
          <h2 className="text-xl  font-heading text-white">
            {text.pending}
          </h2>
          {application.close_at && <p className="text-lg pb-4 text-white">
                {text.deadline.replace("$", formatDate(application.close_at))}
            </p>}
          <Link
            href={`/portal/forms/${application.id}/apply`}
            className="bg-white w-fit h-fit flex-shrink-0 text-black rounded-lg px-4 text-lg p-2"
          >
            {text.continue}
          </Link>
        </div>
      </div>
    </div>
  );
}
