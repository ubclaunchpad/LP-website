"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/primitives/button";
import GithubOnboarding from "@/components/portal/onboarding/githubOnboarding";
import { ArrowLeftIcon, ArrowRight } from "lucide-react";
import DiscordOnboarding from "@/components/portal/onboarding/discordOnboarding";
import NotionOnboarding from "@/components/portal/onboarding/notionOnboarding";
import FigmaOnboarding from "@/components/portal/onboarding/figmaOnboarding";
import CalendarOnboarding from "@/components/portal/onboarding/calendarOnboarding";
import OnboardingGreeter from "@/components/portal/onboarding/onboardingGreeter";
import OnboardingEnd from "@/components/portal/onboarding/onboardingEnd";

const firstStep = 0;
const lastStep = 6;

export default function OnboardingPage() {
  const [step, setStep] = useState(2);

  const handleNextStepClick = () =>
    setStep((prev) => (prev === 6 ? prev : prev + 1));

  const handlePrevStepClick = () =>
    setStep((prev) => (prev === 0 ? prev : prev - 1));

  const stepContent = () => {
    switch (step) {
      case 0:
        return <OnboardingGreeter />;
      case 1:
        return <GithubOnboarding />;
      case 2:
        return <DiscordOnboarding />;
      case 3:
        return <NotionOnboarding />;
      case 4:
        return <FigmaOnboarding />;
      case 5:
        return <CalendarOnboarding />;
      default:
        return <OnboardingEnd />;
    }
  };

  return (
    <BackgroundWrapper>
      <div className="bg-background-700  text-white p-8 pb-2 shadow-2xl w-full max-w-xl h-full max-h-[80svh] flex flex-col justify-center items-center rounded-lg border border-background-600 ">
        {stepContent()}
        <div className="flex gap-2 justify-center w-full pt-8">
          <Button
            disabled={firstStep === step}
            onClick={() => handlePrevStepClick()}
            className="p-4  font-semibold text-lg rounded-xl bg-background-500"
          >
            <ArrowLeftIcon />
          </Button>
          <Button
            onClick={() => handleNextStepClick()}
            disabled={lastStep === step}
            className={`p-4  font-semibold text-lg rounded-xl bg-background-500`}
          >
            <ArrowRight />
          </Button>
        </div>
      </div>
    </BackgroundWrapper>
  );
}

function BackgroundWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen min-h-screen bg-background-950 justify-center items-center relative flex flex-col ">
      <Link
        href={"/"}
        className={
          "rounded-full absolute top-0 left-4 transform border-4 border-primary z-40"
        }
      >
        <Image
          src="/images/logo_circle.png"
          width={80}
          height={80}
          alt="UBC Launch Pad logo"
        />
      </Link>
      <div className="w-screen h-screen bg-background-800  flex justify-center items-center">
        <div className={"fixed space-flow top-0 left-0 w-screen h-screen"}>
          <div className={"w-[300px] h-[300px] absolute right-10 top-0"}>
            <Image
              src={"../images/assets/planet1.svg"}
              alt={"planet"}
              fill={true}
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className={"w-[267px] h-[200px] absolute left-40 bottom-10"}>
            <Image
              src={"../images/assets/planet2.svg"}
              alt={"planet"}
              fill={true}
              style={{ objectFit: "contain" }}
            />
          </div>
          <Image
            src={"../images/assets/starsBg.svg"}
            alt={"planet"}
            fill={true}
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="relative w-full h-full">
          <div className="flex justify-center items-center w-full h-full absolute top-0 left-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
