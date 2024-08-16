"use client";

import { useCallback, useEffect, useState } from "react";
import { client } from "@/app/lib/util/client";
import { redirect, useSearchParams } from "next/navigation";

export default function RedirectPage() {
  const [authState, setAuthState] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const searchParams = useSearchParams();

  const authenticateCallback = useCallback(authenticate, [searchParams]);

  async function authenticate() {
    try {
      if (!searchParams.has("code")) {
        throw new Error("No code found");
      }

      const providerData = localStorage.getItem("provider");
      const code = searchParams.get("code");
      if (!providerData || !code) {
        throw new Error("No provider data or code found");
      }

      const provider = JSON.parse(providerData);

      const res = await client
        .collection("users")
        .authWithOAuth2Code(
          provider.name,
          code,
          provider.codeVerifier,
          process.env.NEXT_PUBLIC_REDIRECT_URL!,
          {
            role: "default",
          },
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

      console.log("Logged in");

      setAuthState("success");
    } catch (e) {
      setAuthState("error");
      console.log(e);
      console.log("Error logging in");
    }
  }

  useEffect(() => {
    authenticateCallback();
  }, [authenticateCallback]);

  if (authState === "loading") {
    return (
      <div className="flex flex-col relative shadow justify-center items-center  w-full  p-10 rounded-xl max-h-full max-w-lg h-[600px]  border-neutral-800 bg-neutral-900 gap-4">
        <div className="flex flex-col items-center gap-4 w-full">
          <span className="text-white">Logging in...</span>
        </div>
      </div>
    );
  }

  if (authState === "success") {
    redirect("/portal/applications");
  }

  if (authState === "error") {
    redirect("/auth");
  }
}
