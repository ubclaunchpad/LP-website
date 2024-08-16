import { getApplication, getApplicationInfo } from "../../actions";
import { redirect } from "next/navigation";
import ApplicationForm from "@/components/general/forms/applications/applicationForm";
import { Application } from "@/app/lib/types/questions";
import { isFormOpen } from "@/app/lib/util/formHelpers";

export default async function page({
  params,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const application = await getApplicationInfo({ id: params.id });

  if (!application) {
    return redirect(`/portal`);
  }

  if (!isFormOpen(application)) {
    return redirect(`/portal/applications/${params.id}`);
  }

  let answers = await getApplication();
  if (!answers || answers.status !== "pending") {
    return redirect(`/portal/applications/${params.id}`);
  }

  return (
    <ApplicationForm
      application={answers as unknown as Application}
      applicationForm={application}
    />
  );
}
