import { NextResponse } from "next/server";
import { exampleProblems } from "./temp";

export async function GET() {
  await new Promise(res => setTimeout(res, 4000))
  return NextResponse.json({ problems: exampleProblems })
}