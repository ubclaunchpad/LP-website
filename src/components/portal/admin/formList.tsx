"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowDownWideNarrowIcon,
  ArrowUpNarrowWideIcon,
  ChevronDownIcon,
  ChevronRight,
  SearchIcon,
  TagIcon,
} from "lucide-react";
import CloneFormButton from "@/components/portal/admin/cloneFormButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/primitives/dropdown-menu";
import {
  applyFormListView,
  DEFAULT_VIEW,
  FormListView,
  FormStatus,
  FormType,
  SortDir,
  SortKey,
  StatusFilter,
  TypeFilter,
} from "@/components/portal/admin/formListView";
import { cn } from "@/lib/utils/helpers";

export type FormListItem = {
  id: number;
  title: string;
  status: FormStatus;
  type: FormType | null;
  questionCount: number;
  stepCount: number;
  // Epoch ms, for sorting.
  openAt: number | null;
  closeAt: number | null;
  createdAt: number;
  // Preformatted on the server so server and client render the same text.
  window: string;
  hint: string | null;
  created: string;
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

// Closed sits above drafts: between recruitment rounds nothing is open, and
// the round that just closed is the one being reviewed, while drafts are often
// stale copies.
const SECTIONS: { title: string; statuses: FormStatus[] }[] = [
  { title: "Open for applications", statuses: ["live", "scheduled"] },
  { title: "Closed", statuses: ["closed"] },
  { title: "Drafts", statuses: ["draft"] },
];

const FILTERS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "live", label: "Live" },
  { value: "scheduled", label: "Scheduled" },
  { value: "draft", label: "Drafts" },
  { value: "closed", label: "Closed" },
];

const TYPE_LABEL: Record<FormType, string> = {
  recruitment: "Recruitment",
  survey: "Survey",
  other: "Other",
};

const TYPES: { value: TypeFilter; label: string }[] = [
  { value: "all", label: "All types" },
  { value: "recruitment", label: TYPE_LABEL.recruitment },
  { value: "survey", label: TYPE_LABEL.survey },
  { value: "other", label: TYPE_LABEL.other },
];

const SORTS: {
  value: SortKey;
  label: string;
  asc: string;
  desc: string;
}[] = [
  {
    value: "close",
    label: "Close date",
    asc: "Oldest first",
    desc: "Newest first",
  },
  {
    value: "open",
    label: "Open date",
    asc: "Oldest first",
    desc: "Newest first",
  },
  {
    value: "created",
    label: "Date created",
    asc: "Oldest first",
    desc: "Newest first",
  },
  { value: "title", label: "Title", asc: "A to Z", desc: "Z to A" },
];

const DATE_FIELD: Record<
  Exclude<SortKey, "title">,
  "openAt" | "closeAt" | "createdAt"
> = {
  close: "closeAt",
  open: "openAt",
  created: "createdAt",
};

// Forms without the sorted date go last in either direction, since "no close
// date" is neither newer nor older. Ties fall back to newest created.
function compareForms(
  a: FormListItem,
  b: FormListItem,
  sort: SortKey,
  dir: SortDir,
) {
  const sign = dir === "asc" ? 1 : -1;
  let order = 0;
  if (sort === "title") {
    order =
      sign *
      a.title.localeCompare(b.title, undefined, {
        numeric: true,
        sensitivity: "base",
      });
  } else {
    const av = a[DATE_FIELD[sort]];
    const bv = b[DATE_FIELD[sort]];
    if (av === null || bv === null) {
      order = av === bv ? 0 : av === null ? 1 : -1;
    } else {
      order = sign * (av - bv);
    }
  }
  return order || b.createdAt - a.createdAt || b.id - a.id;
}

const TOOLBAR_BUTTON =
  "inline-flex h-8 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md border px-2.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lp-400";
const TOOLBAR_IDLE =
  "border-background-500 text-neutral-300 hover:border-background-400 hover:text-white";
const TOOLBAR_ACTIVE = "border-lp-400 bg-lp-400/15 text-white";
const MENU_ITEM = "gap-3 text-sm focus:bg-background-500";

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

function FormRow({ form, sort }: { form: FormListItem; sort: SortKey }) {
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
          {form.type && (
            <>
              <span aria-hidden className="text-neutral-600">
                /
              </span>
              <span>{TYPE_LABEL[form.type]}</span>
            </>
          )}
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
        {/* The creation date isn't otherwise shown, so without it a list
            sorted by it would look arbitrary. */}
        {sort === "created" && (
          <span className="text-neutral-500">Created {form.created}</span>
        )}
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

export default function FormList({
  forms,
  initialView,
}: {
  forms: FormListItem[];
  initialView: FormListView;
}) {
  const [query, setQuery] = useState("");
  const [view, setView] = useState(initialView);
  const { status: filter, type, sort, dir } = view;
  const update = (patch: Partial<FormListView>) =>
    setView((v) => ({ ...v, ...patch }));

  // Mirror the view into the URL so it survives opening a form and coming
  // back. Next syncs replaceState with its router without refetching the page.
  useEffect(() => {
    const url = new URL(window.location.href);
    applyFormListView(url, view);
    if (url.href !== window.location.href) {
      window.history.replaceState(null, "", url);
    }
  }, [view]);

  const matchesQuery = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (f: FormListItem) => !q || f.title.toLowerCase().includes(q);
  }, [query]);

  // Each facet counts within the other one, so the numbers always match what
  // picking that option would show.
  const statusCounts = useMemo(() => {
    const c: Record<StatusFilter, number> = {
      all: 0,
      live: 0,
      scheduled: 0,
      draft: 0,
      closed: 0,
    };
    for (const f of forms) {
      if (type !== "all" && f.type !== type) continue;
      c.all++;
      c[f.status]++;
    }
    return c;
  }, [forms, type]);

  const typeCounts = useMemo(() => {
    const c: Record<TypeFilter, number> = {
      all: 0,
      recruitment: 0,
      survey: 0,
      other: 0,
    };
    for (const f of forms) {
      if (filter !== "all" && f.status !== filter) continue;
      c.all++;
      if (f.type) c[f.type]++;
    }
    return c;
  }, [forms, filter]);

  // The type menu only earns its place once there's more than one type.
  const showTypeMenu = new Set(forms.map((f) => f.type)).size > 1;

  const visible = useMemo(
    () =>
      forms
        .filter(
          (f) =>
            (filter === "all" || f.status === filter) &&
            (type === "all" || f.type === type) &&
            matchesQuery(f),
        )
        .sort((a, b) => compareForms(a, b, sort, dir)),
    [forms, filter, type, sort, dir, matchesQuery],
  );

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
          {FILTERS.filter(
            (f) =>
              f.value === "all" ||
              f.value === filter ||
              statusCounts[f.value] > 0,
          ).map((f) => {
            const active = filter === f.value;
            return (
              <button
                key={f.value}
                type="button"
                aria-pressed={active}
                onClick={() => update({ status: f.value })}
                className={`rounded-full border px-3 py-1 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lp-400 ${
                  active
                    ? "border-lp-400 bg-lp-400/15 text-white"
                    : "border-background-500 text-neutral-400 hover:border-background-400 hover:text-neutral-200"
                }`}
              >
                {f.label}
                <span className="ml-1.5 text-neutral-500">
                  {statusCounts[f.value]}
                </span>
              </button>
            );
          })}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {showTypeMenu && (
            <TypeMenu
              value={type}
              counts={typeCounts}
              onChange={(value) => update({ type: value })}
            />
          )}
          <SortMenu sort={sort} dir={dir} onChange={(patch) => update(patch)} />
          <label className="relative block min-w-0 flex-1 md:w-64 md:flex-none">
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
              update({ status: "all", type: "all" });
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
                <FormRow key={form.id} form={form} sort={sort} />
              ))}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}

function TypeMenu({
  value,
  counts,
  onChange,
}: {
  value: TypeFilter;
  counts: Record<TypeFilter, number>;
  onChange: (value: TypeFilter) => void;
}) {
  const active = value !== "all";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(TOOLBAR_BUTTON, active ? TOOLBAR_ACTIVE : TOOLBAR_IDLE)}
        >
          <TagIcon size={14} aria-hidden />
          {active ? TYPE_LABEL[value] : "Type"}
          <ChevronDownIcon size={14} aria-hidden className="opacity-60" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(v) => onChange(v as TypeFilter)}
        >
          {TYPES.map((t) => (
            <DropdownMenuRadioItem
              key={t.value}
              value={t.value}
              className={MENU_ITEM}
            >
              <span className="flex-1">{t.label}</span>
              <span className="tabular-nums text-neutral-500">
                {counts[t.value]}
              </span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SortMenu({
  sort,
  dir,
  onChange,
}: {
  sort: SortKey;
  dir: SortDir;
  onChange: (patch: { sort?: SortKey; dir?: SortDir }) => void;
}) {
  const current = SORTS.find((s) => s.value === sort) ?? SORTS[0];
  const isDefault = sort === DEFAULT_VIEW.sort && dir === DEFAULT_VIEW.dir;
  const DirIcon =
    dir === "asc" ? ArrowUpNarrowWideIcon : ArrowDownWideNarrowIcon;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={`Sort by ${current.label}, ${current[dir]}`}
          className={cn(
            TOOLBAR_BUTTON,
            isDefault ? TOOLBAR_IDLE : TOOLBAR_ACTIVE,
          )}
        >
          <DirIcon size={14} aria-hidden />
          {current.label}
          <ChevronDownIcon size={14} aria-hidden className="opacity-60" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="text-xs font-medium text-neutral-400">
          Sort by
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={sort}
          onValueChange={(v) => {
            const next = v as SortKey;
            // Dates read best newest first, titles A to Z.
            onChange({ sort: next, dir: next === "title" ? "asc" : "desc" });
          }}
        >
          {SORTS.map((s) => (
            <DropdownMenuRadioItem
              key={s.value}
              value={s.value}
              className={MENU_ITEM}
            >
              {s.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator className="bg-background-500" />
        <DropdownMenuLabel className="text-xs font-medium text-neutral-400">
          Order
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={dir}
          onValueChange={(v) => onChange({ dir: v as SortDir })}
        >
          {(["desc", "asc"] as const).map((d) => (
            <DropdownMenuRadioItem key={d} value={d} className={MENU_ITEM}>
              {current[d]}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
