"use client";

import { formSteps } from "@/app/lib/data/applicationQuestions";
import FormTab from "../formTab";
import {
  Application,
  FormDetails,
  FormItem,
  FormQuestion,
  FormStep,
  Obj,
} from "@/app/lib/types/questions";
import { useSearchParams } from "next/navigation";
import { redirect } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  handleFileUpload,
  updateApplication,
} from "@/app/portal/applications/actions";

type FormContext = {
  formData: FormDetails;
  updateForm: (
    id: string,
    value: string | string[] | boolean | File | null | number
  ) => void;
};

const formContext = createContext<FormContext>({} as FormContext);

function saveApplication(formAnswers: FormDetails) {
  const fields: Obj = {};
  const files: Obj = {};
  Object.keys(formAnswers).forEach((key) => {
    if (formAnswers[key].initialValue !== formAnswers[key].value) {
      if (formAnswers[key].type === "upload") {
        files[key] = formAnswers[key].value;
      } else {
        fields[key] = formAnswers[key].value;
      }
      return;
    }
  });

  if (Object.keys(fields).length !== 0) {
    updateApplication(fields)
      .then((res) => {
        // console.log(res);
      })
      .catch((e) => {
        // console.log(e);
      });
  }

  if (Object.keys(files).length !== 0) {
    const formData = new FormData();
    Object.keys(files).forEach((key) => {
      formData.append(key, files[key] as File);
    });
    handleFileUpload(formData)
      .then((res) => {
        // console.log(res);
      })
      .catch((e) => {
        // console.log(e);
      });
  }
}

function questionToFormItem(
  question: FormQuestion,
  initialValue: string,
  updateForm: (
    id: string,
    value: string | string[] | boolean | File | null | number
  ) => void
): FormItem {
  return {
    errors: [] as any,
    initialValue: initialValue,
    type: question.type,
    value: initialValue,
    validation: question.config.schema,
    state: {
      isValid: "NOT_VALIDATED",
    },
    eventHandlers: {
      onFocus: () => {},
      onBlur: () => {},
      onChange: (value) => {
        updateForm(question.id, value);
      },
    },
  };
}

export default function ApplicationForm({
  application,
}: {
  application: Application;
}) {
  const searchParams = useSearchParams();
  const [formAnswers, setFormAnswers] = useState<FormDetails>(
    formStepsToFormDetails(formSteps, application.application)
  );
  const formAnswersRef = useRef(formAnswers);

  function formStepsToFormDetails(
    steps: readonly FormStep[],
    intialValues: Obj
  ): FormDetails {
    const details: FormDetails = {};
    steps.forEach((step) => {
      step.questions.forEach((question) => {
        details[question.id] = questionToFormItem(
          question,
          intialValues[question.id] as string,
          updateForm
        );
      });
    });
    return details;
  }

  function updateForm(
    id: string,
    value: string | string[] | boolean | File | null | number
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
    const role = formAnswers["role"].value as string;
    const tab = step - 1;
    return <FormTab step={formSteps[tab]} totalSteps={formSteps.length} role={role} />;
  }

  useEffect(() => {
    formAnswersRef.current = formAnswers;
  }, [formAnswers]);

  useEffect(() => {
    const interval = setInterval(() => {
      saveApplication(formAnswersRef.current);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!searchParams.get("step")) {
    return redirect(`/portal/applications/apply?state=form&step=1`);
  }

  let step = 1;
  try {

    const q = parseInt(searchParams.get("step") as string);
    if (q > 0 && q <= formSteps.length) {
      step = q;
    }
  } catch (e) {
    return redirect(`/portal/applications/apply?state=form&step=1`);
  }

  return (
    <formContext.Provider value={{ formData: formAnswers, updateForm }}>
      <main className="flex flex-col items-center  h-screen min-h-screen pt-10 pb-2 gap-0 w-full">
        <form className="flex flex-col  items-center justify-center flex-shrink-0  w-full h-full gap-4 relative lg:p-2">
          {getFormTabToRender(step)}
        </form>
      </main>
    </formContext.Provider>
  );
}

export function useFormField(id: string) {
  const { formData } = useContext(formContext);
  return formData[id];
}
