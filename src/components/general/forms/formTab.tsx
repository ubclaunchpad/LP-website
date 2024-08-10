"use client";
import { FormQuestion } from "@/app/lib/types/questions";
import FormItemInput from "./formItem";

export default function FormTab({
  questions,
  title,
}: {
  questions: FormQuestion[];
  title: string;
}) {
  const formQuestions = questions;
  return (
    <div className="flex flex-col items-center flex-1   lg:max-w-4xl h-full overflow-y-scroll max-h-screen flex-shrink-0  lg:border gelatine shadow-sm border-neutral-800  bg-neutral-900 lg:p-10 p-2 rounded-2xl gap-4 w-full">
      <h2 className="text-2xl font-heading w-full text-left border-b border-neutral-800 pb-5 text-white">
        {title}
      </h2>
      <div className="flex-1 flex-col flex gap-10 w-full ">
        <div className="w-full grid grid-cols-1 gap-2 lg:grid-cols-1 ">
          {formQuestions.map((question, index) => (
            <FormItemInput question={question} key={index}  />
          ))}
        </div>
      </div>
    </div>
  );
}
