import { Suspense } from "react"
import ProblemsTable from "./components/ProblemsTable"
import {Input} from "@/components/ui/input";
import {Settings} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";

// eslint-disable-next-line import/no-anonymous-default-export,react/display-name
export default ({
    searchParams 
} : {
    params: { slug: string }
    searchParams: { [_: string]: string | string[] }
}) => {

  const page = (searchParams['page'] ?? '1') as string
  const perPage = (searchParams['perPage'] ?? '20') as string

  return (
      <div className="max-w-[80%] mx-auto py-4">
          <div className="flex gap-2 w-full">
              <div className='flex flex-col gap-3 flex-grow'>
                  {/* Filter */}
                  <div className='flex gap-2 items-center'>
                      <div>Difficulty</div>
                      <div className='flex-grow'>
                          <Input
                            placeholder='Search Problem'
                          />
                      </div>
                      <div>
                          <Settings size={20}/>
                      </div>
                      <div>Pick one</div>
                  </div>

                  {/* Problems Table */}
                  <Suspense key={`${page}-${perPage}`} fallback={<div>Getting Problems</div>}>
                      <ProblemsTable page={page} perPage={perPage}/>
                  </Suspense>
                  {/*    Per Page Input */}
                  {/*    Move Page no Component from Problem Table to here */}
              </div>
              <div className='flex flex-col gap-3 w-[25%]'>
                  <div className='w-full h-[400px] border rounded-xl flex justify-center items-center'>
                      <p className='w-[80%] text-center text-green-400 font-bold text-xl'>Daily Challenges will coming soon. Enjoy!</p>
                  </div>
                  <Button asChild>
                      <Link href='/problems/crud'>Create New Problem</Link>
                  </Button>
              </div>
          </div>
      </div>
  )
}