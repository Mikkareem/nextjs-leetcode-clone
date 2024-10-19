import Link from "next/link"
import { Problem } from "../types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const getProblems = async () => {
  const response = await fetch('http://localhost:3000/api/problems', { cache: 'no-cache' })
  return response.json()
}

export default async () => {
  const data = await getProblems()
  
  return (
    <div className="bg-leetcode-background text-white">
      <div className="max-w-[80%] mx-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Problem Title</TableHead>
              <TableHead>Difficulty</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.problems.map((problem: Problem) => (
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
      </div>
    </div>
  )
}