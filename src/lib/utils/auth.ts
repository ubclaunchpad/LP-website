import { createClient } from "@/lib/utils/supabase/server";
import { db } from "@/db";
import { User } from "@supabase/supabase-js";

export async function getSessionUser(): Promise<User | null> {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    return null;
  }
  return data.user;
}

export async function isAdmin(userId: string): Promise<boolean> {
  const role = await db.roles.findUnique({
    where: { id: userId },
  });
  return !!role && role.roles?.split(",")[0] === "admin";
}

export async function requireUser(): Promise<User> {
  const user = await getSessionUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}

export async function requireAdmin() {
  const user = await getSessionUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  if (!(await isAdmin(user.id))) {
    throw new Error("Unauthorized");
  }
  return user;
}
