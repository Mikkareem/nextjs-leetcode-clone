import { Problem } from "@/app/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"

async function getPagedProblems(page: string, perPage: string) {
  const response = await fetch(`http://localhost:3000/api/problems?page=${page}&perPage=${perPage}`, { cache: 'no-cache' })
  return response.json()
}

export default async function ({ page, perPage } : { page: string, perPage: string }) {
  const response = await getPagedProblems(page, perPage)

  const problems = response.problems
  const totalPages = response.totalPages as number

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Problem Title</TableHead>
            <TableHead>Difficulty</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {problems.map((problem: Problem) => (
            <TableRow key={problem.problemNo}>
              <TableCell>{problem.problemNo}</TableCell>
              <Link href={`/problems/${problem.problemNo}`}>
                <TableCell>{problem.title}</TableCell>
              </Link>
              <TableCell>{problem.difficulty}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
        <div className="flex gap-2">
          {
            [...Array(totalPages)].map((_, i) => i+1).map((_page) => (
                <Link key={_page} href={`/problems?page=${_page}&perPage=${perPage}`} 
                  className={`px-2 cursor-pointer ${_page === +page && 'bg-leetcode-tertiary rounded-md'}`}
                >{_page}</Link>
            ))
          }
        </div>
    </div>
  )
}