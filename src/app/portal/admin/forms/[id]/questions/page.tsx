"use client";

import CodeTextArea from "@/components/primitives/codeTextArea";
import {useContext} from "react";
import {formContext} from "@/components/layouts/formTabView";

export default function FormQuestionsEditorPage() {
  const { rawForm } = useContext(formContext);
  const questions = rawForm.questions;

  return (
    <CodeTextArea
      formId={Number(rawForm.id)}
      initialValue={JSON.stringify(questions)}
    />
  );
}
