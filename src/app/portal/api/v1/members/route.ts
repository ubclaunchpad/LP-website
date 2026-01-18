import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
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
    const teams = r.team_members.map((tm) => {
      return {
        // id: Number(tm.team_id),
        role: tm.role,
        name: tm.teams.name,
        startYear: tm.teams.start_year,
        endYear: tm.teams.end_year,
      };
    });

    return {
      // id: r.id,
      firstName: r.first_name,
      lastName: r.last_name,
      email: r.users.email,
      specialization: r.specialization,
      faculty: r.faculty,
      team: r.team_members[0].teams.name,
      discordId: r.discord_id,
      githubUsername: r.github_username,
    };
  });

  return NextResponse.json(members, { status: 200 });
}
