"use server";
import { db } from "@/db";
import { FormStep } from "@/lib/types/questions";
import { FormFields } from "@/app/portal/admin/forms/[id]/submissions/columns";

export async function getForms() {
  return db.forms.findMany();
}

export async function createForm(data: { title: string; description: string }) {
  return db.forms.create({ data: { ...data, config: {}, questions: [] } });
}

export async function getForm(id: number) {
  try {
    return db.forms.findFirst({
      where: {
        id: BigInt(id),
      },
    });
  } catch (e) {
    console.log(e);
    return null;
  }
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
  return db.forms.update({ where: { id }, data });
}

export async function getSubmissions(
  formId: number,
  onlySubmitted: boolean = true,
  filters: any | undefined = {},
) {
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
) {
  if (tableName === "applications") {
    return db["applications"].update({
      where: { id: submissionId },
      data: {
        [field]: value,
      },
    });
  }
}

export async function getAdminMembers() {
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
