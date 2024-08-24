"use client";

import { FormItem, FormQuestion } from "@/lib/types/questions";
import formQuestionMapper from "./formMapper";

export default function FormItemInput({
  expanded = false,
  questionData,
  question,
}: {
  expanded?: boolean;
  questionData: FormItem;
  question: FormQuestion;
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div
        className={`flex  gap-2 ${question.label.length > 40 || expanded ? "flex-col" : "lg:flex-row flex-col"}`}
      >
        <label
          className={`flex   flex-shrink-0  pt-2 gap-1 ${question.label.length > 40 || expanded ? "w-full" : "w-60 min-w-60 "}`}
        >
          <span className="">{question.label}</span>
          {question.config.validation.isRequired && (
            <span className="text-red-500">*</span>
          )}
        </label>
        <div className="flex flex-col items-center  w-full gap-2 relative *:w-full">
          {formQuestionMapper({
            question: question,
            value: questionData.value as string,
            OnChange: questionData.eventHandlers.onChange,
          })}
          <span className="text-red-500 px-1 max-h-6 text-sm">
            {questionData.errors && questionData.errors.length > 0
              ? questionData.errors.map((error) => error.message).join(", ")
              : ""}
          </span>
        </div>
      </div>
    </div>
  );
}
