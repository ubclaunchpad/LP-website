"use client";

import FormTab from "../formTab";
import {
  Application,
  FormDetails,
  FormStep,
  Obj,
} from "@/app/lib/types/questions";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { FormTabBottomBar } from "./formBottomBar";
import BeforeSubmitTab from "./beforeSubmitTab";
import {
  questionToFormItem,
  validateTab,
  saveApplication,
} from "@/app/lib/util/formHelpers";
import { ApplicationRound } from "@/app/lib/types/application";

type FormContext = {
  formData: FormDetails;
  updateForm: (
    id: string,
    value: string | string[] | boolean | File | null | number,
  ) => void;
};

const formContext = createContext<FormContext>({} as FormContext);

export default function ApplicationForm({
  application,
  applicationForm,
}: {
  application: Application;
  applicationForm: ApplicationRound;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const formQ = applicationForm.questions;
  const [formAnswers, setFormAnswers] = useState<FormDetails>(
    formStepsToFormDetails(formQ, application.application),
  );
  const formAnswersRef = useRef(formAnswers);

  function formStepsToFormDetails(
    steps: readonly FormStep[],
    intialValues: Obj,
  ): FormDetails {
    const details: FormDetails = {};
    steps.forEach((step) => {
      step.questions.forEach((question) => {
        details[question.id] = questionToFormItem(
          question,
          intialValues[question.id] as string,
          updateForm,
        );
      });
    });
    return details;
  }

  function updateForm(
    id: string,
    value: string | string[] | boolean | File | null | number,
  ) {
    setFormAnswers((prev) => {
      return {
        ...prev,
        [id]: {
          ...prev[id],
          value: value,
          state: {
            isValid: formAnswers[id].validation.safeParse(value).success
              ? "VALID"
              : "INVALID",
          },
          errors: formAnswers[id].validation.safeParse(value),
        },
      };
    });
  }

  function getFormTabToRender(step: number) {
    const role = "developer"; //formAnswers["role"].value as string;
    const tab = step;
    if (tab >= formQ.length) {
      return <BeforeSubmitTab goToPreviousTab={goToPreviousTab} />;
    }
    return <FormTab step={formQ[tab]} totalSteps={formQ.length} role={role} />;
  }

  function goToNextTab() {
    const { isValid, errors } = validateTab(formQ[currentStep], formAnswers);
    if (!isValid) {
      console.log(errors);
      return;
    }
    if (currentStep > formQ.length + 1) {
      return;
    }
    saveApplication(formAnswers);
    setCurrentStep((prev) => prev + 1);
  }

  function goToPreviousTab() {
    if (currentStep === 0) {
      return;
    }
    setCurrentStep((prev) => prev - 1);
  }

  useEffect(() => {
    formAnswersRef.current = formAnswers;
  }, [formAnswers]);

  return (
    <formContext.Provider value={{ formData: formAnswers, updateForm }}>
      <main className="flex flex-col items-center justify-start  flex-1 gap-0 w-full">
        <form className="flex flex-col flex-1 max-w-4xl  rounded border-neutral-800 items-center justify-center flex-shrink-0  w-full h-full gap-4 relative lg:p-2">
          {getFormTabToRender(currentStep)}
          <FormTabBottomBar
            numberOfTabs={formQ.length}
            currentTab={currentStep}
            goToNextTab={goToNextTab}
            goToPreviousTab={goToPreviousTab}
          >
            <></>
          </FormTabBottomBar>
        </form>
      </main>
    </formContext.Provider>
  );
}

export function useFormField(id: string) {
  const { formData } = useContext(formContext);
  return formData[id];
}
