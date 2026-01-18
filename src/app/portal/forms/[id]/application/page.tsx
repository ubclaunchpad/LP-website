import { redirect } from "next/navigation";
import { GenericResult, AcceptedResult } from "@/components/forms/resultPages";
import { getForm } from "@/app/portal/admin/actions";
import { getUserApplication } from "@/app/portal/forms/actions";
import { Form } from "@/lib/types/application";
import GenericGreeter from "@/components/layouts/genericGreeter";
import OfferPage from "@/components/forms/applications/offerPage";

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
    includeApp: true,
  });
  const [form, app] = await Promise.all([formP, appP]);

  if (!form) {
    redirect("/portal/forms");
  }
  if (!app || !app.applications) {
    redirect("/portal/forms");
  }

  const userApp = app.applications;
  const status = userApp.status;
  let subpage = null;

  switch (status) {
    case "submitted":
    case "rejected":
      subpage = renderTerminalPage(status, form);
      break;
    case "accepted":
    case "declined":
    case "offered":
      subpage = <OfferPage form={form} app={app} />;
      break;
    case "pending":
    default:
      subpage = null;
  }
  return <GenericGreeter>{subpage}</GenericGreeter>;
}

function renderTerminalPage(status: string, form: any) {
  const terminalStatus = ["rejected", "submitted"];
  if (terminalStatus.includes(status)) {
    switch (status) {
      case "rejected":
        return <GenericResult application={form} message={text.rejected} />;
      case "submitted":
        return <GenericResult application={form} message={text.submitted} />;
    }
  }
}
