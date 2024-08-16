"use server";

import { cookies } from "next/headers";
import PocketBase from 'pocketbase';


type ApplicationRound = {
    created: string;
    id: string;
    title: string;
    updated: string;
    start: string;
    end: string;
};

type ApplicationDetails = ApplicationRound & {
    submissions: object[];
};


const pb = new PocketBase(process.env.POCKETBASE_URL);
await pb.admins.authWithPassword(process.env.POCKETBASE_ADMIN_EMAIL!, process.env.POCKETBASE_ADMIN_PASSWORD!);


export async function getApplicationRounds() : Promise<ApplicationRound[]> {
  const res = await pb.collection("application_rounds").getFullList();
  return res as unknown as ApplicationRound[];
}

export async function getApplicationRound(id: string) : Promise<ApplicationDetails> {
  const res = await pb.collection("application_rounds").getFirstListItem(`id="${id}"`);
  const apps = await pb.collection("applications").getFullList( {
    filter: `round="${id}"`,
  })
    return {
        ...res,
        submissions: apps,
    } as unknown as ApplicationDetails;
}