"use client";

import FormTab from "../formTab";
import { Application, FormDetails, FormStep, Obj } from "@/lib/types/questions";
import { createContext, useEffect, useRef, useState } from "react";
import { FormTabBottomBar } from "./formBottomBar";
import BeforeSubmitTab from "./beforeSubmitTab";
import {
  questionToFormItem,
  validateTab,
  saveApplication,
} from "@/lib/utils/forms/helpers";
import { Form } from "@/lib/types/application";

type FormContext = {
  formData: FormDetails;
  updateForm: (
    id: string,
    value: string | string[] | null | number | number[],
  ) => void;
};

const formContext = createContext<FormContext>({} as FormContext);

export default function ApplicationForm({
  application,
  applicationForm,
}: {
  application: Application;
  applicationForm: Form;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const formQ = applicationForm.questions;
  const [formAnswers, setFormAnswers] = useState<FormDetails>(
    formStepsToFormDetails(formQ, application.details),
  );
  const formAnswersRef = useRef(formAnswers);

  function formStepsToFormDetails(
    steps: readonly FormStep[],
    initialValues: Obj,
  ): FormDetails {
    const details: FormDetails = {};
    steps.forEach((step) => {
      step.questions.forEach((question) => {
        details[question.id] = questionToFormItem(
          question,
          initialValues && initialValues[question.id]
            ? (initialValues[question.id] as string)
            : "",
          updateForm,
        );
      });
    });
    return details;
  }

  function updateForm(
    id: string,
    value: string | string[] | null | number | number[],
  ) {
    setFormAnswers((prev) => {
      return {
        ...prev,
        [id]: {
          ...prev[id],
          value: value,
        },
      };
    });
  }

  function getFormTabToRender(step: number) {
    const tab = step;
    if (tab >= formQ.length) {
      return (
        <BeforeSubmitTab
          goToPreviousTab={goToPreviousTab}
          formId={applicationForm.id}
        />
      );
    }
    return (
      <FormTab
        step={formQ[tab]}
        totalSteps={formQ.length}
        formData={formAnswers}
      />
    );
  }

  function goToNextTab() {
    const {
      isValid,
      errors,
      formAnswers: newFormAnswers,
    } = validateTab(formQ[currentStep], formAnswers);
    setFormAnswers(Object.assign({}, newFormAnswers));
    if (!isValid) {
      // TODO: Include a toast message UI
      return;
    }
    if (currentStep > formQ.length + 1) {
      return;
    }
    saveApplication(formAnswers, Number(applicationForm.id)).then(() =>
      setCurrentStep((prev) => prev + 1),
    );
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
          />
        </form>
      </main>
    </formContext.Provider>
  );
}
