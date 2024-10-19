import { useQuery, useMutationState } from "@tanstack/react-query"

const SuccessSubmission = () => {
  return <div>Success Submission</div>
}

const FailureSubmission = () => {
  return <div>Failure Submission</div>
}

const getSubmission = async (submissionId: number) => {
  const response = await fetch(`http://localhost:3000/api/problems/submissions/${submissionId}`)
  return await response.json()
}

const Submission = ({ id }: { id: number }) => {
  const { data, isFetching } = useQuery({
    queryKey: ['get-submission'],
    queryFn: () => getSubmission(id)
  })

  if(isFetching) {
    return <div>Fetching the results....</div>
  }

  return (
    <>{data.isSuccess ? <SuccessSubmission /> : <FailureSubmission />}</>
  )
}

export default () => {

  const submitMutations = useMutationState({
    filters: { mutationKey: ['submit-code'] }
  })

  if(submitMutations.length < 1) {
    return <div>No submissions yet. Either select a submission or submit the code.</div>
  }

  const isSubmissionPending = submitMutations[submitMutations.length - 1].status === 'pending'
  
  if(isSubmissionPending) {
    return <div>Submitting the code.....</div>
  }

  const submissionId = (submitMutations[submitMutations.length - 1].data as { submissionId: number }).submissionId

  return (
    <Submission id={submissionId} />
  )
}