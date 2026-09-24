// Shared by the server page (to read the view from the URL) and the client
// list, so it can't live in the "use client" module: a server component can't
// call functions exported from one.

export type FormStatus = "live" | "scheduled" | "draft" | "closed";
export type FormType = "recruitment" | "survey" | "other";

export type StatusFilter = "all" | FormStatus;
export type TypeFilter = "all" | FormType;
export type SortKey = "close" | "open" | "created" | "title";
export type SortDir = "asc" | "desc";

export type FormListView = {
  status: StatusFilter;
  type: TypeFilter;
  sort: SortKey;
  dir: SortDir;
};

// Most recently closed first, which puts the latest recruitment round (the
// one still being reviewed) at the top of the closed section.
export const DEFAULT_VIEW: FormListView = {
  status: "all",
  type: "all",
  sort: "close",
  dir: "desc",
};

const ALLOWED: { [K in keyof FormListView]: readonly FormListView[K][] } = {
  status: ["all", "live", "scheduled", "draft", "closed"],
  type: ["all", "recruitment", "survey", "other"],
  sort: ["close", "open", "created", "title"],
  dir: ["asc", "desc"],
};

function pick<K extends keyof FormListView>(
  key: K,
  raw: string | string[] | undefined,
): FormListView[K] {
  const value = Array.isArray(raw) ? raw[0] : raw;
  return (ALLOWED[key] as readonly string[]).includes(value ?? "")
    ? (value as FormListView[K])
    : DEFAULT_VIEW[key];
}

export function parseFormListView(
  params: Record<string, string | string[] | undefined>,
): FormListView {
  return {
    status: pick("status", params.status),
    type: pick("type", params.type),
    sort: pick("sort", params.sort),
    dir: pick("dir", params.dir),
  };
}

// Only non-default values go in the URL, so the plain page URL stays clean.
export function applyFormListView(url: URL, view: FormListView) {
  for (const key of Object.keys(DEFAULT_VIEW) as (keyof FormListView)[]) {
    if (view[key] === DEFAULT_VIEW[key]) url.searchParams.delete(key);
    else url.searchParams.set(key, view[key]);
  }
}
