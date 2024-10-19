'use client'

import { usePlaygroundContext } from "@/app/contexts/playground"
import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"

const runCode = async (code: string) => {
  const response = await fetch(
    "http://localhost:3000/api/problems",
    { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: code }
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

export default () => {
  const { state: {code}, dispatch } = usePlaygroundContext()

  const { mutate: run, isPending: runPending } = useMutation({ 
    mutationKey: ['run-code'],
    mutationFn: (code: string) => {
      dispatch({ type: 'runCode' })
      return runCode(code)
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
      className="bg-green-700 hover:bg-green-900" 
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