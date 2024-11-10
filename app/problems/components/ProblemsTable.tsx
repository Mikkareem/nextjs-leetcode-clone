import {ProblemListItem} from "@/app/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import {Pencil, StickyNote, Trash2} from "lucide-react";

async function getPagedProblems(page: string, perPage: string) {
  const response = await fetch(`http://localhost:3000/api/problems?page=${page}&perPage=${perPage}`, { cache: 'no-cache' })
  return response.json()
}

// eslint-disable-next-line react/display-name,import/no-anonymous-default-export
export default async function ({ page, perPage } : { page: string, perPage: string }) {
  const response = await getPagedProblems(page, perPage)

  const problems = response.problems
  const totalPages = response.totalPages as number

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className='hover:bg-transparent'>
            <TableHead>No.</TableHead>
            <TableHead>Problem Title</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead>Testcases</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {problems.map((problem: ProblemListItem) => (
            <TableRow key={problem.problemNo} className='hover:bg-transparent'>
              <TableCell>{problem.problemNo}</TableCell>
              <TableCell>
                <Link href={`/problems/${problem.problemNo}`} className='hover:text-blue-500'>{problem.problemName}</Link>
              </TableCell>
              <TableCell
                  className={`
                    ${problem.problemDifficulty == 'Easy' ? 'text-green-500' : problem.problemDifficulty == 'Medium' ? 'text-orange-500' : 'text-red-500'} 
                  `}
              >{problem.problemDifficulty}</TableCell>
              <TableCell>
                <Link href={`/problems/crud/${problem.problemNo}/testcases`}>
                  <StickyNote size={20}/>
                </Link>
              </TableCell>
              <TableCell>
                <div className='flex'>
                  <Link href={`/problems/crud?pid=${problem.problemNo}`}>
                    <Pencil size={20}/>
                  </Link>
                  <Trash2 size={20}/>
                </div>
              </TableCell>
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