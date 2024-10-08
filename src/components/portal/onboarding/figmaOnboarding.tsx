"use client";

import React, { useState } from "react";
import { Button } from "@/components/primitives/button";
import { toast } from "sonner";
import Link from "next/link";

const TEXT = {
  title: "Figma",
  description:
    "Join the Figma workspace to access the design files and resources. You must have a Figma account and have the student status verified!",
  figmaInvite:
    "https://www.figma.com/team_invite/redeem/LEa6Ds0anjxIFqZx37WF1X",
  loadingButton: "Loading...",
  successButton: "You're all set!",
  checkJoin: "Have you joined the Figma workspace?",
  yesJoin: "Yes, I've joined!",
  noJoin: "No, I haven't joined yet.",
  button: "Join Figma Workspace",
  joined: "You're all set!",
  inital: "Click on the join button to join the Figma workspace.",
};

export default function FigmaOnboarding() {
  const [state, setState] = useState<"initial" | "progress" | "success">(
    "initial",
  );

  function handleUpdateNotion(toState: "yes" | "no") {
    if (toState === "no") {
      setState("initial");
      toast.info(TEXT.inital);
    } else {
      setState("success");
      toast.success(TEXT.joined);
    }
  }

  return (
    <div className="flex  w-full flex-col items-center gap-10 h-full">
      <section className="flex flex-col items-start gap-4 w-full">
        <h1 className="text-4xl font-semibold text-left w-full font-heading ">
          {TEXT.title}
        </h1>
        <p className="text-lg text-left w-full ">{TEXT.description}</p>
      </section>

      {state === "initial" && (
        <section className="flex  justify-center items-start gap-4 w-full">
          <Link
            href={TEXT.figmaInvite}
            className="text-lg text-left w-fit"
            target="_blank"
            onClick={() => setState("progress")}
          >
            <Button className="p-6 gap-4  w-fit md:min-w-[350px] f text-lg rounded-full">
              {TEXT.button}
            </Button>
          </Link>
        </section>
      )}

      {state === "progress" && (
        <section className="flex flex-col items-start gap-4 w-full">
          <p>{TEXT.checkJoin}</p>
          <div className="flex flex-1  pt-4 flex-col items-center w-full gap-4">
            <Button
              onClick={() => handleUpdateNotion("no")}
              className="p-6 gap-4  w-fit md:min-w-[350px] f text-lg rounded-full"
            >
              {TEXT.noJoin}
            </Button>
            <Button
              onClick={() => handleUpdateNotion("yes")}
              className="p-6 gap-4  w-fit md:min-w-[350px] f text-lg rounded-full"
            >
              {TEXT.yesJoin}
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}