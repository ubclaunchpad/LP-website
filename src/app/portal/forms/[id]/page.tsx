import { redirect } from "next/navigation";
import { isFormOpen } from "@/lib/utils/forms/helpers";
import {
  GenericResult,
  AcceptedResult,
  PendingResult,
  OpenResult,
} from "@/components/forms/resultPages";
import { getForm } from "@/app/portal/admin/actions";
import { getUserApplication } from "@/app/portal/forms/actions";
import { Form } from "@/lib/types/application";
import GenericGreeter from "@/components/layouts/genericGreeter";

const text = {
  closed: "This form is now closed.",
  submitted: "Your application has been submitted.",
  rejected:
    "Unfortunately, it looks like your application was not successful this time. However, we encourage you to apply again in the future.",
  default: "No longer available",
};

export default async function page({
  params,
}: {
  params: { [key: string]: string };
}) {
  if (!params.id) {
    redirect("/portal/forms");
  }
  const formP = getForm(Number(params.id)) as unknown as Promise<Form>;
  const appP = getUserApplication({
    formId: Number(params.id) as unknown as bigint,
  });
  const [form, app] = await Promise.all([formP, appP]);

  if (!form) {
    redirect("/portal/forms");
  }

  const status = app?.status;
  const formStatus = isFormOpen(form);

  let subpage = null;

  switch (status) {
    case "submitted":
    case "rejected":
    case "accepted":
      subpage = renderTerminalPage(status, form);
      break;
    case "pending":
    default:
      subpage = renderConditionalPage(status, form, formStatus);
  }
  return <GenericGreeter>{subpage}</GenericGreeter>;
}

function renderTerminalPage(status: string, form: any) {
  const terminalStatus = ["accepted", "rejected", "submitted"];
  if (terminalStatus.includes(status)) {
    switch (status) {
      case "accepted":
        return <AcceptedResult application={form} />;
      case "rejected":
        return <GenericResult application={form} message={text.rejected} />;
      case "submitted":
        return <GenericResult application={form} message={text.submitted} />;
    }
  }
}

function renderConditionalPage(
  status: string | null | undefined,
  form: any,
  formOpen: boolean,
) {
  const conditionalStatus = ["pending"];
  if (!status) {
    if (!formOpen) {
      return <GenericResult application={form} message={text.closed} />;
    } else {
      return <OpenResult form={form} />;
    }
  }
  if (conditionalStatus.includes(status)) {
    if (!formOpen) {
      return <GenericResult application={form} message={text.closed} />;
    }
    switch (status) {
      case "pending":
        return <PendingResult application={form} />;
    }
  }
}
