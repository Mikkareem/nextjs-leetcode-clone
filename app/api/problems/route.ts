import { NextRequest, NextResponse } from "next/server";
import {ProblemListItem} from "@/app/types";

export async function GET(request: NextRequest) {
  await new Promise(res => setTimeout(res, 4000))
  const searchParams = request.nextUrl.searchParams

  const currentPage = searchParams.get('page') ? parseInt(searchParams.get('page') as string) : undefined
  const perPage = searchParams.get('perPage') ? parseInt(searchParams.get('perPage') as string) : undefined

  if(!currentPage || !perPage) {
    return NextResponse.json({ error: 'Invalid request' })
  }

  const startIndex = (currentPage-1) * perPage
  const endIndex = startIndex + perPage

  const response = await fetch("http://localhost:8080/problems", { cache: "no-cache" })
  const data = (await response.json()) as {
    problems: ProblemListItem[]
  }

  return NextResponse.json({ 
    problems: data.problems.slice(startIndex, endIndex),
    totalPages: (data.problems.length % perPage === 0) ? Math.floor(data.problems.length / perPage) : Math.floor(data.problems.length / perPage) + 1
  })
}