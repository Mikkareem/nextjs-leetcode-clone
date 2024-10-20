import { Suspense } from "react"
import ProblemsTable from "./components/ProblemsTable"

export default ({ 
    searchParams 
} : {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] }
}) => {

  const page = (searchParams['page'] ?? '1') as string
  const perPage = (searchParams['perPage'] ?? '5') as string

  return (
    <div className="bg-leetcode-background text-white">
      <div className="max-w-[80%] mx-auto">
        <Suspense key={`${page}-${perPage}`} fallback={<div>Getting Problems</div>}>
          <ProblemsTable page={page} perPage={perPage}/>
        </Suspense>
        <p>End of the Problems Page</p>
      </div>
    </div>
  )
}