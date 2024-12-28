import { FormDetails, FormStep } from "@/lib/types/questions";
import FormItemInput from "./formItem";

export default function FormTab({
  formData,
  step,
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  step: FormStep;
  totalSteps: number;
  formData: FormDetails;
}) {
  const { title, questions } = step;
  return (
    <div className="flex flex-col items-center flex-1  lg:max-w-4xl  flex-shrink-0 p-4 lg:p-10 lg:pb-4 rounded-lg gap-4 w-full">
      <h2 className="text-2xl font-heading w-full justify-between text-left font-bold gap-2 border-neutral-800 pb-10 text-white flex items-center">
        <span className="p-0 m-0"> {title}</span>
        <StepProgress currentStep={currentStep} totalSteps={totalSteps} />
      </h2>
      <div className="flex-1 flex-col flex gap-2 w-full relative">
        <div className="w-full flex-1 flex flex-col gap-2">
          {questions.map((question) => (
            <FormItemInput
              question={question}
              key={question.id}
              questionData={formData[question.id]}
              expanded={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

import React from "react";

const StepProgress = ({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) => {
  // Calculate the percentage for the progress circle
  const percentage = (currentStep / totalSteps) * 100;
  // Calculate the circle's circumference
  const radius = 12; // Size of circle
  const circumference = 2 * Math.PI * radius;
  // Calculate the dash offset based on the percentage
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative bg-background-800 w-10 h-10 rounded-full  flex items-center justify-center">
      <svg className="absolute w-10 h-10 -rotate-90" viewBox="0 0 40 40">
        <circle
          cx="20"
          cy="20"
          r={radius}
          className="fill-none stroke-background-600"
          strokeWidth="4"
        />
        {/* Progress circle */}
        <circle
          cx="20"
          cy="20"
          r={radius}
          className="fill-none stroke-lp-400"
          strokeWidth="4"
          strokeLinecap="round"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
            transition: "stroke-dashoffset 0.3s ease",
          }}
        />
      </svg>
    </div>
  );
};
