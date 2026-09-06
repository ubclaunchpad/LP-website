import { useState } from "react";
import { submitApplication } from "@/app/portal/forms/actions";
import GenericGreeter from "@/components/layouts/genericGreeter";
import { toast } from "sonner";
import { Button } from "@/components/primitives/button";
import { FormDetails, FormStep } from "@/lib/types/questions";
import LaunchRocket from "../launch/launchRocket";

export default function BeforeSubmitTab({
  goToPreviousTab,
  formId,
  otherUser,
  formData,
  formQuestions,
}: {
  goToPreviousTab: () => void;
  formId: number | bigint;
  otherUser?: string;
  formData?: FormDetails;
  formQuestions?: FormStep[];
}) {
  const [submitted, setSubmitted] = useState<
    "not submitted" | "submitting" | "submitted"
  >("not submitted");
  let subpage = null;

  // Function to render form data
  const renderFormData = () => {
    if (!formData || !formQuestions) return null;

    return (
      <div className="w-full bg-white/[0.03] p-6 rounded-xl border border-white/10 mt-6">
        <h3 className="text-xl font-heading font-bold mb-4">
          Your Submitted Answers
        </h3>
        <div className="space-y-6">
          {formQuestions.map((step, stepIndex) => (
            <div key={stepIndex} className="space-y-4">
              <h4 className="text-lg font-semibold text-lp-300 border-b border-white/10 pb-2">
                {step.title}
              </h4>
              {step.questions.map((question) => {
                const formItem = formData[question.id];
                if (
                  !formItem ||
                  formItem.value === null ||
                  formItem.value === undefined ||
                  formItem.value === ""
                ) {
                  return null;
                }

                let displayValue = formItem.value;
                if (Array.isArray(displayValue)) {
                  displayValue = displayValue.join(", ");
                }

                return (
                  <div
                    key={question.id}
                    className="bg-white/[0.04] p-4 rounded border border-white/10"
                  >
                    <div className="font-medium text-neutral-200 mb-2">
                      {question.label}
                    </div>
                    <div className="text-neutral-300 whitespace-pre-wrap">
                      {String(displayValue)}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (submitted === "submitted") {
    subpage = (
      <div className="glass-panel flex flex-col items-center p-10 lg:p-14 gap-5 w-full max-w-2xl text-center animate-fade-up">
        <LaunchRocket
          firing
          direction="up"
          size={80}
          className="drop-shadow-[0_0_34px_rgba(255,122,61,0.4)]"
        />
        <h2 className="text-2xl font-heading font-bold">
          {"Your application has been submitted!"}
        </h2>
        <p className="text-neutral-300 text-base">
          {
            "If you have any questions, please contact us at strategy@ubclaunchpad.com."
          }
        </p>
      </div>
    );
  } else {
    subpage = (
      <div className="glass-panel flex flex-col text-lg justify-center p-4 lg:p-10 gap-4 w-full max-w-4xl animate-fade-up">
        <div className="flex items-center gap-3">
          <LaunchRocket firing direction="right" size={20} />
          <span className="text-[11px] font-semibold tracking-[0.24em] uppercase text-lp-200/90">
            Final check
          </span>
        </div>
        <h2 className="text-2xl lg:text-3xl font-heading font-bold">
          {"You're one step away from submitting your application!"}
        </h2>
        <p className="text-base text-neutral-300">
          Before you submit, please review your answers and make sure all the
          information is correct.
        </p>

        {renderFormData()}

        <div className="flex items-center justify-center w-full gap-4 flex-wrap pt-2">
          <Button
            type="button"
            className="bg-white/10 text-xl font-semibold text-white p-2 w-fit px-8 hover:bg-white/20 transition-all duration-200 ease-in-out rounded-full"
            onClick={goToPreviousTab}
          >
            Go back
          </Button>
          <Button
            disabled={submitted === "submitting"}
            type="button"
            className="bg-gradient-to-r from-lp-700 via-lp-500 to-lp-400 text-xl font-bold text-white p-3 w-fit px-10 hover:brightness-110 transition-all duration-200 ease-in-out rounded-full shadow-[0_0_36px_rgba(91,114,249,0.45)]"
            onClick={() =>
              submitApplication({
                formId: BigInt(formId),
                otherUser: otherUser,
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
            {submitted === "submitting" ? "Igniting..." : "Ignite launch"}
          </Button>
        </div>
      </div>
    );
  }
  return (
    <GenericGreeter includeStyle={false}>
      {subpage}
    </GenericGreeter>
  );
}
