import getProjects from "@/app/lib/notion/projects";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await getProjects();
    return NextResponse.json({ status: 200, success: true, data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Failed to refresh projects",
    });
  }
}
