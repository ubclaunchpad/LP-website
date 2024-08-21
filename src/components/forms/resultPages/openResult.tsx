"use client";
import { Form } from "@/lib/types/application";
import { startApplication } from "@/app/portal/forms/actions";
import { useRouter } from "next/navigation";
import { Button } from "@/components/primitives/button";

const text = {
  title: "UBC Launch Pad Application Portal",
  open: "Applications are open!",
  apply: "Apply now",
};

export default function OpenForm({ form }: { form: Form }) {
  const router = useRouter();
  async function createApplication() {
    const res = await startApplication({ formId: BigInt(form.id) });
    if (res) {
      return router.push(`/portal/forms/${form.id}/apply`);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center h-full p-10 gap-10 w-full z-10 *:z-20">
      <div className="flex flex-col w-full  max-w-3xl gap-10 flex-1  p-10">
        <h1 className="text-5xl text-left w-full font-heading text-white">
          {form.title}
        </h1>
        <div className="flex items-center justify-between gap-10">
          <h2 className="text-xl  font-heading text-white">{text.open}</h2>
          <Button
            onClick={createApplication}
            className="bg-white w-fit text-black rounded-lg px-4 text-lg p-2"
          >
            {text.apply}
          </Button>
        </div>
      </div>
    </div>
  );
}
