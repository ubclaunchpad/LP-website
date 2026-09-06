"use client";
import { Form } from "@/lib/types/application";
import Link from "next/link";
import LaunchRocket from "../launch/launchRocket";

const text = {
  pending: "Your form is still in progress.",
  deadline: "Make sure to submit by $.",
  continue: "Continue my application",
};

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}

export default function PendingForm({ application }: { application: Form }) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 lg:p-10 gap-10 w-full z-10 *:z-20">
      <div className="glass-panel flex flex-col w-full max-w-3xl gap-8 p-6 lg:p-10 animate-fade-up">
        <div className="flex items-center gap-2.5">
          <LaunchRocket firing direction="right" size={16} />
          <span className="text-[11px] font-semibold tracking-[0.24em] uppercase text-lp-200/90">
            Mission in progress
          </span>
        </div>
        <h1 className="text-4xl lg:text-5xl w-full font-heading text-white">
          {application.title}
        </h1>
        <div className="flex flex-col justify-between gap-3">
          <h2 className="text-xl font-heading text-white">{text.pending}</h2>
          {application.close_at && (
            <p className="text-base lg:text-lg pb-2 text-neutral-300">
              {text.deadline.replace("$", formatDate(application.close_at))}
            </p>
          )}
          <Link
            href={`/portal/forms/${application.id}/apply`}
            className="bg-gradient-to-r from-lp-700 via-lp-500 to-lp-400 w-fit h-fit flex-shrink-0 text-white rounded-full px-8 text-lg py-3 font-bold hover:brightness-110 transition-all duration-200 shadow-[0_0_32px_rgba(91,114,249,0.4)]"
          >
            {text.continue}
          </Link>
        </div>
      </div>
    </div>
  );
}
