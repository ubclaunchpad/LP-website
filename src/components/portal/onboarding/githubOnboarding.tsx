"use client";

import React, { useContext, useState } from "react";
import { Button } from "@/components/primitives/button";
import { z } from "zod";
import { userContext } from "@/lib/context/usercontext";
import { Input } from "@/components/primitives/input";
import { toast } from "sonner";
import { updateGithubUsername } from "./onboarding";

const TEXT = {
  title: "Github",
  description: "Join the GitHub organization to access the codebase.",
  githubUsername:
    "First, let's confirm your GitHub username. Only one GitHub account can be linked to you.",
  inputPlaceholder: "Enter GitHub Username",
  button: "Join GitHub Organization",
  errorMessage: "GitHub validation failed. Please try again.",
  teams: "You are a member of the following teams:",
  loadingButton: "Loading...",
  successButton: "You're all set!",
  successUpdate: "Your GitHub username has been updated.",
  firstTime:
    "If you're joining the organization for the first time, Github will invite you to join the organization.",
};

const GitHubIntegrationSchema = z.object({
  githubUsername: z.string(),
  actions: z.object({
    teams: z.array(
      z.object({
        name: z.string(),
        role: z.enum(["maintainer", "member"]),
      }),
    ),
  }),
});

export default function GithubOnboarding() {
  const { user, userMetadata } = useContext(userContext);
  const [githubSetupState, setGithubSetupState] = useState<
    "initial" | "loading" | "success" | "error"
  >("initial");
  const [verifiedGithubUsername, setVerifiedGithubUsername] = useState(false);
  const [githubUsername, setGithubUsername] = useState(
    userMetadata.member?.github_username || "",
  );

  function handleUpdateGithubUsername() {
    if (userMetadata.member?.github_username === githubUsername) {
      setVerifiedGithubUsername(true);
    } else {
      updateGithubUsername(githubUsername, user.id)
        .then(() => {
          setVerifiedGithubUsername(true);
          // update github username
          toast.success(TEXT.successUpdate);
        })
        .catch(() => {
          toast.error(TEXT.errorMessage);
        });
    }
  }
  const handleGithubSubmit = async () => {
    try {
      const teams = userMetadata.member?.team_members.map((member) => ({
        name: member.teams.meta.github.team.name,
        role: "maintainer",
      }));
      const parsedGithubData = GitHubIntegrationSchema.parse({
        githubUsername: githubUsername,
        actions: {
          teams: teams,
        },
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_COLONY_URL}/colony/integrations/github`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parsedGithubData),
        },
      );

      const responseBody = await response.text();
      if (!response.ok) {
        toast.error(responseBody);
        setGithubSetupState("error");
      } else {
        toast.success(responseBody);
        toast.success(TEXT.firstTime);
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

      <section className="flex flex-col items-start gap-4 w-full">
        <p>{TEXT.githubUsername}</p>
        <div className="flex items-center w-full gap-2 gap-4">
          <Input
            disabled={verifiedGithubUsername}
            type="text"
            placeholder="Enter GitHub Username"
            className={`p-2 flex-1 flex-shrink-0 border  border-background-500 rounded   w-full ${verifiedGithubUsername ? " border-lp-400 text-lp-400 " : "bg-background-600"}`}
            value={githubUsername}
            onChange={(e) => setGithubUsername(e.target.value)}
          />
          {!verifiedGithubUsername && (
            <Button
              variant={"secondary"}
              disabled={verifiedGithubUsername}
              onClick={handleUpdateGithubUsername}
              className=" font-semibold bg-background-500 border border-background-500 w-fit rounded text-sm hover:bg-background-400"
            >
              {userMetadata.member?.github_username === githubUsername
                ? "Looks Good"
                : "Save"}
            </Button>
          )}
        </div>
      </section>

      {verifiedGithubUsername && (
        <section className="flex flex-col flex-1 items-start gap-4 w-full">
          <p>{TEXT.teams}</p>
          <div className="flex flex-col w-full flex-1  gap-4">
            <ul className="flex flex-wrap gap-2">
              {userMetadata.member?.team_members &&
                userMetadata.member.team_members.map((member) => (
                  <li
                    key={member.member_id}
                    className="border border-lp-300 bg-background-600 p-1 text-sm rounded-full w-fit px-4"
                  >
                    {member.teams.name}
                  </li>
                ))}
            </ul>
            <div className="flex flex-1  pt-4 flex-col items-center w-full gap-4">
              <Button
                disabled={
                  githubSetupState === "loading" ||
                  githubSetupState === "success"
                }
                onClick={handleGithubSubmit}
                className="p-6 gap-4  w-fit md:min-w-[350px] f text-lg rounded-full"
              >
                {githubSetupState === "loading"
                  ? TEXT.loadingButton
                  : githubSetupState === "success"
                    ? TEXT.successButton
                    : TEXT.button}
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
