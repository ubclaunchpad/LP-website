import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { getSessionUser, isAdmin } from "@/lib/utils/auth";

export async function GET(request: NextRequest) {
  const user = await getSessionUser();
  if (!user || !(await isAdmin(user.id))) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const search = request.nextUrl.searchParams;
  const searchParams = new URLSearchParams(search);
  const paramObj: any = {};
  for (const value of searchParams.keys()) {
    paramObj[value] = searchParams.get(value);
  }
  const res = await db.members.findMany({
    include: {
      team_members: {
        include: {
          teams: true,
        },
      },
      users: true,
    },
  });
  const members = res.map((r) => {
    return {
      firstName: r.first_name,
      lastName: r.last_name,
      email: r.users.email,
      specialization: r.specialization,
      faculty: r.faculty,
      team: r.team_members[0] ? r.team_members[0].teams.name : "N/A",
      discordId: r.discord_id,
      githubUsername: r.github_username,
    };
  });

  return NextResponse.json(members, { status: 200 });
}
