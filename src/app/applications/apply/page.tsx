import { getApplicationConfig } from "../actions";
import { redirect } from "next/navigation";
import ApplicationForm from "@/components/general/forms/applications/applixationForm";


const formAnswers = {
   "first-name": "John",
    "last-name": "Doe",
    "email": "jon2@doe.com",
    "graduation-year": 2024,
}


export default async function page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { step } = searchParams;
  const application = await getApplicationConfig();
  function isFormOpen() {
    const now = new Date();
    return now >= application.time.start && now <= application.time.end;
  }

  if (!isFormOpen()) {
    return redirect(`/applications`);
  }

  return <ApplicationForm step={parseInt(step as string)} formAnswers={formAnswers} />;
}
