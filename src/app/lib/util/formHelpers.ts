import { z } from "zod";
import {
  FormDetails,
  FormItem,
  FormQuestion,
  FormStep,
  Obj,
} from "@/app/lib/types/questions";
import {
  handleFileUpload,
  updateApplication,
} from "@/app/portal/applications/actions";

export async function saveApplication(formAnswers: FormDetails) {
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

  if (Object.keys(fields).length === 0 && Object.keys(files).length === 0) {
    return "No changes";
  }

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

  Object.keys(formAnswers).forEach((key) => {
    if (formAnswers[key].initialValue !== formAnswers[key].value) {
      formAnswers[key].initialValue = formAnswers[key].value;
    }
  });
  return "Saved";
}

export function validateTab(
  tab: FormStep,
  formAnswers: FormDetails,
): { isValid: boolean; errors: string[] } {
  let isValid = true;
  const errors: string[] = [];
  tab.questions.forEach((question) => {
    const value = formAnswers[question.id].value;
    const result = formAnswers[question.id].validation.safeParse(value);
    if (!result.success) {
      isValid = false;
      errors.push(result.error.message);
    }
  });
  return { isValid, errors };
}

export function questionToFormItem(
  question: FormQuestion,
  initialValue: string,
  updateForm: (
    id: string,
    value: string | string[] | boolean | File | null | number,
  ) => void,
): FormItem {
  return {
    errors: [] as any,
    initialValue: initialValue,
    type: question.type,
    value: initialValue,
    validation: z.any(),
    // question.config.schema,
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
