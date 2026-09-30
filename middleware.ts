import { NextRequest, NextResponse } from "next/server";
export { auth as proxy } from "@/auth"

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};