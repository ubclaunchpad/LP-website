"use server";

import { cookies } from "next/headers";
import { createEmptyAnswers } from "../../lib/data/applicationQuestions";
import { Application, Obj } from "../../lib/types/questions";
import PocketBase from 'pocketbase';
import { ApplicationStatus } from "@/app/lib/types/application";

const pb = new PocketBase(process.env.POCKETBASE_URL);
await pb.admins.authWithPassword(process.env.POCKETBASE_ADMIN_EMAIL!, process.env.POCKETBASE_ADMIN_PASSWORD!);

const applicationConfig = {
  name: "Launch Pad Application Portal",
  time: {
    start: new Date("2021-09-01"),
    end: new Date("2024-09-30"),
  },
};

export async function getApplicationConfig() {
  return applicationConfig;
}

export async function submitApplication({
  formAnswers,
}: {
  formAnswers: Record<string, string | string[] | number>;
}) {
  if (!formAnswers["email"]) {
    throw new Error("Email is required");
  }

  return formAnswers;
}

export async function getApplication() {
   const token = cookies().get("pb_auth")?.value as string;
   if (!token) {
     return null;
   }

   const data = JSON.parse(token);
   const email = data.model.email;

   if (!email) {
     return null;
   }
   try {
   const res = await pb.collection("applications").getFirstListItem(`userid="${data.model.id}"`);
    return res;
   } catch (e) {
    const newApplication: Application = {
      application: {
          ...createEmptyAnswers(),
          email: email,
      },
      status: "pending",
      resume: null,
      meta: {
        submittedAt: null,
        team: null,
        reviewer: null,
        level: "not determined",
        notes: null,
      },
      };
      const newApp = await pb.collection("applications").create({
        ...newApplication,
        userid: data.model.id,
      });    
      return newApp;
    }
}


export async function updateApplication(application: Obj) {
  const token = cookies().get("pb_auth")?.value as string;
  const data = JSON.parse(token);
  const m = await pb.collection("applications").getFirstListItem(`userid="${data.model.id}"`);
  const id = m.id;
  const res = await pb.collection("applications").update(id, {
    application: {
      ...m.application,
      ...application,
    },
    userid: data.model.id,
  });
  return res;
}


export async function handleFileUpload(formData: FormData) {
  const resume = formData.get("resume") as File;
  const token = cookies().get("pb_auth")?.value as string;
  const data = JSON.parse(token);
  const m = await pb.collection("applications").getFirstListItem(`userid="${data.model.id}"`);
  const id = m.id;
   await pb.collection("applications").update(id, {
    files: [resume]
    }
  );

}

export async function getApplicationStatus() {
 
  const applicationStatus: {status: ApplicationStatus | null} = {
    status: null,
  };
  const token = cookies().get("pb_auth")?.value as string;
  const data = JSON.parse(token);
  try {
    const res = await pb.collection("applications").getFirstListItem(`userid="${data.model.id}"`);

    if (!res) {
      return applicationStatus;
    }
  
    if (res.status === "pending") {
      applicationStatus.status = "pending";
    } else {
      applicationStatus.status = "submitted";
    }
    return applicationStatus;
  } catch (e) {
     return {
      status: "not started",
     }
  }

}