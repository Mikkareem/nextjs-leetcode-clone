import { NextResponse } from "next/server";

let submissionId = 0;

export async function POST() {
  await new Promise(res => setTimeout(res, 3000))
  submissionId++
  return NextResponse.json({ submissionId })
}