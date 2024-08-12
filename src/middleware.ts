import { NextRequest, NextResponse } from "next/server";
import { isTokenExpired } from "pocketbase";

export function middleware(request: NextRequest) {
  // You can also export a `config.matcher` array,
  // but i believe this way is more straightforward and scalable.
  if (request.nextUrl.pathname.startsWith("/portal")) {
    try {
      const authCookie = request.cookies.get("pb_auth");
      const token = authCookie?.value
        ? JSON.parse(authCookie.value).token
        : null;
      const model = authCookie?.value
        ? JSON.parse(authCookie.value).model
        : null;

      // If there's no token or it's expired, redirect to login page.
      if (!token || isTokenExpired(token)) {
        console.log(token);
        console.log("Token is expired");
        if (request.nextUrl.pathname.startsWith("/portal/auth")) {
          return NextResponse.next();
        }
        const url = request.nextUrl.clone();
        url.pathname = "/portal/auth";
        return NextResponse.redirect(url);
      }

      if (
        model.role === "default" &&
        !request.nextUrl.pathname.startsWith("/portal/applications")
      ) {
        const url = request.nextUrl.clone();
        url.pathname = "/portal/applications";
        return NextResponse.redirect(url);
      }
    } catch (error) {
      return NextResponse.redirect("/portal/auth");
    }

    return NextResponse.next();
  }
}
