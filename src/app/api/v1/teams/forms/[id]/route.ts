import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const members = await db.submissions.findMany({
    where: {
      form_id: Number(params.id),
    },
    include: {
      applications: true,
      users: true,
    },
  });

  const res = members
    .filter(
      (member) =>
        member.applications && member.applications.status === "accepted",
    )
    .map((member) => {
      if (!member.applications) {
        return null;
      }
      return {
        email: member.users.email,
        team: {
          id: Number(member.applications.team_id),
        },
      };
    });

  return NextResponse.json(res);
}
