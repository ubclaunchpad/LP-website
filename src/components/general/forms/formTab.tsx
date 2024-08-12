"use client";

import {  FormStep } from "@/app/lib/types/questions";
import FormItemInput from "./formItem";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function FormTab({
  step,
  totalSteps,
  role,
}: {
  step: FormStep;
  totalSteps: number;
  role: string;
}) {
  const { title, questions } = step;
  const formQuestions = questions;
  return (
    <div className="flex flex-col items-center flex-1   lg:max-w-4xl h-full overflow-y-scroll max-h-screen flex-shrink-0  lg:border gelatine shadow-sm border-neutral-800  bg-neutral-900 lg:p-10 p-2 rounded-2xl gap-4 w-full">
      <h2 className="text-2xl font-heading w-full text-left border-b border-neutral-800 pb-5 text-white">
        {title}
      </h2>
      <div className="flex-1 flex-col flex gap-2 w-full relative">
        {step.target !== "everyone" &&
        role.toLowerCase() !== step.target.toLowerCase() ? (
          <div className="w-full bg-neutral-900 text-white p-2 rounded-md absolute top-0 gap-4 left-0 h-full z-40 flex flex-col items-center ">
            <div className="text-lg flex-1 font-bold">
              Not related to your role - You can skip this step
            </div>
            <FormTabBottomBar numberOfTabs={totalSteps} />
          </div>
        ) : (
          <>
            <div className="w-full flex-1 flex flex-col gap-2">
              {formQuestions.map((question, index) => (
                <FormItemInput question={question} key={index} />
              ))}
            </div>
            <FormTabBottomBar numberOfTabs={totalSteps} />
          </>
        )}
      </div>
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: any }) {
  return (
    <Link
      href={href}
      className="bg-white text-black font-bold rounded-md h-fit px-8 text-md p-2"
    >
      {children}
    </Link>
  );
}

function FormTabBottomBar({ numberOfTabs }: { numberOfTabs: number }) {
  const searchParams = useSearchParams();
  const step = parseInt(searchParams.get("step") as string);
  const place: "first" | "last" | "other" =
    step === 1 ? "first" : step === numberOfTabs ? "last" : "other";

  return (
    <div className=" flex justify-between gap-4  w-full items-end">
      <nav className=" items-center justify-between w-full p-2 hidden md:flex">
        <span>UBC Launch Pad Application Portal</span>
      </nav>
      {place !== "first" ? (
        <NavLink
          href={`/portal/applications/apply?state=form&step=${step - 1}`}
        >
          Back
        </NavLink>
      ) : (
        <div></div>
      )}
      {place !== "last" ? (
        <NavLink
          href={`/portal/applications/apply?state=form&step=${step + 1}`}
        >
          Next
        </NavLink>
      ) : (
        <NavLink href={`/portal/applications/apply?state=form&step=1`}>
          Submit
        </NavLink>
      )}
    </div>
  );
}
