import { ApplicationRound } from "@/app/lib/types/application";
import Link from "next/link";

const text = {
  title: "UBC Launch Pad Application Portal",
  open: "Applications are open!",
  apply: "Apply now",
};

export default function OpenForm({
  application,
}: {
  application: ApplicationRound;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-10 gap-10 w-full z-10 *:z-20">
      <div className="flex flex-col w-full  max-w-3xl gap-10 flex-1  p-10">
        <h1 className="text-5xl text-left w-full font-heading text-white">
          {application.title}
        </h1>
        <div className="flex items-center justify-between gap-10">
          <h2 className="text-xl  font-heading text-white">{text.open}</h2>
          <Link
            href={`/portal/applications/${application.id}/apply`}
            className="bg-white w-fit text-black rounded-lg px-4 text-lg p-2"
          >
            {text.apply}
          </Link>
        </div>
      </div>
    </div>
  );
}
