"use client";

import React, { useContext, useState } from "react";
import { Button } from "@/components/primitives/button";
import { z } from "zod";
import { userContext } from "@/lib/context/usercontext";
import { Input } from "@/components/primitives/input";
import { toast } from "sonner";
import { updateDiscordUsername, updateGithubUsername } from "./onboarding";
import Link from "next/link";

const TEXT = {
  title: "Discord",
  description:
    "Join the Discord server to access the community and how teams communicate.",
  discordInvite: "https://discord.gg/AgQbWykt",
  joinDiscord: `First, please join our Discord server. You can join by clicking the link below:`,
  inputPlaceholder: "Enter Discord Username",
  button: "Join Discord Server",
  roles: "The following roles will be assigned to you:",
  loadingButton: "Loading...",
  successButton: "You're all set!",
  successUpdate: "Your Discord username has been updated.",
  errorMessage: "Discord validation failed. Please try again.",
  discordusername:
    "Now, let's confirm your Discord username. Only one Discord account can be linked to you. ",
  actionBtn: "Add Discord Roles",
};

const DiscordIntegrationSchema = z.object({
  discordUsername: z.string(),
  actions: z.object({
    roles: z.array(z.string()),
  }),
});

export default function DiscordOnboarding() {
  const { user, userMetadata } = useContext(userContext);
  const [state, setState] = useState<
    "initial" | "progress" | "loading" | "success" | "error"
  >("initial");
  const [verifiedDiscordUsername, setVerifiedDiscordUsername] = useState(false);
  const [discordUsername, setDiscordUsername] = useState(
    userMetadata.member?.discord_id || "",
  );

  function handleUpdateDiscordUsername() {
    if (userMetadata.member?.discord_id === discordUsername) {
      setVerifiedDiscordUsername(true);
    } else {
      updateDiscordUsername(discordUsername, user.id)
        .then(() => {
          setVerifiedDiscordUsername(true);
          toast.success(TEXT.successUpdate);
        })
        .catch(() => {
          toast.error(TEXT.errorMessage);
        });
    }
  }
  const handleGithubSubmit = async () => {
    try {
      const roles: string[] = [];
      if (!userMetadata.member?.team_members) {
        return;
      }
      for (const member of userMetadata.member?.team_members) {
        roles.push(...member.teams.meta.discord.roles);
      }
      const parsed = DiscordIntegrationSchema.parse({
        discordUsername: discordUsername,
        actions: {
          roles: roles,
        },
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_COLONY_URL}/colony/integrations/discord`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parsed),
        },
      );

      const responseBody = await response.text();
      if (!response.ok) {
        toast.error(responseBody);
        setState("error");
      } else {
        toast.success(responseBody);
      }
    } catch (error) {
      console.error(error);
      toast.error(TEXT.errorMessage);
    }
  };

  return (
    <div className="flex flex-col items-center gap-10 h-full">
      <section className="flex flex-col items-start gap-4 w-full">
        <h1 className="text-4xl font-semibold text-left w-full font-heading ">
          {TEXT.title}
        </h1>
        <p className="text-lg text-left w-full ">{TEXT.description}</p>
      </section>

      {state === "initial" && (
        <section className="flex flex-col items-start gap-4 w-full">
          <p>{TEXT.joinDiscord}</p>
          <section className="flex  justify-center items-start gap-4 w-full">
            <Link
              href={TEXT.discordInvite}
              className="text-lg text-left w-fit"
              target="_blank"
              onClick={() => setState("progress")}
            >
              <Button className="p-6 gap-4  w-fit md:min-w-[350px] f text-lg rounded-full">
                {TEXT.button}
              </Button>
            </Link>
          </section>
        </section>
      )}

      {state === "progress" && (
        <section className="flex flex-col items-start gap-4 w-full">
          <p>{TEXT.discordusername}</p>
          <div className="flex items-center w-full gap-2 gap-4">
            <Input
              disabled={verifiedDiscordUsername}
              type="text"
              placeholder="Enter Discord Username"
              className={`p-2 flex-1 flex-shrink-0 border  border-background-500 rounded   w-full ${verifiedDiscordUsername ? " border-lp-400 text-lp-400 " : "bg-background-600"}`}
              value={discordUsername}
              onChange={(e) => setDiscordUsername(e.target.value)}
            />
            {!verifiedDiscordUsername && (
              <Button
                variant={"secondary"}
                disabled={verifiedDiscordUsername}
                onClick={handleUpdateDiscordUsername}
                className=" font-semibold bg-background-500 border border-background-500 w-fit rounded text-sm hover:bg-background-400"
              >
                {userMetadata.member?.discord_id === discordUsername
                  ? "Looks Good"
                  : "Save"}
              </Button>
            )}
          </div>
        </section>
      )}

      {verifiedDiscordUsername && (
        <section className="flex flex-col flex-1 items-start gap-4 w-full">
          <p>{TEXT.roles}</p>
          <div className="flex flex-col w-full flex-1  gap-4">
            <ul className="flex flex-wrap gap-2">
              {userMetadata.member?.team_members &&
                userMetadata.member.team_members.map((member) => {
                  const roles: string[] = [];
                  if (member.teams.meta.discord.roles) {
                    roles.push(...member.teams.meta.discord.roles);
                  }

                  return roles.map((role) => (
                    <li
                      key={role}
                      className="border border-lp-300 bg-background-600 p-1 text-sm rounded-full w-fit px-4"
                    >
                      {role}
                    </li>
                  ));
                })}
            </ul>
            <div className="flex flex-1  pt-4 flex-col items-center w-full gap-4">
              <Button
                disabled={state === "loading" || state === "success"}
                onClick={handleGithubSubmit}
                className="p-6 gap-4  w-fit md:min-w-[350px] f text-lg rounded-full"
              >
                {state === "loading"
                  ? TEXT.loadingButton
                  : state === "success"
                    ? TEXT.successButton
                    : TEXT.actionBtn}
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
