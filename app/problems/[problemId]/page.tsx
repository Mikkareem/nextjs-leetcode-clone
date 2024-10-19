
import PlaygroundPage from "./PlaygroundPage"

const getPoblemById = async (id: number) => {
  const response = await fetch(`http://localhost:3000/api/problems/${id}`, { cache: 'no-store' })
  return response.json()
}

export default async ({ params }: { params: { problemId: number }}) => {
  const data = await getPoblemById(params.problemId)

  return <PlaygroundPage problem={data.problem}/>
}