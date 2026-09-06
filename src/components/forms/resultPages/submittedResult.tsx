import { Form } from "@/lib/types/application";
import LaunchRocket from "../launch/launchRocket";

export default function SubmittedResult({ application }: { application: Form }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 p-6 gap-10 w-full">
      <div className="glass-panel flex flex-col items-center text-center max-w-2xl w-full gap-5 p-10 lg:p-14 animate-fade-up">
        <LaunchRocket
          firing
          direction="up"
          size={88}
          className="drop-shadow-[0_0_40px_rgba(255,122,61,0.45)]"
        />
        <h1 className="text-3xl lg:text-5xl font-heading font-bold text-white">
          Liftoff successful
        </h1>
        <p className="text-lg text-neutral-300">
          {application.title} — your application has been submitted.
        </p>
        <p className="text-neutral-400 text-base">
          Sit tight: we&apos;ll review everything and reach out with next
          steps. Questions? Email{" "}
          <a
            href="mailto:strategy@ubclaunchpad.com"
            className="text-lp-300 underline underline-offset-2 hover:opacity-80"
          >
            strategy@ubclaunchpad.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
