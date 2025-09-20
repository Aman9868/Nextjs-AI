import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("authToken")?.value;

  if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
