'use client'

import { usePlaygroundContext } from "@/app/contexts/playground"
import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import {CodeRequest, Testcase} from "@/app/types";
import {notFound} from "next/navigation";

const runCode = async (code: string, language: string, problemId: string, testcases: Testcase[]) => {
  const body: CodeRequest = {
    problemId,
    language,
    sampleTestcases: testcases,
    userCode: code
  }
  const response = await fetch(
    `http://localhost:3000/api/problems/${problemId}/run`,
    {
      cache: 'no-cache',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }
  )
  return await response.json()
}

const submitCode = async (code: string) => {
  const response = await fetch(
    "http://localhost:3000/api/problems",
    { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: code }
  )
  return await response.json()
}

// eslint-disable-next-line react/display-name,import/no-anonymous-default-export
export default () => {
  const { state: { code, language, problem }, dispatch } = usePlaygroundContext()

  if(!problem) notFound()

  const { mutate: run, isPending: runPending } = useMutation({ 
    mutationKey: ['run-code'],
    mutationFn: (code: string) => {
      dispatch({ type: 'runCode' })
      return runCode(code, language, problem.problemNo+"", problem.sampleTestcases)
    }
  })

  const { mutate: submit, isPending: submitPending } = useMutation({ 
    mutationKey: ['submit-code'],
    mutationFn: (code: string) => {
      dispatch({ type: 'submitCode' })
      return submitCode(code)
    }
  })

  return <div className="flex gap-3">
    <Button 
      className="bg-green-700 hover:bg-green-900 text-white"
      onClick={() => run(code)}
    >
      {runPending ? 'Running' : 'Run'}
    </Button>
    <Button 
      onClick={() => submit(code)}
    >
      {submitPending ? 'Submitting' : 'Submit'}
    </Button>
  </div>
}