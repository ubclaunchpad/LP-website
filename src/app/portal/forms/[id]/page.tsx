// page.tsx
import { redirect } from "next/navigation";
import { isFormOpen } from "@/lib/utils/forms/helpers";
import { getForm } from "@/app/portal/admin/actions";
import { getUserApplication } from "@/app/portal/forms/actions";
import { Form } from "@/lib/types/application";
import GenericGreeter from "@/components/layouts/genericGreeter";
import { MainResultPage } from "@/components/forms/resultPages/MainResultPage";

export const runtime = 'edge';

async function getPageData(id: string) {
  const formP = getForm(Number(id)) as unknown as Promise<Form>;
  const appP = getUserApplication({
    formId: Number(id) as unknown as bigint,
  });

  const [form, app] = await Promise.all([formP, appP]);

  if (!form) {
    return null;
  }

  return {
    form,
    status: app?.status,
    formStatus: isFormOpen(form),
  };
}

export default async function Page({
  params,
}: {
  params: { [key: string]: string };
}) {
  if (!params.id) {
    redirect("/portal/forms");
  }

  const pageData = await getPageData(params.id);

  if (!pageData) {
    redirect("/portal/forms");
  }

  const { form, status, formStatus } = pageData;

  return (
    <GenericGreeter useBg>
      <MainResultPage status={status} form={form} formStatus={formStatus} />
    </GenericGreeter>
  );
}
