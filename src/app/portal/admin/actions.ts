"use server";
import { db } from "@/db";
import { FormStep } from "@/lib/types/questions";
import { FormFields } from "@/app/portal/admin/forms/[id]/submissions/columns";
import { ChartConfig } from "@/components/primitives/chart";

const inMemoryCache = new Map();
inMemoryCache.set("forms", {});

export async function getForms() {
  return db.forms.findMany();
}

// export async function getUsers() {
//   const users = await db.users.findMany();
//   return users.reduce((acc: Record<string, any>, user: any) => {
//     acc[user.id] = { ...user, name: user["raw_user_meta_data"]?.full_name };
//     return acc;
//   }, {});
// }

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

export async function getSubmissions(formId: number, onlySubmitted = true) {
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
    },
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

function formatFormFields(questionSteps: FormStep[]): FormFields {
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

function aggregateColumn(
  data: Record<string, any>[],
  column: string,
): AggregationResult {
  const aggData = data.reduce(
    (acc: Record<string, AggregatedValue>, row: Record<string, any>) => {
      const value = row[column];
      if (!value) {
        return acc;
      }
      if (Array.isArray(value)) {
        value.forEach((val) => {
          if (acc[val]) {
            acc[val] = {
              ...acc[val],
              count: acc[val].count + 1,
            };
          } else {
            acc[val] = {
              id: val,
              count: 1,
              label: val,
            };
          }
        });
        return acc;
      }
      if (acc[value]) {
        acc[value] = {
          ...acc[value],
          count: acc[value].count + 1,
        };
      } else {
        acc[value] = {
          id: value,
          count: 1,
          label: value,
        };
      }
      return acc;
    },
    {} as Record<string, AggregatedValue>,
  );

  return {
    charInfo: { title: column, description: `Number of ${column}(s)` },
    chartData: Object.values(aggData),
    chartConfig: createChartConfig(Object.values(aggData), [column]), // Type 'chartConfig' properly
  };
}

function createChartConfig(data: any[], columns: string[]) {
  const chartConfig: ChartConfig = {};
  columns.forEach((column, index) => {
    chartConfig[column] = {
      label: column,
      color: `var(--lp-200)`,
    };
  });
  return chartConfig;
}

export async function getFormAnalytics(formId: number, config: temp) {
  // const cachedData = inMemoryCache.get("forms");
  // if (cachedData[formId]) {
  //   const formAnalytics = cachedData[formId].analyticsData;
  //   const expiryDate = cachedData[formId].expiryDate;
  //   if (expiryDate > Date.now()) {
  //     return { analyticsData: formAnalytics, stats: cachedData[formId].stats };
  //   }
  // }

  const [submissions, form] = await Promise.all([
    getSubmissions(formId),
    getForm(formId),
  ]);
  if (!form) {
    throw new Error("No form found");
  }
  const chartData = config.columns.map((column) =>
    aggregateColumn(submissions, column),
  );
  const lastUpdated = Date.now();
  inMemoryCache.set("forms", {
    [formId]: {
      analyticsData: chartData,
      expiryDate: Date.now() + 1000 * 60 * 60, // 1 hour
      columns: config.columns,
      stats: {
        submissions: submissions.length,
        lastUpdated: lastUpdated,
      },
    },
  });
  return {
    analyticsData: chartData,
    stats: {
      submissions: submissions.length,
      lastUpdated: lastUpdated,
    },
  };
}
