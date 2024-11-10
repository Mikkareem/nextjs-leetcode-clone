import { NextRequest, NextResponse } from "next/server"

export async function GET(
    request: NextRequest,
    {params}: { params: { problemId: number } }
) {
  const language = request.nextUrl.searchParams.get("language")

  const response = await fetch(
      `http://localhost:8080/problem/${params.problemId}/snippets?language=${language}`,
      { cache: "no-cache" }
  )

  return NextResponse.json(await response.json())
}