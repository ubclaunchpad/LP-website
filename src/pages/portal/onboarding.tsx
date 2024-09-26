import React, { useState} from "react";
import Image from "next/image";
import Link from "next/link";
import "../../app/globals.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faFigma } from "@fortawesome/free-brands-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { SiNotion } from "react-icons/si";
import { Button } from "@/components/primitives/button";
import { useRouter } from "next/router";

const URLs = {
  GitHub: "https://github.com/ubclaunchpad",
  Discord: "https://discord.gg/AgQbWykt",
  Notion:
    "https://www.notion.so/team/ad259dbf-777e-4e03-b71e-cff48817296f/join",
  Figma: "https://www.figma.com/team_invite/redeem/LEa6Ds0anjxIFqZx37WF1X",
  Calendar:
    "https://calendar.google.com/calendar/u/0?cid=Y19rMHJqc3JlZzJjbXQzZWtiYWNuNjBvMGprNEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t",
};

const Onboarding = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [isNextClickable, setIsNextClickable] = useState(false);

  const handleStartClick = () => {
    setStep(1);
    setIsNextClickable(false);
    setTimeout(() => {
      router.push({
        pathname: "/portal/onboarding",
        query: { step: "1", state: "not_started" },
      });
    }, 1000);
  };

  const handleNextStepClick = (nextStep: number, state: string) => {
    setStep(nextStep);
    setIsNextClickable(false);
    setTimeout(() => {
      router.push({
        pathname: "/portal/onboarding",
        query: { step: nextStep.toString(), state },
      });
    }, 1000);
  };

  const handlePrevStepClick = (prevStep: number, state: string) => {
    setStep(prevStep);
    setIsNextClickable(false);
    setTimeout(() => {
      router.push({
        pathname: "/portal/onboarding",
        query: { step: prevStep.toString(), state },
      });
    }, 1000);
  };

  const handleActionClick = () => {
    setIsNextClickable(true);
  };

  const handleEndClick = () => {
    setStep(7);
    router.push("/");
  };

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
      <div className="w-screen h-screen bg-primary flex justify-center items-center">
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
            <div className="bg-secondary font-mono text-white p-16 shadow-2xl w-1/2 h-2/3 flex flex-col justify-center items-center rounded-lg border border-purple-300">
              {step === 0 ? (
                <>
                  <div className="text-4xl font-semibold text-center font-heading mb-8">
                    Welcome to Member{" "}
                    <div className="text-indigo-400 font-bold"> Onboarding</div>
                  </div>
                  <Button
                    onClick={handleStartClick}
                    className="p-4 mt-12 w-full md:w-[129px] font-semibold text-lg rounded-xl bg-primary"
                  >
                    {"Start"}
                  </Button>
                </>
              ) : step === 1 ? (
                // Step 1: GitHub
                <>
                  <div className="text-4xl font-semibold text-center font-heading mb-8">
                    Step 1: Connect to GitHub
                  </div>
                  <Button
                    onClick={() => {
                      window.open(URLs.GitHub, "_blank");
                      handleActionClick();
                    }}
                    className="p-6 mt-4 bg-slate-800 w-full md:w-[350px] font-semibold text-lg rounded-xl"
                  >
                    <FontAwesomeIcon icon={faGithub} className="mr-2" />
                    {"Join GitHub server"}
                  </Button>
                  <Button
                    onClick={() => handleNextStepClick(2, "connect_github")}
                    disabled={!isNextClickable}
                    className={`p-4 mt-12 w-full md:w-[129px] font-semibold text-lg rounded-xl ${
                      isNextClickable
                        ? "bg-primary"
                        : "bg-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {"Next"}
                  </Button>
                  <Button
                    onClick={() => handlePrevStepClick(0, "not_started")}
                    className="p-4 mt-4 w-full md:w-[129px] font-semibold text-lg rounded-xl bg-lightPurple4"
                  >
                    {"Prev"}
                  </Button>
                </>
              ) : step === 2 ? (
                // Step 2: Discord
                <>
                  <div className="text-4xl font-semibold text-center font-heading mb-8">
                    Step 2: Connect to Discord
                  </div>
                  <Button
                    onClick={() => {
                      window.open(URLs.Discord, "_blank");
                      handleActionClick();
                    }}
                    className="p-6 mt-4 bg-[#5662EB] w-full md:w-[350px] font-semibold text-lg rounded-xl"
                  >
                    <FontAwesomeIcon icon={faDiscord} className="mr-2" />
                    {"Join discord server"}
                  </Button>
                  <Button
                    onClick={() => handleNextStepClick(3, "connect_discord")}
                    disabled={!isNextClickable}
                    className={`p-4 mt-12 w-full md:w-[129px] font-semibold text-lg rounded-xl ${
                      isNextClickable
                        ? "bg-primary"
                        : "bg-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {"Next"}
                  </Button>
                  <Button
                    onClick={() => handlePrevStepClick(1, "connect_github")}
                    className="p-4 mt-4 w-full md:w-[129px] font-semibold text-lg rounded-xl bg-lightPurple4"
                  >
                    {"Prev"}
                  </Button>
                </>
              ) : step === 3 ? (
                // Step 3: Notion
                <>
                  <div className="text-4xl font-semibold text-center font-heading mb-8">
                    Step 3: Connect to Notion
                  </div>
                  <Button
                    onClick={() => {
                      window.open(URLs.Notion, "_blank");
                      handleActionClick();
                    }}
                    className="p-6 mt-4 bg-[#F7F7F7] w-full md:w-[350px] font-semibold text-lg text-black rounded-xl"
                  >
                    <SiNotion className="mr-2" />
                    {"Join Notion workspace"}
                  </Button>
                  <Button
                    onClick={() => handleNextStepClick(4, "connect_notion")}
                    disabled={!isNextClickable}
                    className={`p-4 mt-12 w-full md:w-[129px] font-semibold text-lg rounded-xl ${
                      isNextClickable
                        ? "bg-primary"
                        : "bg-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {"Next"}
                  </Button>
                  <Button
                    onClick={() => handlePrevStepClick(2, "connect_discord")}
                    className="p-4 mt-4 w-full md:w-[129px] font-semibold text-lg rounded-xl bg-lightPurple4"
                  >
                    {"Prev"}
                  </Button>
                </>
              ) : step === 4 ? (
                // Step 4: Figma
                <>
                  <div className="text-4xl font-semibold text-center font-heading mb-8">
                    Step 4: Connect to Figma
                  </div>
                  <Button
                    onClick={() => {
                      window.open(URLs.Figma, "_blank");
                      handleActionClick();
                    }}
                    className="p-6 mt-4 bg-[#03011B] w-full md:w-[350px] font-semibold text-lg rounded-xl"
                  >
                    <FontAwesomeIcon icon={faFigma} className="mr-2" />
                    {"Join Figma workspace"}
                  </Button>
                  <Button
                    onClick={() => handleNextStepClick(5, "connect_figma")}
                    disabled={!isNextClickable}
                    className={`p-4 mt-12 w-full md:w-[129px] font-semibold text-lg rounded-xl ${
                      isNextClickable
                        ? "bg-primary"
                        : "bg-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {"Next"}
                  </Button>
                  <Button
                    onClick={() => handlePrevStepClick(3, "connect_notion")}
                    className="p-4 mt-4 w-full md:w-[129px] font-semibold text-lg rounded-xl bg-lightPurple4"
                  >
                    {"Prev"}
                  </Button>
                </>
              ) : step === 5 ? (
                // Step 5: Calendar
                <>
                  <div className="text-4xl font-semibold text-center font-heading mb-8">
                    Step 5: Connect to our Calendar
                  </div>
                  <Button
                    onClick={() => {
                      window.open(URLs.Calendar, "_blank");
                      handleActionClick();
                    }}
                    className="p-6 mt-4 bg-blue-500 w-full md:w-[350px] font-semibold text-lg rounded-xl"
                  >
                    <FontAwesomeIcon icon={faCalendar} className="mr-2" />
                    {"Add Google Calendar"}
                  </Button>
                  <Button
                    onClick={() => handleNextStepClick(6, "connect_calendar")}
                    disabled={!isNextClickable}
                    className="p-4 mt-12 w-full md:w-[129px] font-semibold text-lg rounded-xl bg-primary"
                  >
                    {"Next"}
                  </Button>
                  <Button
                    onClick={() => handlePrevStepClick(4, "connect_figma")}
                    className="p-4 mt-4 w-full md:w-[129px] font-semibold text-lg rounded-xl bg-lightPurple4"
                  >
                    {"Prev"}
                  </Button>
                </>
              ) : (
                <>
                  <div className="text-4xl font-semibold text-center font-heading mb-8">
                    Onboarding Complete!
                    <div className="text-xl mt-4">
                      You can repeat these steps in future terms when needed
                    </div>
                  </div>
                  <Button
                    onClick={handleEndClick}
                    className="p-4 mt-12 w-full md:w-[129px] font-semibold text-lg rounded-xl bg-primary"
                  >
                    {"Go to Home"}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
