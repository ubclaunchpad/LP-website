const DAY_MS = 24 * 60 * 60 * 1000;

// Rendered in UTC so a server-rendered date matches the client render.
export const formatDate = (d: Date) =>
  d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

const startOfUTCDay = (d: Date) =>
  Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());

// Calendar days apart, not elapsed time: something closing in two hours is
// "today", not "tomorrow". UTC to match formatDate, so the relative label and
// the absolute date on the same row can never disagree.
export function relativeDays(target: Date, now: Date) {
  const days = (startOfUTCDay(target) - startOfUTCDay(now)) / DAY_MS;
  if (days <= 0) return "today";
  if (days === 1) return "tomorrow";
  return `in ${days} days`;
}
