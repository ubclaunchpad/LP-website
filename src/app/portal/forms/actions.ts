"use server";
import { render } from "@react-email/components";
import { db } from "@/db";
import { FormStep, Obj } from "@/lib/types/questions";
import { createClient } from "@/lib/utils/supabase/server";
import { JSONValidationToZod } from "@/lib/utils/forms/helpers";
import { sendEmail } from "@/lib/utils/forms/email";
import { SubmissionTemplate } from "@/components/forms/emailTemplates/submissionTemplate";

export async function submitApplication({ formId }: { formId: bigint }) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (!data.user || error) {
    return null;
  }
  const resPromise = db.submissions.findUnique({
    where: {
      user_id_form_id: {
        form_id: formId,
        user_id: data.user.id,
      },
    },
  });

  const formPromise = db.forms.findUnique({
    where: {
      id: formId,
    },
  });

  const [res, form] = await Promise.all([resPromise, formPromise]);
  // console.log(res, form);

  if (!res || !form) {
    return null;
  }

  const { isValid, errors } = validateFormAnswers({
    form: form.questions as unknown as FormStep[],
    formAnswers: res.details as Obj,
  });

  console.log(isValid, errors);
  // if (!isValid) {
  //   return errors;
  // }

  const updateSubmission = db.submissions.update({
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

  const createApplication = db.applications.create({
    data: {
      id: res.id!,
      status: "to review",
      reviewer_id: null,
    },
  });

  await Promise.all([updateSubmission, createApplication]);
  const appEmail = res.details ? (res.details as Obj) : {};
  const template = await render(SubmissionTemplate({ formTitle: form.title }));
  await sendEmail({
    from: "no-reply@ubclaunchpad.com",
    fromName: "No-reply UBC Launch Pad",
    to: data.user.email!.toString(),
    subject: `${form.title} - Form Submitted`,
    html: template,
    cc: appEmail?.email as string,
  });
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
        console.log(`Error in ${question.id}: ${result.error.message}`);
        errors.push(result.error.message);
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
