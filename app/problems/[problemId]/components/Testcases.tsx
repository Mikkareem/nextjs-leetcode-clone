'use client'

import { usePlaygroundContext } from "@/app/contexts/playground"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { type Testcase } from '../../../types'

export default () => {
  const [selectedTestcase, setSelectedTestcase] = useState(0)
  const { state: { problem } } = usePlaygroundContext();

  if(!problem) {
    return
  }

  const testcases = problem.sampleTestcases


  return (
    <div className="h-full overflow-y-auto">
      <div className="flex gap-6 flex-wrap">
        {testcases.map((testcase, index) => (
          <div 
            key={testcase.testcaseNo} 
            onClick={() => setSelectedTestcase(index)} 
            className={`bg-leetcode-variance text-white px-4 py-2 rounded-xl text-sm cursor-pointer`}
          >
            Case {testcase.testcaseNo}
          </div>
        ))}
      </div>
      <Testcase testcase={testcases[selectedTestcase]}/>
    </div>
  )
}

const Testcase = ({ testcase }: { testcase: Testcase }) => {
  return (
    <div>
      <h4 className="text-xl font-semibold">Inputs</h4>
      {testcase.inputs.map((input) => (
        <div key={input.name}>
          <Label>{input.name}=</Label>
          <div className="bg-slate-900 text-white rounded-lg px-4 py-2">
            <p>{input.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}