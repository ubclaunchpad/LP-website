// resultPage.tsx
import { Form } from "@/lib/types/application";
import {
  GenericResult,
  AcceptedResult,
  SubmittedResult,
  PendingResult,
  OpenResult,
} from "@/components/forms/resultPages";
import { Application } from "@/lib/types/questions";
import GenericGreeter from "@/components/layouts/genericGreeter";
import OfferPage from "../applications/offerPage";

const text = {
  closed: "This form is now closed.",
  rejected:
    "Unfortunately, it looks like your application was not successful this time. However, we encourage you to apply again in the future.",
  default: "No longer available",
};

interface ResultPageProps {
  status: string | null | undefined;
  application: Application | undefined;
  form: Form;
  formStatus: boolean;
}

function renderTerminalPage(status: string, form: Form, app?: Application) {
  switch (status) {
    case "accepted":
      return <AcceptedResult application={form} />;
    case "rejected":
      return <GenericResult application={form} message={text.rejected} />;
    case "submitted":
      return <SubmittedResult application={form} />;
    case "offered":
      return app && app.applications.status ? (
        <GenericGreeter>
          <OfferPage form={form} app={app} />
        </GenericGreeter>
      ) : (
        <div>Application not available</div>
      );
    default:
      return <span className="text-red-500">{status}</span>;
  }
}

function renderConditionalPage(
  status: string | null | undefined,
  form: Form,
  formOpen: boolean,
) {
  if (!status) {
    return formOpen ? (
      <OpenResult form={form} />
    ) : (
      <GenericResult application={form} message={text.closed} />
    );
  }

  if (status === "pending") {
    return formOpen ? (
      <PendingResult application={form} />
    ) : (
      <GenericResult application={form} message={text.closed} />
    );
  }

  return null;
}

export function MainResultPage({
  status,
  form,
  formStatus,
  application: app,
}: ResultPageProps) {
  const terminalStatuses = ["accepted", "rejected", "submitted", "offered"];

  if (terminalStatuses.includes(status as string)) {
    return renderTerminalPage(status as string, form, app);
  }

  return renderConditionalPage(status, form, formStatus);
}
