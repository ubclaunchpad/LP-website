"use server";

import { db } from "@/db";
import { FormStep, Obj } from "@/lib/types/questions";
import { createClient } from "@/lib/utils/supabase/server";
import { JSONValidationToZod } from "@/lib/utils/forms/helpers";

export async function submitApplication({ formId }: { formId: bigint }) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (!data.user || error) {
    return null;
  }
  const res = await db.submissions.findUnique({
    where: {
      user_id_form_id: {
        form_id: formId,
        user_id: data.user.id,
      },
    },
  });
  if (!res) {
    return null;
  }

  const form = await db.forms.findUnique({
    where: {
      id: formId,
    },
  });
  if (!form) {
    return null;
  }

  const { isValid, errors } = validateFormAnswers({
    form: form.questions as unknown as FormStep[],
    formAnswers: res.details as Obj,
  });
  console.log(isValid, errors);
  if (!isValid) {
    return errors;
  }
  console.log("Submitting application");
  const up = await db.submissions.update({
    where: {
      user_id_form_id: {
        form_id: formId,
        user_id: data.user.id,
      },
    },
    data: {
      status: "submitted",
    },
  });
  console.log(up);

  // TODO: Send email to user
  // TODO: Run form validation on server
  // TODO: Handle file uploads with validation
  return true;
}

export async function updateApplication({
  application,
  formId,
}: {
  application: Obj;
  formId: bigint;
}) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (!data.user || error) {
    return null;
  }
  const res = await db.submissions.findUnique({
    where: {
      user_id_form_id: {
        form_id: formId,
        user_id: data.user.id,
      },
    },
  });
  const details = res?.details as unknown as any;
  await db.submissions.update({
    where: {
      user_id_form_id: {
        form_id: formId,
        user_id: data.user.id,
      },
    },
    data: {
      details: { ...details, ...application },
    },
  });
  return res;
}

export async function getUserApplication({ formId }: { formId: bigint }) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (!data.user || error) {
    return null;
  }
  return db.submissions.findUnique({
    where: {
      user_id_form_id: {
        form_id: formId,
        user_id: data.user.id,
      },
    },
  });
}

function validateFormAnswers({
  form,
  formAnswers,
}: {
  form: FormStep[];
  formAnswers: Obj;
}) {
  let isValid = true;
  const errors: string[] = [];
  form.forEach((step) => {
    step.questions.forEach((question) => {
      const value = formAnswers[question.id];
      const validation = JSONValidationToZod(question.config.validation);
      const result = validation.safeParse(value);
      if (!result.success) {
        isValid = false;
        console.log(validation.isOptional());
        errors.push(result.error.message);
        console.log(result.error.errors);
        console.log(question.id);
      }
    });
  });
  return { isValid, errors };
}

export async function startApplication({ formId }: { formId: bigint }) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (!data.user || error) {
    return null;
  }
  const res = await db.submissions.findUnique({
    where: {
      user_id_form_id: {
        form_id: formId,
        user_id: data.user.id,
      },
    },
  });
  if (res) {
    if (res.status) {
      return null;
    }
    return db.submissions.update({
      where: {
        user_id_form_id: {
          form_id: formId,
          user_id: data.user.id,
        },
      },
      data: {
        status: "pending",
      },
    });
  }
  return db.submissions.create({
    data: {
      user_id: data.user.id,
      form_id: formId,
      status: "pending",
    },
  });
}
