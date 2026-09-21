import { NextRequest, NextResponse } from "next/server";
export { auth as proxy } from "@/auth"

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const visitorId = request.cookies.get("visitorId")?.value;

  if (!visitorId) {
    response.cookies.set("visitorId", crypto.randomUUID(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: "/",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};