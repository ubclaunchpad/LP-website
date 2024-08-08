"use client";
import { FormAnswers, FormQuestion } from "@/app/lib/types/questions";
import Link from "next/link";
import FormItem from "./formItem";

export type Place = "first" | "other" | "last";

export default function FormTab({
  questions,
  title,
  place,
  step,
  formAnswers,
}: {
  questions: FormQuestion[];
  title: string;
  place: Place;
  step: number;
  formAnswers: FormAnswers
}) {
  const formQuestions = questions;
  return (
    <div className="flex flex-col items-center flex-1  max-w-3xl h-full overflow-y-scroll max-h-screen flex-shrink-0  border gelatine shadow-sm border-neutral-800  bg-neutral-900 p-10 rounded-lg gap-4 w-full">
      <h2 className="text-2xl font-heading w-full text-left border-b border-neutral-800 pb-5 text-white">
        {title}
      </h2>
      <div className="flex-1 flex-col flex gap-10 w-full ">
        <div className="w-full grid grid-cols-1 gap-2 lg:grid-cols-1 ">
          {formQuestions.map((question, index) => (
            <FormItem question={question} key={index} formAnswer={formAnswers[question.id]} />
          ))}
        </div>
        <div className="flex-1 flex justify-between w-full items-end">
          {place !== "first" ? (
            <Link
              className="bg-indigo-800 text-white font-bold rounded-md h-fit px-8 text-md p-2"
              href={`/applications/apply?state=form&step=${step - 1}`}
            >
              Back
            </Link>
          ) : (
            <Link
              className="bg-indigo-800 text-white font-bold rounded-md h-fit px-8 text-md p-2"
              href={`/applications`}
            >
              Cancel Application
            </Link>
          )}
          {place !== "last" ? (
            <Link
              className="bg-indigo-800 text-white font-bold rounded-md h-fit px-8 text-md p-2"
              href={`/applications/apply?state=form&step=${step + 1}`}
            >
              Next
            </Link>
          ) : (
            <Link
              className="bg-indigo-800 text-white font-bold rounded-md h-fit px-8 text-md p-2"
              href="/applications/apply?state=form&step=3"
            >
              Submit
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
