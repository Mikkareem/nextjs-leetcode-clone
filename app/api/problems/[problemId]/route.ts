import { NextRequest, NextResponse } from "next/server"
import { exampleProblems } from "../temp"

export async function GET(request: NextRequest, {params}: { params: { problemId: number } }) {
  await new Promise(res => setTimeout(res, 4000))
  return NextResponse.json({ problem: exampleProblems[params.problemId-1] })
}