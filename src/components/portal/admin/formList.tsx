"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight, SearchIcon } from "lucide-react";
import CloneFormButton from "@/components/portal/admin/cloneFormButton";

export type FormStatus = "live" | "scheduled" | "draft" | "closed";

export type FormListItem = {
  id: number;
  title: string;
  status: FormStatus;
  questionCount: number;
  stepCount: number;
  // Preformatted on the server so server and client render the same text.
  window: string;
  hint: string | null;
};

const STATUS_META: Record<
  FormStatus,
  { label: string; dot: string; text: string }
> = {
  live: { label: "Live", dot: "bg-emerald-400", text: "text-emerald-300" },
  scheduled: {
    label: "Scheduled",
    dot: "bg-amber-400",
    text: "text-amber-300",
  },
  draft: { label: "Draft", dot: "bg-neutral-500", text: "text-neutral-400" },
  closed: { label: "Closed", dot: "bg-neutral-600", text: "text-neutral-500" },
};

const SECTIONS: { title: string; statuses: FormStatus[] }[] = [
  { title: "Open for applications", statuses: ["live", "scheduled"] },
  { title: "Drafts", statuses: ["draft"] },
  { title: "Closed", statuses: ["closed"] },
];

type Filter = "all" | FormStatus;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "live", label: "Live" },
  { value: "scheduled", label: "Scheduled" },
  { value: "draft", label: "Drafts" },
  { value: "closed", label: "Closed" },
];

function plural(n: number, word: string) {
  return `${n} ${word}${n === 1 ? "" : "s"}`;
}

function StatusDot({ status }: { status: FormStatus }) {
  const meta = STATUS_META[status];
  return (
    <span
      className={`inline-flex h-2.5 w-2.5 shrink-0 rounded-full ${meta.dot}`}
      aria-hidden
    />
  );
}

function FormRow({ form }: { form: FormListItem }) {
  const meta = STATUS_META[form.status];
  return (
    <li className="group relative flex items-center gap-4 px-4 py-3.5 transition-colors hover:bg-background-500 focus-within:bg-background-500">
      <StatusDot status={form.status} />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <Link
          href={`/portal/admin/forms/${form.id}`}
          className="truncate font-heading text-base font-medium text-neutral-100 outline-none after:absolute after:inset-0 after:content-[''] focus-visible:after:rounded-md focus-visible:after:ring-2 focus-visible:after:ring-lp-400"
        >
          {form.title}
        </Link>
        <p className="flex flex-wrap items-center gap-x-2 text-sm text-neutral-400">
          <span className={meta.text}>{meta.label}</span>
          <span aria-hidden className="text-neutral-600">
            /
          </span>
          <span>{plural(form.questionCount, "question")}</span>
          {form.stepCount > 1 && (
            <>
              <span aria-hidden className="text-neutral-600">
                /
              </span>
              <span>{plural(form.stepCount, "step")}</span>
            </>
          )}
        </p>
      </div>
      <div className="hidden shrink-0 flex-col items-end gap-0.5 text-sm sm:flex">
        {form.hint && <span className="text-neutral-200">{form.hint}</span>}
        {form.window && <span className="text-neutral-500">{form.window}</span>}
      </div>
      {/* Hidden until hover only where hovering exists: a tablet in landscape is
          wider than md but has no hover, and would never reveal the button. */}
      <div className="relative z-10 shrink-0 opacity-100 transition-opacity [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-focus-within:opacity-100 [@media(hover:hover)]:group-hover:opacity-100">
        <CloneFormButton formId={form.id} formTitle={form.title} />
      </div>
      <ChevronRight
        size={16}
        aria-hidden
        className="hidden shrink-0 text-neutral-600 transition-transform group-hover:translate-x-0.5 group-hover:text-neutral-300 md:block"
      />
    </li>
  );
}

export default function FormList({ forms }: { forms: FormListItem[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const counts = useMemo(() => {
    const c: Record<Filter, number> = {
      all: forms.length,
      live: 0,
      scheduled: 0,
      draft: 0,
      closed: 0,
    };
    for (const f of forms) c[f.status]++;
    return c;
  }, [forms]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return forms.filter(
      (f) =>
        (filter === "all" || f.status === filter) &&
        (!q || f.title.toLowerCase().includes(q)),
    );
  }, [forms, query, filter]);

  if (forms.length === 0) {
    return (
      <div className="flex flex-col items-center gap-1 rounded-lg border border-dashed border-background-500 px-6 py-16 text-center">
        <p className="font-heading text-lg text-neutral-200">No forms yet</p>
        <p className="text-sm text-neutral-400">
          Create a draft with New form, then build and launch it when it is
          ready.
        </p>
      </div>
    );
  }

  const groups =
    filter === "all"
      ? SECTIONS.map((s) => ({
          title: s.title,
          items: visible.filter((f) => s.statuses.includes(f.status)),
        })).filter((g) => g.items.length > 0)
      : [{ title: null, items: visible }];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div
          role="group"
          aria-label="Filter by status"
          className="flex flex-wrap gap-1.5"
        >
          {FILTERS.filter((f) => f.value === "all" || counts[f.value] > 0).map(
            (f) => {
              const active = filter === f.value;
              return (
                <button
                  key={f.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f.value)}
                  className={`rounded-full border px-3 py-1 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lp-400 ${
                    active
                      ? "border-lp-400 bg-lp-400/15 text-white"
                      : "border-background-500 text-neutral-400 hover:border-background-400 hover:text-neutral-200"
                  }`}
                >
                  {f.label}
                  <span className="ml-1.5 text-neutral-500">
                    {counts[f.value]}
                  </span>
                </button>
              );
            },
          )}
        </div>
        <label className="relative block md:w-64">
          <span className="sr-only">Search forms</span>
          <SearchIcon
            size={15}
            aria-hidden
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search forms"
            className="w-full rounded-md border border-background-500 bg-background-800/60 py-1.5 pl-9 pr-3 text-sm text-neutral-100 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lp-400"
          />
        </label>
      </div>

      {visible.length === 0 ? (
        <div className="rounded-lg border border-dashed border-background-500 px-6 py-12 text-center text-sm text-neutral-400">
          No forms match
          {query.trim() ? ` "${query.trim()}"` : " this filter"}.{" "}
          <button
            type="button"
            className="text-lp-300 underline underline-offset-2 hover:text-lp-200"
            onClick={() => {
              setQuery("");
              setFilter("all");
            }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        groups.map((group) => (
          <section
            key={group.title ?? "results"}
            className="flex flex-col gap-2"
          >
            {group.title && (
              <h2 className="px-4 font-heading text-sm font-medium text-neutral-400">
                {group.title}
                <span className="ml-2 text-neutral-600">
                  {group.items.length}
                </span>
              </h2>
            )}
            <ul className="divide-y divide-background-400/40 overflow-hidden rounded-lg border border-background-400/60 bg-background-600 shadow-md shadow-black/20">
              {group.items.map((form) => (
                <FormRow key={form.id} form={form} />
              ))}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}
