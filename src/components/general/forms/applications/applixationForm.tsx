"use client";

import { formSteps } from "@/app/lib/data/applicationQuestions";
import FormTab from "../formTab";
import { FormAnswers } from "@/app/lib/types/questions";

export default function ApplicationForm({ step, formAnswers }: { step: number , formAnswers: FormAnswers}) {
  return (
    <main className="flex flex-col items-center  h-screen min-h-screen p-4 bg-neutral-950   gap-0 w-full">
      <nav className="flex items-center justify-between w-full h-[10vh] p-2">
        <span>UBC Launch Pad Application Portal</span>
      </nav>
      <div className="flex  items-center justify-center flex-shrink-0  w-full h-[90svh] gap-4 relative p-2">
        {/* <div className="bg-neutral-900 border border-neutral-800 rounded-xl min-w-10 hidden lg:flex flex-1 h-full"/> */}
        <FormTab
            formAnswers={formAnswers}
          questions={formSteps[step - 1].questions}
          title={formSteps[step - 1].title}
          place={
            step - 1 === 0
              ? "first"
              : step - 1 === formSteps.length - 1
              ? "last"
              : "other"
          }
          step={step}
        />
      </div>
    </main>
  );
}
