"use client";
import { Form } from "@/lib/types/application";
import { startApplication } from "@/app/portal/forms/actions";
import { useRouter } from "next/navigation";
import { Button } from "@/components/primitives/button";
import { useState } from "react";
import { toast } from "sonner";

const text = {
  title: "UBC Launch Pad Application Portal",
  open: "Applications are open!",
  apply: "Apply now",
  creating: "Starting your application...",
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
    <div className="flex flex-col items-center justify-center h-full p-10 gap-10 w-full z-10 *:z-20">
      <div className="flex flex-col w-full  max-w-3xl gap-10 flex-1  p-10">
        <h1 className="text-5xl text-left w-full font-heading text-white">
          {form.title}
        </h1>
        <div className="flex flex-col  justify-between gap-10">
          <h2 className="text-xl  font-heading text-white">{text.open}</h2>
          <Button
            disabled={loading}
            onClick={createApplication}
            className="bg-white w-fit text-black rounded-lg px-4 text-lg p-2"
          >
            {loading ? text.creating : text.apply}
          </Button>
        </div>
      </div>
    </div>
  );
}
