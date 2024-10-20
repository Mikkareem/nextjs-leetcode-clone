import { NextRequest, NextResponse } from "next/server";
import { exampleProblems } from "./temp";

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

  return NextResponse.json({ 
    problems: exampleProblems.slice(startIndex, endIndex),
    totalPages: (exampleProblems.length % perPage === 0) ? Math.floor(exampleProblems.length / perPage) : Math.floor(exampleProblems.length / perPage) + 1
  })
}