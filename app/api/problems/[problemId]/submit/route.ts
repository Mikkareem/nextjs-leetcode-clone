import {NextRequest, NextResponse} from "next/server";
import {CodeRequest} from "@/app/types";

export async function POST(
    request: NextRequest,
    { params }: { params: { problemId: string } }
) {

  const body: CodeRequest = await request.json();

  const response = await fetch(
      `http://localhost:8080/problem/${params.problemId}/submit`,
      {
        cache: "no-cache",
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        }
      }
  )

  const data = await response.json()
  return NextResponse.json(data)
}