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
          <section className="flex flex-shrink-0 flex-1 gap-2 flex-col min-w-0">
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                disabled={!submissions || submissions.length === 0}
                className="p-2 w-full sm:flex-1 sm:min-w-0"
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
                className="p-2 flex-shrink-0 sm:min-w-[200px] w-full sm:w-auto"
              >
                Open application
              </Button>
            </div>
          </section>
        </nav>
      )}

      {app && form && (
        <div className="flex gap-4 flex-col">
          <div className="flex flex-wrap p-2 px-4 w-full items-center gap-2">
            <Button
              variant={"outline"}
              size={"icon"}
              className="bg-background-700 border-none shrink-0"
              onClick={() => {
                setApp(null);
                setSearch("");
              }}
            >
              <XIcon />
            </Button>
            <h2 className="text-lg sm:text-xl font-heading font-bold min-w-0 flex-1 truncate">
              {`${app.details.firstName || "User"}'s application`}
            </h2>
            <span className="hidden sm:inline-flex text-sm bg-background-700 rounded-full w-fit px-4 p-2 flex items-center justify-center font-bold">
              {app.id}
            </span>
            <Button className="ml-auto sm:ml-0" disabled={!app || app.status !== "pending"} onClick={submitforUser}>
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
