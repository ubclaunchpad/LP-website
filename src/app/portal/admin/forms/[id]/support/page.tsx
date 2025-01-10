"use client";
import { Input } from "@/components/primitives/input";
import { submitApplication } from "@/app/portal/forms/actions";
import { Form } from "@/lib/types/application";
import { useContext, useState } from "react";
import { Application } from "@/lib/types/questions";
import ApplicationForm from "@/components/forms/applications/applicationForm";
import { Button } from "@/components/primitives/button";
import { XIcon } from "lucide-react";
import { formContext } from "@/components/layouts/formTabView";

export default function SubmissionAsUser() {
  const { rawForm: form, submissions } = useContext(formContext);
  const [app, setApp] = useState<Application | null>(null);
  const [search, setSearch] = useState<string>("");

  async function submitforUser() {
    await submitApplication({
      formId: BigInt(form.id),
      otherUser: submissions.find((s) => s.email === search).user_id,
    });
  }

  return (
    <div className="flex flex-col">
      {!app && (
        <nav className="flex flex-row gap-10 border-b py-2 px-4 border-b-background-500">
          <section className="flex flex-shrink-0 flex-1 gap-2 flex-col">
            <div className="flex gap-2">
              <Input
                disabled={!submissions || submissions.length === 0}
                className="p-2"
                list="emails"
                placeholder={
                  submissions?.length === 0
                    ? "Loading submission"
                    : "Search by email"
                }
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <datalist id="emails" className="p-2">
                {submissions.map((submission) => (
                  <option key={submission.id}>{submission.email}</option>
                ))}
              </datalist>
              <Button
                disabled={!search || search.length < 3}
                onClick={async () => {
                  setApp(
                    submissions.find(
                      (s) => s.email === search,
                    ) as unknown as Application,
                  );
                }}
                className="p-2 flex-shrink-0 min-w-[200px]"
              >
                Open application
              </Button>
            </div>
          </section>
        </nav>
      )}

      {app && form && (
        <div className="flex  gap-4 flex-col">
          <div className="flex p-2 px-4 w-full items-center flex-row gap-2">
            <Button
              variant={"outline"}
              size={"icon"}
              className="bg-background-700 border-none"
              onClick={() => {
                setApp(null);
                setSearch("");
              }}
            >
              <XIcon />
            </Button>
            <h2 className="text-xl  font-heading font-bold">
              {`${app.details.firstName || "User"}'s application`}
            </h2>
            <span className="text-sm bg-background-700 rounded-full w-fit px-4 p-2 flex items-center justify-center font-bold">
              {app.id}
            </span>
            <div className="flex-1" />
            <Button
              disabled={!app || app.status !== "pending"}
              onClick={submitforUser}
            >
              {app && app.status === "pending"
                ? "Submit for user"
                : "User has already submitted"}
            </Button>
          </div>
          <div className="flex border border-background-600 flex-col p-2 px-4 w-full">
            <ApplicationForm
              userOverride={submissions.find((s) => s.email === search).user_id}
              application={app as unknown as Application}
              applicationForm={form as unknown as Form}
            />
          </div>
        </div>
      )}
    </div>
  );
}
