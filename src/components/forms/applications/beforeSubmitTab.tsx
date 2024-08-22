import { useState } from "react";
import { submitApplication } from "@/app/portal/forms/actions";
export default function BeforeSubmitTab({
  goToPreviousTab,
  formId,
}: {
  goToPreviousTab: () => void;
  formId: number | bigint;
}) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 gap-4 w-full">
        <h2 className="text-2xl font-heading font-bold">
          {"Your application has been submitted!"}
        </h2>
        <p>
          {
            "Thank you for applying to the Developer Program. We'll review your application and get back to you as soon as possible."
          }
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-4 w-full">
      <h2 className="text-2xl font-heading font-bold">
        {"You're one step away from submitting your application!"}
      </h2>
      <p>
        Before you submit, please review your answers and make sure all the
        information is correct.
      </p>

      <div className="flex items-center w-full gap-10 justify-center">
        <button
          type="button"
          className="bg-gray-200 text-xl font-bold text-black p-2 w-fit px-4 hover:scale-105 transform transition-all duration-200 ease-in-out rounded"
          onClick={goToPreviousTab}
        >
          Go back
        </button>
        <button
          type="button"
          className="bg-indigo-400 text-xl font-bold text-white p-2 w-fit px-4 hover:scale-105 transform transition-all duration-200 ease-in-out rounded"
          onClick={() =>
            submitApplication({
              formId: formId as bigint,
            }).then(
              () => {
                setSubmitted(true);
              },
              (e) => {
                console.log(e);
                setSubmitted(false);
              },
            )
          }
        >
          Submit
        </button>
      </div>
    </div>
  );
}