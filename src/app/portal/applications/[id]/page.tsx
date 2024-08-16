import { getApplicationInfo, getApplicationStatus } from "../actions";
import { redirect } from "next/navigation";
import { isFormOpen } from "@/app/lib/util/formHelpers";
import {
  GenericResult,
  AcceptedResult,
  PendingResult,
  OpenResult,
} from "@/components/general/forms/resultPages";

const text = {
  closed: "Applications are now closed. Please check back next term.",
  submitted:
    "Your application has been submitted. If you have any questions, please contact us at strategy@ubclaunchad.com.",
  rejected:
    "Unfortunately, it looks like your application was not successful this time. However, we encourage you to apply again in the future.",
  default: "An error occurred. Please try again later.",
};

export default async function page({
  params,
}: {
  params: { [key: string]: string };
}) {
  if (!params.id) {
    redirect("/portal/applications");
  }
  const application = await getApplicationInfo({ id: params.id });

  if (!application || application === null) {
    redirect("/portal/applications");
  }

  const app = await getApplicationStatus();
  const status = app.status;

  switch (status) {
    case "open":
      if (isFormOpen(application)) {
        return <OpenResult application={application} />;
      } else {
        return (
          <GenericResult application={application} message={text.closed} />
        );
      }
    case "pending":
      return <PendingResult application={application} />;
    case "submitted":
      return (
        <GenericResult application={application} message={text.submitted} />
      );
    case "rejected":
      return (
        <GenericResult application={application} message={text.rejected} />
      );
    case "accepted":
      return <AcceptedResult application={application} />;
    default:
      return <GenericResult application={application} message={text.default} />;
  }
}
