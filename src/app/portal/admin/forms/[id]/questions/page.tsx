import CodeTextArea from "@/components/primitives/codeTextArea";
import { getForm } from "@/app/portal/admin/actions";

export default async function page({ params }: { params: { id: string } }) {
  const form = await getForm(Number(params.id));
  if (!form) {
    return <div>Form not found</div>;
  }

  const questions = form.questions;
  return (
    <CodeTextArea
      formId={Number(form.id)}
      initialValue={JSON.stringify(questions)}
    />
  );
}
