import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookieOptions: {
        domain: ".ubclaunchpad.com", // Set your root domain
        maxAge: 100000000,
        path: "/",
        sameSite: "lax",
        secure: true,
      },
    },
  );
}
