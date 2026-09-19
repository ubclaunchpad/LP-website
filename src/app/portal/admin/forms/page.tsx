import NewFormDialog from "@/components/portal/admin/newFormDialog";
import FormList, {
  FormListItem,
  FormStatus,
} from "@/components/portal/admin/formList";
import { getForms } from "@/app/portal/admin/actions";
import { Form } from "@/lib/types/application";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const DAY_MS = 24 * 60 * 60 * 1000;

const formatDate = (d: Date) =>
  d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

function relativeDays(target: Date, now: Date) {
  const days = Math.ceil((target.getTime() - now.getTime()) / DAY_MS);
  if (days <= 0) return "today";
  if (days === 1) return "tomorrow";
  return `in ${days} days`;
}

function toListItem(form: Form, now: Date): FormListItem {
  const open = form.open_at ? new Date(form.open_at) : null;
  const close = form.close_at ? new Date(form.close_at) : null;
  const isDraft =
    (form.config as { application?: { draft?: boolean } })?.application
      ?.draft === true;

  let status: FormStatus = "live";
  let hint: string | null = null;
  if (isDraft) {
    status = "draft";
  } else if (open && open > now) {
    status = "scheduled";
    hint = `Opens ${relativeDays(open, now)}`;
  } else if (close && close < now) {
    status = "closed";
    hint = `Closed ${formatDate(close)}`;
  } else if (close) {
    hint = `Closes ${relativeDays(close, now)}`;
  }

  const steps = Array.isArray(form.questions) ? form.questions : [];
  const questionCount = steps.reduce(
    (n, step) =>
      n +
      (step.questions ?? []).filter((q) => q.type !== "info").length,
    0,
  );

  const window =
    open && close
      ? `${formatDate(open)} - ${formatDate(close)}`
      : open
        ? `From ${formatDate(open)}`
        : close && status !== "closed"
          ? `Until ${formatDate(close)}`
          : "";

  return {
    id: Number(form.id),
    title: form.title,
    status,
    questionCount,
    stepCount: steps.length,
    window,
    hint,
  };
}

export default async function Page() {
  const forms = (await getForms()) as unknown as Form[];
  const now = new Date();
  const items = forms
    .map((f) => toListItem(f, now))
    // Newest first within each status group.
    .sort((a, b) => b.id - a.id);

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-8 md:px-8">
      <header className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="/portal/admin"
            aria-label="Back to admin"
            className="shrink-0 rounded-full border border-transparent p-1.5 text-neutral-400 transition-colors hover:border-lp-500 hover:text-lp-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lp-400"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="font-heading text-3xl font-bold text-white">Forms</h1>
        </div>
        <NewFormDialog />
      </header>
      <FormList forms={items} />
    </div>
  );
}
