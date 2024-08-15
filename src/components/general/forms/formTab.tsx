
import {  FormStep } from "@/app/lib/types/questions";
import FormItemInput from "./formItem";

export default function FormTab({
  step,
  role,
}: {
  step: FormStep;
  totalSteps: number;
  role: string;
}) {
  const { title, questions } = step;
  const formQuestions = questions;
  return (
    <div className="flex flex-col items-center flex-1   lg:max-w-4xl     flex-shrink-0    shadow-sm border-neutral-800  bg-neutral-900 lg:p-10 lg:pb-4 p-2 rounded-lg gap-4 w-full">
      <h2 className="text-2xl font-heading w-full text-left border-b border-neutral-800 pb-5 text-white">
        {title}
      </h2>
      <div className="flex-1 flex-col flex gap-2 w-full relative">
        {step.target !== "everyone" &&
        role.toLowerCase() !== step.target.toLowerCase() ? (
          <div className="w-full bg-neutral-900 text-white p-2 rounded-md absolute top-0 gap-4 left-0 h-full z-40 flex flex-col items-center ">
            <div className="text-lg flex-1 font-bold">
              Not related to your role - You can skip this step
            </div>
           
          </div>
        ) : (
            <div className="w-full flex-1 flex flex-col gap-2">
              {formQuestions.map((question, index) => (
                <FormItemInput question={question} key={index} />
              ))}
            </div>
        )}
      </div>
    </div>
  );
}

