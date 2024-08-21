"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/utils/supabase/server";

export async function login() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: process.env.NEXT_PUBLIC_BASE_URL + "/auth/callback",
    },
  });

  if (data.url) {
    revalidatePath("/", "layout");
    redirect(data.url); // use the redirect API for your server framework
  }

  if (error) {
    redirect("/error");
  }

  return data;
}
