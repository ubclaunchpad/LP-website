"use client";

import { useState } from "react";
import AnalyticsPage from "@/components/forms/applications/AnalyticsPage";
import { getAllFormDetails, getAdminMembers } from "@/app/portal/admin/actions";
import {
  FormFields,
  populateReferenceMap,
  ReferenceMap,
} from "@/components/forms/applications/columns";
import { LoaderCircleIcon, BarChart3 } from "lucide-react";

type FormOption = {
  id: number;
  title: string;
  type: string | null;
  open_at: string | null;
  close_at: string | null;
};

const analyticsColumns = [
  "status",
  "team_id",
  "level",
  "role",
  "reviewer_id",
  "interviewer_id",
  "year",
  "faculty",
  "specialization",
  "graduationYear",
  "lp-team",
];

type LoadedForm = {
  formFields: FormFields;
  submissions: any[];
  refMap: ReferenceMap;
};

export default function AnalyticsFormPicker({
  forms,
}: {
  forms: FormOption[];
}) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState<LoadedForm | null>(null);

  function loadForm(formId: number) {
    setSelectedId(formId);
    setError(null);
    setLoading(true);
    setLoaded(null);
    Promise.all([getAllFormDetails(BigInt(formId)), getAdminMembers()])
      .then(([details, members]) => {
        const membersWithLabel = (members as any[]).map((member) => ({
          ...member,
          label: member.display_name || member.email,
        }));
        const refMap = populateReferenceMap(details.formFields, [
          { id: "members", options: membersWithLabel, label: "members" },
        ]);
        setLoaded({
          formFields: details.formFields,
          submissions: details.submissions,
          refMap,
        });
      })
      .catch(() => setError("Failed to load form data"))
      .finally(() => setLoading(false));
  }

  return (
    <div>
      <div className="flex gap-2 items-center mb-6 flex-wrap">
        <select
          className="bg-background-700 border border-background-500 rounded-lg p-3 text-white min-w-72"
          value={selectedId ?? ""}
          onChange={(e) => e.target.value && loadForm(Number(e.target.value))}
        >
          <option value="">Select a form…</option>
          {forms.map((form) => (
            <option key={form.id} value={form.id}>
              {form.title}
              {form.type === "recruitment" ? "" : " (survey)"}
            </option>
          ))}
        </select>
        {loading && (
          <LoaderCircleIcon className="w-5 h-5 animate-spin text-lp-400" />
        )}
      </div>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      {!selectedId && !loading && (
        <div className="border border-background-600 bg-background-700 rounded-lg p-10 flex flex-col items-center gap-3 text-gray-400">
          <BarChart3 className="w-10 h-10 opacity-60" />
          <p>Select a form above to see its analytics.</p>
        </div>
      )}

      {loading && selectedId && (
        <div className="flex justify-center p-16">
          <LoaderCircleIcon className="w-8 h-8 animate-spin text-lp-400" />
        </div>
      )}

      {loaded && !loading && (
        <AnalyticsPage
          submissions={loaded.submissions}
          refMap={loaded.refMap}
          columns={analyticsColumns}
        />
      )}
    </div>
  );
}
