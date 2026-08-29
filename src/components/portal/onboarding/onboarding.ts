"use server";

import { db } from "@/db";
import { requireUser } from "@/lib/utils/auth";

type UpdateResult = {
  success: boolean;
  error?: string;
  errorType?: string;
};

export async function updateGithubUsername(
  username: string,
): Promise<UpdateResult> {
  const user = await requireUser();
  const id = user.id;
  try {
    // First, check if the GitHub username is already taken by another user
    const existingUser = await db.members.findFirst({
      where: {
        github_username: username,
        NOT: {
          id: id, // Exclude the current user
        },
      },
    });

    if (existingUser) {
      return {
        success: false,
        error: "This GitHub username is already linked to another account",
        errorType: "USERNAME_TAKEN",
      };
    }

    await db.members.update({
      where: {
        id: id,
      },
      data: {
        github_username: username,
      },
    });

    return { success: true };
  } catch (error: any) {
    console.error("Error updating github username", error);

    // Handle Prisma unique constraint errors
    if (
      error.code === "P2002" &&
      error.meta?.target?.includes("github_username")
    ) {
      return {
        success: false,
        error: "This GitHub username is already linked to another account",
        errorType: "USERNAME_TAKEN",
      };
    }

    return {
      success: false,
      error: "Error updating GitHub username. Please try again.",
      errorType: "GENERAL_ERROR",
    };
  }
}

export async function updateDiscordUsername(
  username: string,
): Promise<UpdateResult> {
  const user = await requireUser();
  const id = user.id;
  try {
    // First, check if the Discord username is already taken by another user
    const existingUser = await db.members.findFirst({
      where: {
        discord_id: username,
        NOT: {
          id: id, // Exclude the current user
        },
      },
    });

    if (existingUser) {
      return {
        success: false,
        error: "This Discord username is already linked to another account",
        errorType: "USERNAME_TAKEN",
      };
    }

    await db.members.update({
      where: {
        id: id,
      },
      data: {
        discord_id: username,
      },
    });

    return { success: true };
  } catch (error: any) {
    console.error("Error updating discord username", error);

    // Handle Prisma unique constraint errors
    if (error.code === "P2002" && error.meta?.target?.includes("discord_id")) {
      return {
        success: false,
        error: "This Discord username is already linked to another account",
        errorType: "USERNAME_TAKEN",
      };
    }

    return {
      success: false,
      error: "Error updating Discord username. Please try again.",
      errorType: "GENERAL_ERROR",
    };
  }
}
