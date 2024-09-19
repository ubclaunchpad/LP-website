"use client";

import { GenericResult } from "@/components/forms/resultPages";
import { Form } from "@/lib/types/application";
import { Button } from "@/components/primitives/button";
import { useState } from "react";

export default function OfferPage({ form, app }: { form: Form; app: any }) {
  const [reqStatus, setReqStatus] = useState<"idle" | "loading" | "error">(
    "idle",
  );
  const [status, setStatus] = useState<
    "offered" | "accepted" | "declined" | "error"
  >(app.applications.status);
  const applicationConfig = form.config.application;
  const page = applicationConfig.pages["offerPage"];
  const text = page.content;
  const cleanedText = replaceTemplateValues(text, app.details);

  async function handleDecision(decision: "accepted" | "declined") {
    setReqStatus("loading");
    const res = await fetch(`/portal/api/v1/offers/${app.applications.id}`, {
      method: "POST",
      body: JSON.stringify({ status: decision }),
    });
    if (res.ok) {
      setStatus(decision);
      setReqStatus("idle");
    } else {
      setStatus("error");
      setReqStatus("error");
    }
  }

  return (
    <>
      {(() => {
        switch (status) {
          case "error":
            return (
              <div className="text-red-500 text-lg">
                There was an error processing your request. Please try again
                later.
              </div>
            );
          case "declined":
            return (
              <div className="text-red-200  white-glow  rounded-full px-4 p-1 text-lg">
                <span className="text-white animate-pulse">
                  You have declined the offer :(
                </span>
              </div>
            );
          default:
            return (
              <GenericResult
                application={form}
                message={cleanedText}
                asMarkdown
              >
                {status === "accepted" ? (
                  <div className="text-red-200  bg-lp-500  rounded px-4 p-1 text-lg">
                    <span className="text-white  ">
                      You have accepted the offer! 🎉
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    {reqStatus === "loading" && (
                      <div className="text-red-200  bg-lp-500  rounded px-4 p-1 text-lg">
                        <span className="text-white  ">
                          Sending the right signal to the server...
                        </span>
                      </div>
                    )}
                    <div className="flex pt-10 flex-col lg:flex-row gap-2 w-full [&>*]:flex-1">
                      <Button
                        disabled={reqStatus === "loading"}
                        onClick={() => handleDecision("declined")}
                        variant={"secondary"}
                      >
                        I Decline
                      </Button>
                      <Button
                        onClick={() => handleDecision("accepted")}
                        disabled={reqStatus === "loading"}
                      >
                        I Accept
                      </Button>
                    </div>
                  </div>
                )}
              </GenericResult>
            );
        }
      })()}
    </>
  );
}

function replaceTemplateValues(text: string, values: any) {
  const regex = /{{(.*?)}}/g;
  const matches = text.match(regex);
  if (!matches) {
    return text;
  }
  let newText = text;
  matches.forEach((match) => {
    const key = match.replace("{{", "").replace("}}", "");
    if (!values[key]) {
      newText = newText.replace(match, "");
    } else {
      newText = newText.replace(match, values[key]);
    }
  });
  return newText;
}
