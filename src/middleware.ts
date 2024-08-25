// import { NextRequest, NextResponse } from "next/server";
// import { isTokenExpired } from "pocketbase";
//
// export function middleware(request: NextRequest) {
//   // You can also export a `config.matcher` array,
//   // but i believe this way is more straightforward and scalable.
//   const requestHeaders = new Headers(request.headers);
//   requestHeaders.set("x-pathname", request.nextUrl.pathname);
//
//   if (request.nextUrl.pathname.startsWith("/portal")) {
//     try {
//       const authCookie = request.cookies.get("pb_auth");
//       const token = authCookie?.value
//         ? JSON.parse(authCookie.value).token
//         : null;
//       const model = authCookie?.value
//         ? JSON.parse(authCookie.value).model
//         : null;
//
//       // If there's no token or it's expired, redirect to login page.
//       if (!token || isTokenExpired(token)) {
//         console.log(token);
//         console.log("Token is expired");
//         if (request.nextUrl.pathname.startsWith("/auth")) {
//           return NextResponse.next();
//         }
//         const url = request.nextUrl.clone();
//         url.pathname = "/auth";
//         return NextResponse.redirect(url);
//       }
//
//       if (
//         model.role === "default" &&
//         !request.nextUrl.pathname.startsWith("/portal/applications")
//       ) {
//         const url = request.nextUrl.clone();
//         url.pathname = "/portal/applications";
//         return NextResponse.redirect(url);
//       }
//     } catch (error) {
//       return NextResponse.redirect("/portal/auth");
//     }
//
//     return NextResponse.next({
//       request: {
//         headers: requestHeaders,
//       },
//     });
//   }
// }

import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/portal")) {
    return await updateSession(request);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
