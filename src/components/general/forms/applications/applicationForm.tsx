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
import Link from "next/link";
import { createContext, useContext, useEffect, useState } from "react";
import {
  handleFileUpload,
  updateApplication,
} from "@/app/portal/applications/actions";

export type Place = "first" | "other" | "last";

type FormContext = {
  formData: FormDetails;
  updateForm: (
    id: string,
    value: string | string[] | boolean | File | null | number
  ) => void;
};

const formContext = createContext<FormContext>({} as FormContext);

export default function ApplicationForm({
  application,
}: {
  application: Application;
}) {
  const searchParams = useSearchParams();
  const [formAnswers, setFormAnswers] = useState<FormDetails>(
    formStepsToFormDetails(formSteps, application.application)
  );

  function questionToFormItem(
    question: FormQuestion,
    initialValue: string
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
  function formStepsToFormDetails(
    steps: readonly FormStep[],
    intialValues: Obj
  ): FormDetails {
    const details: FormDetails = {};
    steps.forEach((step) => {
      step.questions.forEach((question) => {
        details[question.id] = questionToFormItem(
          question,
          intialValues[question.id] as string
        );
      });
    });
    return details;
  }

  function updateForm(
    id: string,
    value: string | string[] | boolean | File | null | number
  ) {
    console.log(value);
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

  useEffect(() => {
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
  }, [formAnswers]);

  if (!searchParams.get("step")) {
    return redirect(`/portal/applications/apply?state=form&step=1`);
  }
  const step = parseInt(searchParams.get("step") as string);
  const place: Place =
    step === 1 ? "first" : step === formSteps.length ? "last" : "other";

  return (
    <formContext.Provider value={{ formData: formAnswers, updateForm }}>
      <main className="flex flex-col items-center  h-screen min-h-screen py-10 gap-0 w-full">
        <form className="flex flex-col  items-center justify-center flex-shrink-0  w-full h-full gap-4 relative lg:p-2">
          <FormTab
            questions={formSteps[step - 1].questions}
            title={formSteps[step - 1].title}
          />
          <div className=" flex justify-between gap-4  w-full items-end">
            <nav className=" items-center justify-between w-full p-2 hidden md:flex">
              <span>UBC Launch Pad Application Portal</span>
            </nav>
            {place !== "first" ? (
              <NavLink
                href={`/portal/applications/apply?state=form&step=${step - 1}`}
              >
                Back
              </NavLink>
            ) : (
              <div></div>
            )}
            {place !== "last" ? (
              <NavLink
                href={`/portal/applications/apply?state=form&step=${step + 1}`}
              >
                Next
              </NavLink>
            ) : (
              <NavLink href={`/portal/applications/apply?state=form&step=1`}>
                Submit
              </NavLink>
            )}
          </div>
        </form>
      </main>
    </formContext.Provider>
  );
}

export function useFormField(id: string) {
  const { formData } = useContext(formContext);
  return formData[id];
}

function NavLink({ href, children }: { href: string; children: any }) {
  return (
    <Link
      href={href}
      className="bg-white text-black font-bold rounded-md h-fit px-8 text-md p-2"
    >
      {children}
    </Link>
  );
}
