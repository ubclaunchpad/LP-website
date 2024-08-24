"use server";
import { db } from "@/db";

export async function getForms() {
  return db.forms.findMany();
}

export async function createForm(data: { title: string; description: string }) {
  return db.forms.create({ data: { ...data, config: {}, questions: [] } });
}

export async function getForm(id: number) {
  try {
    return db.forms.findFirst({ where: {
        id: BigInt(id) } });
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
