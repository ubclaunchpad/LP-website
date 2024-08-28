"use server";
import { db } from "@/db";
import {FormStep} from "@/lib/types/questions";
import {FormFields} from "@/app/portal/admin/forms/[id]/submissions/columns";

export async function getForms() {
  return db.forms.findMany();
}

export async function getUsers() {
  const users = await db.users.findMany();
  return users.reduce((acc: Record<string, any>, user: any) => {
    acc[user.id] = { ...user, name: user["raw_user_meta_data"]?.full_name };
    return acc;
  }, {});
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

export async function getSubmissions(formId: number) {
  const app = await db.submissions.findMany({
    include: {
      users: true,
      applications: true,
    },
    where: { form_id: BigInt(formId), status: { not: "pending" } },
  });
  return app.map((submission: any) => {
    const details = submission.details ? (submission.details as any) : {};
    return {
      ...submission,
      ...details,
      appStatus: submission.applications?.status,
      appReviewer: submission.applications?.reviewer_id,
      email: submission.users?.email,
      userid: submission.users?.id,
    };
  });
}


function formatFormFields(questionSteps: FormStep[]) : FormFields
{
    const questionMap: FormFields = {};
    questionSteps.forEach((step) => {
        step.questions.forEach((question) => {
            questionMap[question.id] = {
                label: question.label,
                // id: question.id,
                type: question.type,
            };
        });
    });
    return questionMap;
}

export async function getAllFormDetails(formId: bigint): Promise<{ rawForm: any, formFields: FormFields, submissions: any[] }>
{
    try {
        const form = await db.forms.findFirst({
            where: { id: formId },
        });

        if (!form) {
            return { rawForm: null, formFields: {}, submissions: [] };
        }

        const formFields = formatFormFields(form.questions as unknown as FormStep[]);
        const submissions = await getSubmissions(formId as unknown as number);

        return { rawForm: form, formFields, submissions };
    }
    catch (e) {
        console.log(e);
        return { rawForm: null, formFields: {}, submissions: [] };
    }
}