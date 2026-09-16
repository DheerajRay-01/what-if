import { NextResponse } from "next/server";

export function ApiResponse (
  status: boolean,
  code: number,
  data: unknown = null,
  msg: string
) {
  return NextResponse.json(
    {
      status,
      code,
      data,
      msg,
    },
    { status: code }
  );
}