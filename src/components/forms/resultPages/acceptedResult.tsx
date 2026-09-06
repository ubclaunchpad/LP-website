import { Form } from "@/lib/types/application";
import LaunchRocket from "../launch/launchRocket";

const text = {
  accepted: "Congratulations! You have been accepted to UBC Launch Pad.",
};

export default function AcceptedResult({ application }: { application: Form }) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 lg:p-10 gap-10 w-full z-10 *:z-20">
      <div className="glass-panel flex flex-col w-full max-w-3xl gap-8 p-6 lg:p-10 animate-fade-up">
        <div className="flex items-center gap-2.5">
          <LaunchRocket firing direction="right" size={16} />
          <span className="text-[11px] font-semibold tracking-[0.24em] uppercase text-lp-200/90">
            Mission accomplished
          </span>
        </div>
        <h1 className="text-4xl lg:text-5xl w-full font-heading text-white">
          {application.title}
        </h1>
        <h2 className="text-xl font-heading text-white">{text.accepted}</h2>
      </div>
    </div>
  );
}
