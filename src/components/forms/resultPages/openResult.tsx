"use client";
import { Form } from "@/lib/types/application";
import { startApplication } from "@/app/portal/forms/actions";
import { useRouter } from "next/navigation";
import { Button } from "@/components/primitives/button";
import { useState } from "react";
import { toast } from "sonner";
import LaunchRocket from "../launch/launchRocket";

const text = {
  title: "UBC Launch Pad Application Portal",
  open: "Applications are open!",
  apply: "Begin launch sequence",
  creating: "Preparing launch...",
};

export default function OpenForm({ form }: { form: Form }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  function createApplication() {
    setLoading(true);
    startApplication({ formId: BigInt(form.id) })
      .then(() => {
        router.push(`/portal/forms/${form.id}/apply`);
      })
      .catch(() => {
        setLoading(false);
        toast.error("Error starting application");
      });
  }
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 lg:p-10 gap-10 w-full z-10 *:z-20">
      <div className="glass-panel flex flex-col w-full max-w-3xl gap-10 p-6 lg:p-10 animate-fade-up">
        <div className="flex items-center gap-2.5">
          <LaunchRocket firing={false} direction="right" size={16} />
          <span className="text-[11px] font-semibold tracking-[0.24em] uppercase text-lp-200/90">
            Mission briefing
          </span>
        </div>
        <h1 className="text-4xl lg:text-5xl w-full font-heading text-white">
          {form.title}
        </h1>
        <div className="flex flex-col justify-between gap-6">
          <h2 className="text-xl font-heading text-white">{text.open}</h2>
          <div>
            <Button
              disabled={loading}
              onClick={createApplication}
              className="bg-gradient-to-r from-lp-700 via-lp-500 to-lp-400 w-fit text-white rounded-full px-8 text-lg py-3 font-bold hover:brightness-110 transition-all duration-200 shadow-[0_0_32px_rgba(91,114,249,0.4)]"
            >
              {loading ? text.creating : text.apply}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
