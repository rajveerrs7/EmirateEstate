import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const url = req.nextUrl;

  if (token && (url.pathname.startsWith("/sign-in") || url.pathname.startsWith("/sign-up") || url.pathname === "/")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/sign-in",
    "/sign-up",
    "/",
  ],
};
