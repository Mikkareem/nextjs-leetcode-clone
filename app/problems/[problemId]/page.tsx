
import PlaygroundPage from "./PlaygroundPage"

const getProblemById = async (id: number) => {
  const response = await fetch(`http://localhost:3000/api/problems/${id}`, { cache: 'no-cache' })
  return await response.json()
}

// eslint-disable-next-line react/display-name,import/no-anonymous-default-export
export default async ({ params }: { params: { problemId: number }}) => {
  const data = await getProblemById(params.problemId)

  return <PlaygroundPage problem={data.problem}/>
}