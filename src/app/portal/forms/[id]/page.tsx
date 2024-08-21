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
    redirect("/portal/forms");
  }
  const form = (await getForm(Number(params.id))) as unknown as Form;

  if (!form) {
    redirect("/portal/forms");
  }

  const app = await getUserApplication({
    formId: form.id as unknown as bigint,
  });
  const status = app?.status;
  const formStatus = isFormOpen(form);

  switch (status) {
    case "submitted":
    case "rejected":
    case "accepted":
      return renderTerminalPage(status, form);
    case "pending":
    default:
      return renderConditionalPage(status, form, formStatus);
  }
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
