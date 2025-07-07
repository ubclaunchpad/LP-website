import { NextResponse } from "next/server";
import { createClient } from "@/lib/utils/supabase/server";
import { db } from "@/db";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("redirect") ?? "/portal";

  if (code) {
    const supabase = createClient();
    const {
      error,
      data: { user },
    } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && user) {
      const {
        data: { user: user_details },
      } = await supabase.auth.getUser();
      if (user_details?.user_metadata && user_details.email) {
        const [firstName, ...lastNameParts] =
          user_details.user_metadata.full_name.split(" ");
        const lastName = lastNameParts.join(" ");

        await db.members.upsert({
          where: { id: user.id },
          create: {
            id: user.id,
            first_name: firstName,
            last_name: lastName,
            faculty: "N/A",
            grad_year: 0,
            specialization: "N/A",
            year_level: 0,
          },
          update: {},
        });
      }
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/error`);
}
