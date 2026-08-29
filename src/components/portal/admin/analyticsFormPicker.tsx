"use client";

import { useMemo, useState } from "react";
import AnalyticsPage from "@/components/forms/applications/AnalyticsPage";
import { getAllFormDetails, getAdminMembers } from "@/app/portal/admin/actions";
import {
  FormFields,
  populateReferenceMap,
  ReferenceMap,
} from "@/components/forms/applications/columns";
import { FormChart } from "@/components/forms/applications/formDataChart";
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

      {loaded && !loading && <SeasonOverview submissions={loaded.submissions} />}

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

function weekStart(date: Date) {
  const d = new Date(date);
  const day = (d.getDay() + 6) % 7; // Monday = 0
  d.setDate(d.getDate() - day);
  return d;
}

function SeasonOverview({ submissions }: { submissions: any[] }) {
  const { weekly, funnel, facultySplit } = useMemo(() => {
    const weeklyBuckets: Record<string, number> = {};
    const statusCounts: Record<string, number> = {};
    const facultyCounts: Record<string, number> = {};
    submissions.forEach((s) => {
      const created = s.created_at ? new Date(s.created_at) : null;
      if (created && !isNaN(created.getTime())) {
        const key = weekStart(created).toISOString().slice(0, 10);
        weeklyBuckets[key] = (weeklyBuckets[key] || 0) + 1;
      }
      const status = s.status;
      if (status) {
        statusCounts[status] = (statusCounts[status] || 0) + 1;
      }
      const faculty = (s as any).faculty;
      if (Array.isArray(faculty)) {
        faculty.forEach((f) => {
          facultyCounts[f] = (facultyCounts[f] || 0) + 1;
        });
      } else if (faculty) {
        facultyCounts[faculty] = (facultyCounts[faculty] || 0) + 1;
      }
    });

    const weekly = Object.entries(weeklyBuckets)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([week, count]) => ({
        id: week,
        label: new Date(week).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
        }),
        count,
      }));

    const funnelOrder = [
      { id: "__applied__", label: "Applied" },
      { id: "interviewed", label: "Interviewed" },
      { id: "offered", label: "Offered" },
      { id: "accepted", label: "Accepted" },
      { id: "declined", label: "Declined" },
      { id: "rejected", label: "Rejected" },
    ];
    const funnel = funnelOrder.map((stage) => ({
      id: stage.id,
      label: stage.label,
      count:
        stage.id === "__applied__"
          ? submissions.length
          : statusCounts[stage.id] || 0,
    }));

    const facultySplit = Object.entries(facultyCounts)
      .map(([f, count]) => ({ id: f, label: f, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 12);

    return { weekly, funnel, facultySplit };
  }, [submissions]);

  const total = submissions.length;

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-3">Season overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {funnel.slice(0, 4).map((stage) => (
          <div
            key={stage.id}
            className="bg-background-700 border border-background-600 rounded-lg p-3"
          >
            <p className="text-gray-400 text-xs">{stage.label}</p>
            <p className="text-xl font-semibold">{stage.count}</p>
            {stage.id !== "__applied__" && total > 0 && (
              <p className="text-xs text-gray-400">
                {Math.round((stage.count / total) * 100)}% of applied
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormChart
          chartInfo={{
            title: "Applications per week",
            description: "Submissions by week received",
          }}
          chartConfig={{
            applications: { label: "Applications", color: "var(--lp-200)" },
          }}
          chartData={weekly}
        />
        <FormChart
          chartInfo={{
            title: "Faculty split",
            description: "Applicants by faculty",
          }}
          chartConfig={{ faculty: { label: "Applicants", color: "var(--lp-200)" } }}
          chartData={facultySplit}
        />
        <FormChart
          chartInfo={{
            title: "Application funnel",
            description: "How applicants moved through the pipeline",
          }}
          chartConfig={{ stage: { label: "Applicants", color: "var(--lp-200)" } }}
          chartData={funnel}
        />
      </div>
    </div>
  );
}
