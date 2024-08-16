import { NextRequest, NextResponse } from "next/server";

// Define the POST route handler
export async function POST(req: NextRequest) {
  try {
    const authSession = await req.json();
    const response = NextResponse.json({ message: "Cookie set" });

    // Set the cookie securely
    response.cookies.set("pb_auth", JSON.stringify(authSession), {
      httpOnly: true, // Prevent access from JavaScript
      secure: process.env.NODE_ENV === "production", // Use HTTPS in production
      sameSite: "strict", // Prevent CSRF attacks
      path: "/",
      maxAge: 60 * 60 * 24 * 2, // 2 day expiration
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to set cookie" },
      { status: 500 },
    );
  }
}
