import { NextRequest, NextResponse } from "next/server";

let submissionId = 0;

export default async function POST(request: NextRequest) {
  await new Promise(res => setTimeout(res, 3000))
  submissionId++
  return NextResponse.json({ submissionId })
}