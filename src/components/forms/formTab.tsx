import { FormDetails, FormStep } from "@/lib/types/questions";
import FormItemInput from "./formItem";

export default function FormTab({
  formData,
  step,
}: {
  step: FormStep;
  totalSteps: number;
  formData: FormDetails;
}) {
  const { title, questions } = step;
  return (
    <div className="flex flex-col items-center flex-1  lg:max-w-4xl  flex-shrink-0 p-4 lg:p-10 lg:pb-4 rounded-lg gap-4 w-full">
      <h2 className="text-2xl font-heading w-full text-left font-bold border-neutral-800 pb-10 text-white">
        {title}
      </h2>
      <div className="flex-1 flex-col flex gap-2 w-full relative">
        <div className="w-full flex-1 flex flex-col gap-2">
          {questions.map((question, index) => (
            <FormItemInput
              question={question}
              key={index}
              questionData={formData[question.id]}
              expanded={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
