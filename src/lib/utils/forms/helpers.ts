import { z } from "zod";
import {
  FormDetails,
  FormItem,
  FormQuestion,
  FormStep,
  Obj,
} from "@/lib/types/questions";
import { updateApplication } from "@/app/portal/forms/actions";
import { FormItemValidation } from "@/lib/types/forms";
import { Form } from "@/lib/types/application";

export async function saveApplication(
  formAnswers: FormDetails,
  formId: number,
) {
  const fields: Obj = {};
  const files: Obj = {};
  Object.keys(formAnswers).forEach((key) => {
    if (formAnswers[key].initialValue !== formAnswers[key].value) {
      fields[key] = formAnswers[key].value;
      return;
    }
  });

  if (Object.keys(fields).length === 0 && Object.keys(files).length === 0) {
    return "No changes";
  }

  if (Object.keys(fields).length !== 0) {
    const formIdNumber = BigInt(formId);
    updateApplication({ application: fields, formId: formIdNumber })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return "Saved";
}

export function validateTab(
  tab: FormStep,
  formAnswers: FormDetails,
): { isValid: boolean; errors: string[]; formAnswers: FormDetails } {
  let isValid = true;
  const errors: string[] = [];
  tab.questions.forEach((question) => {
    const value = formAnswers[question.id].value;
    const result = formAnswers[question.id].validation.safeParse(value);
    if (!result.success) {
      isValid = false;
      errors.push(result.error.message);
      formAnswers[question.id].errors = result.error.errors;
    }
  });
  return { isValid, errors, formAnswers };
}

export function questionToFormItem(
  question: FormQuestion,
  initialValue: string,
  updateForm: (
    id: string,
    value: string | string[] | null | number | number[],
  ) => void,
): FormItem {
  return {
    errors: [] as any,
    initialValue: initialValue,
    type: question.type,
    value: initialValue,
    validation: JSONValidationToZod(question.config.validation),
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

export function isFormOpen(form: Form) {
  const now = new Date();
  if (form.open_at && now < form.open_at) {
    return false;
  }
  return !(form.close_at && now > form.close_at);
}

function typeToZodType(type: string) {
  switch (type) {
    case "string":
      return z.string({ message: "Please enter a valid text" });
    case "number":
      return z.number({ message: "Please enter a valid number" });
    case "email":
      return z.string().email({ message: "Please enter a valid email" });
    case "url":
      return z.string().url({ message: "Please enter a valid URL" });
    case "date":
      return z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
    case "select":
      return z.string({ message: "Please select an option" });
    default:
      return z.string({ message: "Invalid type" });
  }
}

type ZodTypeWithMinMax = z.ZodNumber | z.ZodString | z.ZodArray<any>;

export function JSONValidationToZod(
  formItemValidation: FormItemValidation | undefined,
): z.ZodTypeAny {
  if (!formItemValidation) {
    return z.any();
  }

  let validation: z.ZodTypeAny;

  if (formItemValidation.isArray) {
    validation = z.array(typeToZodType(formItemValidation.type));
  } else {
    validation = typeToZodType(formItemValidation.type);
  }

  if (formItemValidation.minLength !== undefined) {
    validation = (validation as ZodTypeWithMinMax).min(
      formItemValidation.minLength,
      {
        message: `Minimum length is ${formItemValidation.minLength}`,
      },
    );
  }

  if (formItemValidation.maxLength !== undefined) {
    validation = (validation as ZodTypeWithMinMax).max(
      formItemValidation.maxLength,
      {
        message: `Maximum length is ${formItemValidation.maxLength}`,
      },
    );
  }
  //
  if (!formItemValidation.isRequired) {
    validation = validation.optional();
  }

  return validation;
}
