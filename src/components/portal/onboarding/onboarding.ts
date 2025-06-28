"use server";

import { db } from "@/db";

export async function updateGithubUsername(username: string, id: string) {
  try {
    await db.members.update({
      where: {
        id: id,
      },
      data: {
        github_username: username,
      },
    });
  } catch (error) {
    console.error("Error updating github username", error);
    throw new Error("Error updating github username");
  }
}

export async function updateDiscordUsername(username: string, id: string) {
  try {
    await db.members.update({
      where: {
        id: id,
      },
      data: {
        discord_id: username,
      },
    });
  } catch (error) {
    console.error("Error updating discord username", error);
    throw new Error("Error updating discord username");
  }
}
