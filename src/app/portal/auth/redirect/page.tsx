"use client";


import { useEffect, useState } from "react";
import { client } from "@/app/lib/util/client";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function page() {
  const [authState, setAuthState] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const searchParams = useSearchParams();

  async function authenticate() {
    try {
      if (!searchParams.has("code")) {
        throw new Error("No code found");
      }

      const providerData = localStorage.getItem("provider");
      if (!providerData) {
        throw new Error("No provider data found");
      }

      const provider = JSON.parse(providerData);

      const res = await client
        .collection("users")
        .authWithOAuth2Code(
          provider.name,
          searchParams.get("code"),
          provider.codeVerifier,
          process.env.NEXT_PUBLIC_REDIRECT_URL,
          {
            role: "default",
          }
        );

      await fetch("/api/set-cookie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: res.token,
          model: res.record,
        }),

        credentials: "include", // Ensure cookies are included in requests
      });

      setAuthState("success");
      const ref = searchParams.get("ref");
      if (ref) {
        redirect(ref);
      } else {
        redirect("/portal/applications");
      }
    } catch (e) {
      setAuthState("error");
      console.log(e);
      console.log("Error logging in");
      redirect("/portal/auth");
    }
  }

  useEffect(() => {
    authenticate();
  }, []);

  return (
    <div className="flex flex-col relative shadow justify-center items-center  w-full  p-10 rounded-xl max-h-full max-w-lg h-[600px]  border-neutral-800 bg-neutral-900 gap-4">
      {authState === "loading" && (
        <div className="flex flex-col items-center gap-4 w-full">
          <span className="text-white">Logging in...</span>
        </div>
      )}
      {authState === "success" && (
        <div className="flex flex-col items-center gap-4 w-full">
          <span className="text-white">Logged in!</span>
          <Link
            href="/portal/applications"
            className="bg-white text-black font-bold rounded-md h-fit px-8 text-md p-2"
          >
            Take me to the portal
          </Link>
        </div>
      )}
      {authState === "error" && (
        <div className="flex flex-col items-center gap-4 w-full">
          <span className="text-white">Error logging in</span>
        </div>
      )}
    </div>
  );
}
