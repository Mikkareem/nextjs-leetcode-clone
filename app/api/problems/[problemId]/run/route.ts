import { TestcaseResult } from "@/app/types";
import { NextRequest, NextResponse } from "next/server";

const testcases: TestcaseResult[] = [
  {
    testcase: {
      testcaseNo: 1,
      inputs: [
        {
          name: 'stocks',
          value: '3'
        },
        {
          name: 'prices',
          value: '[3,4,5,0]'
        },
        {
          name: 'k',
          value: '8'
        }
      ]
    },
    output: '5',
    expectedOutput: '5',
    result: 'Accepted'
  },
  {
    testcase: {
      testcaseNo: 2,
      inputs: [
        {
          name: 'stocks',
          value: '23'
        }
      ]
    },
    output: '15',
    expectedOutput: '15',
    result: 'Accepted'
  },
  {
    testcase: {
      testcaseNo: 3,
      inputs: [
        {
          name: 'stocks',
          value: '13'
        }
      ]
    },
    output: '5',
    expectedOutput: '7',
    result: 'Wrong Answer'
  },
  {
    testcase: {
      testcaseNo: 4,
      inputs: [
        {
          name: 'stocks',
          value: '8'
        }
      ]
    },
    output: '27',
    expectedOutput: '27',
    result: 'Accepted'
  },
]

export async function POST(request: NextRequest) {
  await new Promise(res => setTimeout(res, 3000))
  return NextResponse.json(testcases)
}