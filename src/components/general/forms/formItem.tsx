"use client";

import { FormQuestion } from "@/app/lib/types/questions";
import formQuestionMapper from "./formMapper";
import { useFormField } from "./applications/applicationForm";

export default function FormItemInput({
  question,
}: {
  question: FormQuestion;
}) {
  const formField = useFormField(question.id);

  return (
    <div className="flex flex-col gap-2 w-full">
      <div
        className={`flex  gap-2 ${
          question.label.length > 45 ? "flex-col" : "lg:flex-row flex-col"
        }`}
      >
        <label
          className={`flex   flex-shrink-0  pt-2 gap-1 ${
            question.label.length > 45 ? "w-full" : "w-60 min-w-60 "
          }`}
        >
          <span className="">{question.label}</span>
          {question.config.isRequired && (
            <span className="text-red-500">*</span>
          )}
        </label>
        <div className="flex flex-col items-center  w-full gap-2 relative *:w-full">
          {formQuestionMapper({
            question: question,
            value: formField.value,
            OnChange: formField.eventHandlers.onChange,
            // onFocus: handleOnFocus,
            // onBlur: handleBlur,
          })}
          <span className="text-red-500 px-1 h-6 text-sm">
            {formField.errors.error
              ? formField.errors.error.issues[0].message
              : ""}
          </span>
        </div>
      </div>
    </div>
  );
}
