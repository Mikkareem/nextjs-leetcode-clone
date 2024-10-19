'use client'

import { type TestcaseResult } from '../../../types'
import { Label } from "@/components/ui/label"
import { useMutationState } from "@tanstack/react-query"
import { useState } from "react"

export default () => {
  const [selectedTestResult, setSelectedTestResult] = useState<number>(0)

  const runCodeMutations = useMutationState({
    filters: { mutationKey: ['run-code'] },
  })

  if(runCodeMutations.length === 0) {
    return <div>No Test Results found, Please run the code to see the results</div>
  }

  const status = runCodeMutations[runCodeMutations.length-1].status
  
  if(status === 'pending') {
    return <div>Loading Testcase Result</div>
  } else if(status === 'error') {
    return <div>Unfortunately, we experienced an technical issue. Please try again later.</div>
  }
  
  const testResults = runCodeMutations[runCodeMutations.length-1].data as TestcaseResult[]

  return (
    <div className="h-full overflow-y-auto">
      <div className="flex gap-6 flex-wrap">
        {testResults.map((testResult, index) => (
          <div 
            key={testResult.testcase.testcaseNo} 
            onClick={() => setSelectedTestResult(index)} 
            className={`bg-slate-900 ${testResult.result === 'Accepted' ? 'text-green-500': 'text-red-500'} px-4 py-2 rounded-xl text-sm cursor-pointer`}
          >
            Case {testResult.testcase.testcaseNo}
          </div>
        ))}
      </div>
      <TestResult testResult={testResults[selectedTestResult]}/>
    </div>
  )
}

const TestResult = ({ testResult }: {testResult: TestcaseResult}) => {
  // const queryClient = useQueryClient()

  // const fetchTestcaseDetails = async (no: number) => {
  //   await new Promise(resolve => setTimeout(() => resolve(no), 1000))
  //   queryClient.removeQueries({ 
  //     predicate: (query: any) => query.queryKey[0] === 'test-result' && query.queryKey[1]?.testcaseNo !== no,
  //   })
  //   return Math.random()
  // }

  // useSuspenseQuery({
  //   queryKey: [ 'test-result', { testcaseNo: testcase.testcaseNo } ],
  //   queryFn: () => fetchTestcaseDetails(testcase.testcaseNo)
  // })

  return (
    <div>
      <div className={`my-2 w-max bg-slate-900 ${testResult.result === 'Accepted' ? 'text-green-500': 'text-red-500'} px-4 py-2 rounded-xl`}>
        <h3 className='text-2xl font-extrabold'>{testResult.result}</h3>
      </div>

      <h4 className="text-xl font-semibold">Inputs</h4>
      {testResult.testcase.inputs.map((input) => (
        <div key={input.name}>
          <Label>{input.name}=</Label>
          <div className="bg-slate-900 text-white rounded-lg px-4 py-2">
            <p>{input.value}</p>
          </div>
        </div>
      ))}

      {
        testResult.stdout && (
          <>
            <h4 className="text-xl font-semibold">Standard Output</h4>
            <div className="bg-slate-900 text-white rounded-lg px-4 py-2">
              <p>{testResult.stdout}</p>
            </div>
          </>
        )
      }

      {
        testResult.output && (
          <>
            <h4 className="text-xl font-semibold">Output</h4>
            <div className="bg-slate-900 text-white rounded-lg px-4 py-2">
              <p>{testResult.output}</p>
            </div>
          </>
        )
      }

      {
        testResult.expectedOutput && (
          <>
            <h4 className="text-xl font-semibold">Expected Output</h4>
            <div className="bg-slate-900 text-white rounded-lg px-4 py-2">
              <p>{testResult.expectedOutput}</p>
            </div>
          </>
        )
      }
    </div>
  )
}