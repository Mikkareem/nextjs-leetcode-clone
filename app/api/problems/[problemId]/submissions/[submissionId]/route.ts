import {NextRequest, NextResponse} from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { problemId: string, submissionId: string } }
) {
    const response = await fetch(`http://localhost:8080/problem/${params.problemId}/submissions/${params.submissionId}`, { cache: 'no-cache' })
    const data = await response.json()
    console.log(data)
    return NextResponse.json(data)
}