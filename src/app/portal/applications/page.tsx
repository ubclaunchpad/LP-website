import Link from "next/link";
import { getApplicationConfig, getApplicationStatus } from "./actions";


const text = {
  title: "UBC Launch Pad Application Portal",
  open: "Applications are open!",
  closed: "Applications are now closed. Please check back next term.",
  pending:
    "Your application is currently not finished. You have until the deadline to finish it.",
  submitted:
    "Your application has been submitted. If you have any questions, please contact us at strategy@ubclaunchad.com.",
  rejected:
    "Unfortunately, we do not have a spot for you this term. You can reapply next term.",
  accepted: "Congratulations! You have been accepted to UBC Launch Pad.",
  continue: "Continue my application",
  apply: "Apply now",
};

export default async function page() {
  const application = await getApplicationConfig();
  function isFormOpen() {
    const now = new Date();
    return now >= application.time.start && now <= application.time.end;
  }

  const app = await getApplicationStatus();

  const sections: { [key: string]: JSX.Element } = {
    pending: (
      <>
        <h2 className="text-2xl font-heading text-white">
          {isFormOpen() ? text.pending : text.closed}
        </h2>
        {isFormOpen() ? (
          <Link
            href="/portal/applications/apply"
            className="bg-white text-black rounded-md px-8 text-xl p-3"
          >
            {text.continue}
          </Link>
        ) : null}
      </>
    ),
    submitted: (
      <>
        <h2 className="text-2xl font-heading text-white">{text.submitted}</h2>
      </>
    ),
    rejected: (
      <>
        <h2 className="text-2xl font-heading text-white">{text.rejected}</h2>
      </>
    ),
    accepted: (
      <>
        <h2 className="text-2xl font-heading text-white">{text.accepted}</h2>
      </>
    ),
    open: (
      <>
        <h2 className="text-2xl font-heading text-white">{text.open}</h2>
        <Link
          href="/portal/applications/apply"
          className="bg-white text-black rounded-md px-8 text-xl p-3"
        >
          {text.apply}
        </Link>
      </>
    ),
  };

  return (
      <div className="flex flex-col items-center justify-center h-full p-10 gap-10 w-full z-10 *:z-20">
        <h1 className="text-5xl font-heading text-white">{text.title}</h1>
        {isFormOpen() ? (
          app.status ? (
            sections[app.status]
          ) : (
            sections.open
          )
        ) : (
          <h2 className="text-2xl font-heading text-white">{text.closed}</h2>
        )}
      </div>
  );
}
