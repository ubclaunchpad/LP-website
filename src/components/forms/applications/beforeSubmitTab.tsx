import { useState } from "react";
import { submitApplication } from "@/app/portal/forms/actions";
import GenericGreeter from "@/components/layouts/genericGreeter";
import { toast } from "sonner";
import { Button } from "@/components/primitives/button";
export default function BeforeSubmitTab({
  goToPreviousTab,
  formId,
}: {
  goToPreviousTab: () => void;
  formId: number | bigint;
}) {
  const [submitted, setSubmitted] = useState<
    "not submitted" | "submitting" | "submitted"
  >("not submitted");
  let subpage = null;

  if (submitted === "submitted") {
    subpage = (
      <div className="flex flex-col p-10  justify-center flex-1 gap-4 w-full">
        <h2 className="text-2xl font-heading font-bold">
          {"Your form has been submitted!"}
        </h2>
        <p>
          {
            "If you have any questions, please contact us at strategy@ubclaunchpad.com."
          }
        </p>
      </div>
    );
  } else {
    subpage = (
      <div className="flex flex-col text-lg justify-center p-10 flex-1 gap-4 w-full">
        <h2 className="text-2xl font-heading font-bold">
          {"You're one step away from submitting your application!"}
        </h2>
        <p>
          Before you submit, please review your answers and make sure all the
          information is correct.
        </p>

        <div className="flex items-center justify-center w-full gap-10 ">
          <Button
            type="button"
            className="bg-gray-300 text-xl font-bold text-black p-2 w-fit px-4 hover:scale-105 transform transition-all duration-200 ease-in-out rounded"
            onClick={goToPreviousTab}
          >
            Go back
          </Button>
          <Button
            disabled={submitted === "submitting"}
            type="button"
            className="bg-indigo-400 text-xl font-bold text-white p-3 w-fit px-6 hover:scale-105 transform transition-all duration-200 ease-in-out rounded"
            onClick={() =>
              submitApplication({
                formId: BigInt(formId),
              }).then(
                () => {
                  toast.success("Your application has been submitted!");
                  setSubmitted("submitted");
                },
                (e) => {
                  console.log(e);
                  toast.error(
                    "An error occurred; refresh and try again. If the problem persists, email us.",
                    {
                      action: {
                        label: "Email Us",
                        onClick: () => {
                          window.open("mailto:strategy@ubclaunchpad.com");
                        },
                      },
                    },
                  );
                  setSubmitted("not submitted");
                },
              )
            }
          >
            {submitted === "submitting" ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>
    );
  }
  return <GenericGreeter>{subpage}</GenericGreeter>;
}
