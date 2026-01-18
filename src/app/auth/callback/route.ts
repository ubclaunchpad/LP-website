import { NextResponse } from "next/server";
import { createClient } from "@/lib/utils/supabase/server";
import { db } from "@/db";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("redirect") ?? "/portal";

  if (code) {
    try {
      const supabase = createClient();
      const {
        error,
        data: { user },
      } = await supabase.auth.exchangeCodeForSession(code);

      if (!error && user) {
        try {
          const {
            data: { user: user_details },
          } = await supabase.auth.getUser();

          if (user_details?.user_metadata && user_details.email) {
            const fullName =
              user_details.user_metadata.full_name ||
              user_details.user_metadata.name ||
              user_details.email;
            const nameParts = fullName.split(" ");
            const firstName = nameParts[0] || "Unknown";
            const lastName = nameParts.slice(1).join(" ") || "User";

            await db.members.upsert({
              where: { id: user.id },
              create: {
                id: user.id,
                first_name: firstName,
                last_name: lastName,
                faculty: "N/A",
                grad_year: 2025,
                specialization: "N/A",
                year_level: 1,
              },
              update: {},
            });
          }

          return NextResponse.redirect(`${origin}${next}`);
        } catch (dbError) {
          console.error("Database error:", dbError);
          // Continue with redirect even if database operation fails
          return NextResponse.redirect(`${origin}${next}`);
        }
      }
    } catch (authError) {
      console.error("Auth error:", authError);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth`);
}
