import { NextRequest, NextResponse } from "next/server";
import { colonyHeaders } from "@/lib/utils/colony/headers";
import { getSessionUser } from "@/lib/utils/auth";

export async function PUT(
  request: NextRequest,
  { params }: { params: { username: string } },
) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { username } = params;

  try {
    const body = await request.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_COLONY_URL}/colony/discord/${username}/roles`,
      {
        method: "PUT",
        headers: colonyHeaders(),
        body: JSON.stringify(body),
      },
    );

    const responseData = await response.json();

    if (!response.ok) {
      // Handle structured error responses from the backend
      return NextResponse.json(
        {
          error: responseData.message || "Failed to update Discord roles",
          error_code: responseData.error_code || "unknown_error",
          validation_errors: responseData.validation_errors || undefined,
        },
        { status: response.status },
      );
    }

    // For successful responses, return the structured success response
    return NextResponse.json({
      message: responseData.message || "Discord roles updated successfully",
      username: responseData.username,
      roles_added: responseData.roles_added,
      guild: responseData.guild,
      success: true,
    });
  } catch (error: any) {
    console.error("Error updating Discord roles:", error);

    // Check if it's a network error or JSON parsing error
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      return NextResponse.json(
        {
          error: "Failed to connect to Discord service",
          error_code: "connection_error",
        },
        { status: 503 },
      );
    }

    return NextResponse.json(
      {
        error: error.message || "Internal server error",
        error_code: "internal_error",
      },
      { status: 500 },
    );
  }
}
