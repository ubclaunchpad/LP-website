"use server";
import { db } from "@/db";
import { requireAdmin } from "@/lib/utils/auth";
import { getFormById } from "@/lib/utils/forms/server";
import { FormStep } from "@/lib/types/questions";
import { FormFields } from "@/components/forms/applications/columns";
import { sendEmail } from "@/lib/utils/forms/email";
import { MarkdownTemplate } from "@/components/forms/emailTemplates/markdownTemplate";
import { render } from "@react-email/components";
import { object } from "zod";

export async function getForms() {
  await requireAdmin();
  return db.forms.findMany();
}

export async function createForm(data: { title: string; description: string }) {
  await requireAdmin();
  return db.forms.create({ data: { ...data, config: {}, questions: [] } });
}

export async function cloneForm(id: number) {
  await requireAdmin();
  const source = await db.forms.findUnique({ where: { id: BigInt(id) } });
  if (!source) {
    throw new Error("Form not found");
  }
  // Copy structure (questions, config incl. email templates + offer page)
  // but never dates or submissions — the new form starts unopened.
  return db.forms.create({
    data: {
      title: `${source.title} (Copy)`,
      questions: source.questions as any,
      config: source.config as any,
      type: source.type,
    },
  });
}

export async function updateForm(
  id: number,
  data: {
    title: string;
    description: string;
    config: object;
    questions: object[];
  },
) {
  await requireAdmin();
  return db.forms.update({ where: { id }, data });
}

export async function getSubmissions(
  formId: number,
  onlySubmitted: boolean = true,
  filters: any | undefined = {},
) {
  await requireAdmin();
  const app = await db.submissions.findMany({
    include: {
      users: true,
      applications: true,
    },
    where: {
      form_id: BigInt(formId),
      ...(onlySubmitted && {
        status: { not: "pending" },
      }),
      ...filters,
    },
  });

  return app.map((submission: any) => {
    const details = submission.details ? (submission.details as any) : {};
    return {
      ...submission,
      ...details,
      email: submission.users?.email,
      userid: submission.users?.id,
      ...submission.applications,
    };
  });
}

function formatFormFields(questionSteps: FormStep[]): FormFields {
  const questionMap: FormFields = {};
  questionSteps.forEach((step) => {
    step.questions.forEach((question) => {
      let options: any[] = [];
      if (question.type === "select") {
        options = question.options?.map((option) => {
          return {
            id: option.value,
            label: option.label,
            value: option.value,
          };
        });
      }
      questionMap[question.id] = {
        label: question.label,
        id: question.id,
        options: options,
        type: question.type,
      };
    });
  });
  return questionMap;
}

export async function getAllFormDetails(
  formId: bigint,
): Promise<{ rawForm: any; formFields: FormFields; submissions: any[] }> {
  await requireAdmin();
  try {
    const form = await db.forms.findFirst({
      where: { id: formId },
    });

    if (!form) {
      return { rawForm: null, formFields: {}, submissions: [] };
    }

    const formFields = formatFormFields(
      form.questions as unknown as FormStep[],
    );
    const formType = form.type ? form.type.toString().toLowerCase() : "other";
    const formConfig = form.config as unknown as Record<string, any>;

    if (formType === "recruitment") {
      formFields["email"] = {
        label: "Email",
        id: "email",
        type: "email",
      };

      if (formConfig["application"]) {
        const subFields = formConfig["application"]["subfields"] || [];
        subFields.forEach((field: any) => {
          formFields[field.id] = {
            ...field,
            label: field.label,
            type: field.type,
            options: field.options,
          };
        });
      }
    }
    const submissions = await getSubmissions(formId as unknown as number);

    return { rawForm: form, formFields, submissions };
  } catch (e) {
    console.log(e);
    return { rawForm: null, formFields: {}, submissions: [] };
  }
}

type temp = {
  columns: string[];
};

interface AggregatedValue {
  id: string;
  count: number;
  label: string;
}

interface AggregationResult {
  charInfo: {
    title: string;
    description: string;
  };
  chartData: AggregatedValue[];
  chartConfig: any; // Replace 'any' with the appropriate type if you know it
}

export async function updateSubmissionField(
  submissionId: string,
  field: string,
  tableName: string | undefined,
  value: any,
  cta: boolean = false,
) {
  await requireAdmin();
  if (tableName === "applications") {
    await db["applications"].update({
      where: { id: submissionId },
      data: {
        [field]: value,
      },
    });
    if (field === "status" && cta) {
      const submission = await db.submissions.findFirst({
        where: {
          id: submissionId,
        },
      });

      if (!submission) {
        console.log("Submission not found");
        return;
      }
      await sendStatusEmail({
        status: value,
        formId: submission.form_id,
        userId: submission.user_id,
      });
    }
  }
}

export async function sendStatusEmailToUser(
  submissionId: string,
  value: string,
) {
  await requireAdmin();
  const submission = await db.submissions.findFirst({
    where: {
      id: submissionId,
    },
  });

  if (!submission) {
    console.log("Submission not found");
    return;
  }

  await sendStatusEmail({
    status: value,
    formId: submission.form_id,
    userId: submission.user_id,
  });
}

export async function getAdminMembers() {
  await requireAdmin();
  const res = await db.roles.findMany({
    where: {
      roles: {
        contains: "admin",
      },
    },
    include: {
      users: true,
    },
  });

  return res.map((p) => {
    return {
      ...p.users,
      ...p,
      id: p.users.id,
      email: p.users.email,
    };
  });
}

async function sendStatusEmail({
  status,
  formId,
  userId,
}: {
  status: string;
  formId: bigint;
  userId: string;
}) {
  const form = await getFormById(formId);

  if (!form) {
    console.log("Form not found");
    return;
  }
  const app = await db.submissions.findFirst({
    where: {
      form_id: formId,
      user_id: userId,
    },
    include: {
      applications: true,
      users: true,
    },
  });

  if (!app) {
    console.log("Application not found");
    return;
  }

  const formConfig = form.config as any;
  const config = formConfig.application as any;

  if (
    !config ||
    !config.emails ||
    !config.emails.status ||
    !config.emails.status[status]
  ) {
    console.log("Email template not found");
    return;
  }

  const emailTemplate = config.emails.status[status];
  const title = emailTemplate.title;
  const content = emailTemplate.content;
  const details = app.details ? (app.details as any) : {};
  const template = await render(
    MarkdownTemplate({ markdown: content, replacements: details }),
  );

  await sendEmail({
    from: "no-reply@ubclaunchpad.com",
    fromName: "no-reply UBC Launch Pad",
    to: app.users.email!.toString(),
    subject: title,
    html: template,
    cc: details?.email as string,
  });
  if (!app.applications) {
    console.log("Application not found");
    return;
  }
  await db.applications.update({
    where: {
      id: app.applications.id,
    },
    data: {
      notified_on: new Date(),
    },
  });
}
