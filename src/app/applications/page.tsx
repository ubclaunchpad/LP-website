import Link from "next/link";
import { getApplicationConfig } from "./actions";

const text = {
  title: "UBC Launch Pad Application Portal",
  open: "Applications are open!",
  closed: "Applications are closed.",
  apply: "Start Application",
};

export default async function page() {
  const application = await getApplicationConfig();
  function isFormOpen() {
    const now = new Date();
    return now >= application.time.start && now <= application.time.end;
  }

  return (
    <div className="w-screen h-screen bg-neutral-950  ">
      <div className="flex flex-col items-center justify-center h-full m gap-10 w-full">
        <h1 className="text-6xl font-heading text-white">{text.title}</h1>
        {isFormOpen() ? (
          <Link
            href="/applications/apply?state=form&step=1"
            className="bg-white text-black rounded-md px-8 text-xl p-3"
          >
            {text.apply}
          </Link>
        ) : (
          <h2 className="text-2xl font-heading text-white">{text.closed}</h2>
        )}
      </div>
    </div>
  );
}
