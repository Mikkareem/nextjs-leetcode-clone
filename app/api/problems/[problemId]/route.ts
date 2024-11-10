import {NextRequest, NextResponse} from "next/server"

export async function GET(
    request: NextRequest,
    {params}: { params: { problemId: number } }
) {
  const response = await fetch(`http://localhost:8080/problem/${params.problemId}`, { cache: "no-cache" })
  const problem = await response.json()
  return NextResponse.json({ problem: problem.problem })
}