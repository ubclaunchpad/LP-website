import { FormStep } from "@/app/lib/types/questions";
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
    <div className="flex flex-col items-center flex-1  lg:max-w-4xl  flex-shrink-0 p-4 lg:p-10 lg:pb-4 rounded-lg gap-4 w-full">
      <h2 className="text-2xl font-heading w-full text-left border-b border-neutral-800 pb-5 text-white">
        {title}
      </h2>
      <div className="flex-1 flex-col flex gap-2 w-full relative">
        {step.target !== "everyone" &&
        role.toLowerCase() !== step.target.toLowerCase() ? (
          <div className="w-full  text-white p-2 rounded-md flex-1 justify-center top-0 gap-4 left-0 h-full z-40 flex flex-col items-center ">
            <div className="text-lg  font-bold">
              This tab is for {step.target} only. You can proceed to the next
              tab.
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
