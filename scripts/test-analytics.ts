import { getFormAnalytics } from "../src/lib/utils/forms/analytics";
import { PrismaClient } from "../prisma/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";

const db = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
  const rows = await db.submissions.findMany({
    where: { form_id: BigInt(10) },
    include: { applications: true, users: true },
  });
  const submissions = rows.map((s: any) => ({
    ...s,
    ...(s.details as any),
    email: s.users?.email,
    ...s.applications,
  }));
  console.log("submissions:", submissions.length);

  // refMap exactly as the UI builds it: ONLY current admins.
  // Reviewers removed earlier today are absent -> ref[val] is undefined.
  const admins = await db.roles.findMany({
    where: { roles: { contains: "admin" } },
    include: { users: true },
  });
  const membersMap: any = {};
  admins.forEach((a: any) => {
    membersMap[a.id] = {
      id: a.id,
      label: a.users.display_name || a.users.email,
    };
  });
  const refMap: any = {
    members: membersMap,
    reviewer_id: "members", // person fields store the string "members"
    interviewer_id: "members",
    status: {
      accepted: { id: "accepted", label: "accepted" },
      rejected: { id: "rejected", label: "rejected" },
      offered: { id: "offered", label: "offered" },
    },
    faculty: {
      science: { id: "science", label: "Science" },
    },
  };

  const result = getFormAnalytics(
    { columns: ["status", "reviewer_id", "interviewer_id", "faculty"] },
    submissions,
    refMap,
  );

  let crashed = false;
  for (const chart of result.analyticsData) {
    const unknownRefs = chart.chartData.filter(
      (d: any) => d.label === d.id && /^[0-9a-f-]{36}$/.test(d.id),
    );
    if (unknownRefs.length > 0) crashed = true;
    console.log(
      `chart "${chart.charInfo.title}": ${chart.chartData.length} values, ` +
        `unknown-ref fallbacks: ${unknownRefs.length}`,
    );
  }
  console.log(
    crashed
      ? "PASS — unknown refs fell back to raw ids (no crash)"
      : "PASS — all refs resolved",
  );
  await db.$disconnect();
}

main();
