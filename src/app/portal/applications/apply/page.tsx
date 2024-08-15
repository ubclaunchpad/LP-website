import { getApplication, getApplicationConfig } from "../actions";
import { redirect } from "next/navigation";
import ApplicationForm from "@/components/general/forms/applications/applicationForm";
import { Application } from "@/app/lib/types/questions";

export default async function page({
  params,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const application = await getApplicationConfig();
  function isFormOpen() {
    const now = new Date();
    return now >= application.time.start && now <= application.time.end;
  }

  if (!isFormOpen()) {
    return redirect(`/portal/applications`);
  }

  let answers = await getApplication();
  if (!answers) {
    return redirect(`/portal/applications/`);
  }

  return <ApplicationForm application={answers as unknown as Application} />;
}
