"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/utils/supabase/server";
import { headers, cookies } from "next/headers";

export async function login() {
  const supabase = createClient();
  const c = cookies();
  const h = headers();
  const redirectPath = `redirect=${c.get("x-path")?.value || ""}`;
  c.delete("x-path");
  const callbackUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback?${redirectPath}`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: callbackUrl,
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
