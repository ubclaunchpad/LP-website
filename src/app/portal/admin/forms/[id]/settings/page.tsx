"use client";
import { useContext, useState } from "react";
import FormSettingsPage from "./formSettings";
import { formContext } from "@/components/layouts/formTabView";
import { MainResultPage } from "@/components/forms/resultPages/MainResultPage";
import MultiSelect from "@/components/general/multiSelect";
import { Input } from "@/components/primitives/input";
import { Button } from "@/components/primitives/button";
import { Application } from "@/lib/types/questions";

function ResultPagePreviews({ form }) {
  const { submissions } = useContext(formContext);
  const [search, setSearch] = useState("");
  const [app, setApp] = useState<Application | null>(null);

  const statusOptions =
    form?.config?.application?.status?.map((status) => ({
      value: status.id,
      label: (
        <div className="flex items-center gap-2">
          <span className="border text-xs border-background-500 rounded-full px-2 py-0.5 bg-lp-500 min-w-16 text-center">
            {status.id}
          </span>
          <span className="text-sm truncate opacity-75">{status.label}</span>
        </div>
      ),
    })) || [];

  const [selectedStatus, setSelectedStatus] = useState(
    statusOptions[0]?.value || "",
  );

  return (
    <div className="flex flex-col gap-4 w-full items-center px-4">
      <h2 className="text-xl w-full font-semibold sticky top-0">
        User Portal Previews
      </h2>

      <div className="flex flex-col gap-2  w-full max-w-4xl">
        <details className="bg-background-700 border border-background-600 max-w-4xl rounded-lg">
          <summary className="px-4 py-2 cursor-pointer font-medium">
            What are these previews?
          </summary>
          <p className="text-sm p-4">
            These previews show you what the status portal will look like for
            different statuses. Select a status from the dropdown to preview it.
          </p>
        </details>
        <MultiSelect
          options={statusOptions}
          value={[selectedStatus]}
          onChange={(value) => setSelectedStatus(value[0])}
          allowMultiple={false}
          className="w-full"
          emptyText="Select status to preview..."
        />

        <div className="flex flex-col pt-4 gap-2">
          <div className="flex gap-2 items-center">
            <Input
              className="p-2 w-full bg-background-700 rounded-md"
              list="preview-emails"
              placeholder="Search user by email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <datalist id="preview-emails">
              {submissions.map((submission) => (
                <option key={submission.id}>{submission.email}</option>
              ))}
            </datalist>
            <Button
              className="flex-shrink-0 text-sm"
              disabled={!search || search.length < 3}
              onClick={() => {
                if (app) {
                  setApp(null);
                }

                setApp(
                  submissions.find(
                    (s) => s.email === search,
                  ) as unknown as Application,
                );
              }}
            >
              {app ? "Clear" : "Search"}
            </Button>
          </div>

          {selectedStatus && (
            <div className="border rounded-lg bg-background-700 border-background-600 p-4">
              <MainResultPage
                application={app}
                status={selectedStatus}
                form={form}
                formStatus={true}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const { rawForm: form } = useContext(formContext);

  return (
    <div className="flex flex-col dark gap-4 pb-20 flex-1 items-center w-full px-4">
      <FormSettingsPage />
      <ResultPagePreviews form={form} />
    </div>
  );
}
