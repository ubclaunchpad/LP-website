import { getUserApplication } from "../../actions";
import { redirect } from "next/navigation";
import ApplicationForm from "@/components/forms/applications/applicationForm";
import { Application } from "@/lib/types/questions";
import { getFormById } from "@/lib/utils/forms/server";
import { Form } from "@/lib/types/application";
import { isFormOpen } from "@/lib/utils/forms/helpers";
import { toast } from "sonner";

export default async function page({
  params,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const form = (await getFormById(Number(params.id))) as unknown as Form;

  if (!form) {
    return redirect(`/portal`);
  }

  if (!isFormOpen(form)) {
    return redirect(`/portal/forms/`);
  }

  try {
    const app = await getUserApplication({ formId: BigInt(params.id) });
    if (!app || app.status !== "pending") {
      return redirect(`/portal/forms/${params.id}`);
    }

    return (
      <ApplicationForm
        application={app as unknown as Application}
        applicationForm={form as unknown as Form}
      />
    );
  } catch (e) {
    return redirect(`/portal/forms/${params.id}`);
  }
}
