// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Protect dashboard using session-based auth
  if (url.pathname.startsWith("/dashboard")) {
    const session = await auth();
    if (!session || session.user?.role !== "ADMIN") {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  // Protect admin using cookie-based auth
  if (url.pathname.startsWith("/admin") && !url.pathname.startsWith("/admin/login")) {
    const authCookie = req.cookies.get("admin-auth")?.value;
    if (authCookie !== "true") {
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
