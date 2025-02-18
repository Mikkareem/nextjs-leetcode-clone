import {NextRequest, NextResponse} from "next/server";

export default async function GET(
    request: NextRequest,
    { params }: { params: { problemId: string } }
) {
    const response = await fetch(
        `http://localhost:8080/problem/${params.problemId}/submissions`,
        { cache: "no-cache" }
    )
    const data = await response.json()
    return NextResponse.json(data)
}