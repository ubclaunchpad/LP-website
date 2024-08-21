"use server";
import { db } from "@/db";

// export async function getUsers() {
//   return db.users.findMany();
// }

export async function getForms() {
  return db.forms.findMany();
}

export async function createForm(data: { title: string; description: string }) {
  return db.forms.create({ data: { ...data, config: {}, questions: [] } });
}

export async function getForm(id: number) {
  console.log("Getting form", id);
  return db.forms.findUnique({ where: { id } });
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
