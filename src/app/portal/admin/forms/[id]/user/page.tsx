"use client";
import { Input } from "@/components/primitives/input";
import { getForm, getSubmissions } from "../../../actions";
import { submitApplication } from "@/app/portal/forms/actions";
import { Form } from "@/lib/types/application";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Application } from "@/lib/types/questions";
import ApplicationForm from "@/components/forms/applications/applicationForm";
import { Button } from "@/components/primitives/button";

export default function SubmissionAsUser() {
  const [form, setForm] = useState<Form | null>(null);
  const [app, setApp] = useState<Application | null>(null);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const params = useParams<{ id: string }>();
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const form = await getForm(Number(params.id));
    const submissions = await getSubmissions(Number(params.id), false);
    setForm(form);
    setSubmissions(submissions);
  }

  async function submitforUser() {
    await submitApplication({
      formId: BigInt(params.id),
      otherUser: submissions.find((s) => s.email === search).user_id,
    });
  }

  return (
    <div className="flex flex-col">
      <nav className="flex flex-row gap-10 border-b py-2 px-4 border-b-background-500">
        <section className="flex flex-shrink-0 flex-1 gap-2 flex-col">
          <div className="flex gap-2">
            <Input
              className="p-2"
              list="emails"
              placeholder="Search for email"
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
              Find
            </Button>
          </div>
        </section>
      </nav>

      {app && form && (
        <div className="flex pt-4 gap-4 flex-col">
          <div className="flex p-2 px-4 w-full items-center flex-row gap-2">
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
          <div className="flex rounded-lg border border-background-600 flex-col p-2 px-4 w-full">
            <ApplicationForm
              application={app as unknown as Application}
              applicationForm={form as unknown as Form}
            />
          </div>
        </div>
      )}
    </div>
  );
}
