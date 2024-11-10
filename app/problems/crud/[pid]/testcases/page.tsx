import React from 'react';
import {Problem, Testcase} from "@/app/types";
import {notFound} from "next/navigation";
import {Button} from "@/components/ui/button";
import {handleTestcaseDelete} from "@/app/actions";
import Link from "next/link";

type Props = {
    params: { pid: number }
    searchParams: { [_: string]: string | string[] }
}

const getProblem = async (pid: number) => {
    const response = await fetch(`http://localhost:8080/problem/${pid}`, { cache: 'no-cache' });

    if(!response.ok) {
        notFound()
    }

    return (await response.json()).problem as Problem
}

const getAllTestcasesForProblem = async (pid: number) => {
    const response = await fetch(`http://localhost:8080/problems/crud/${pid}/testcases`, { cache: 'no-cache' });

    if(!response.ok) {
        notFound()
    }

    return await response.json() as Testcase[]
}

const Page = async ({
    params: { pid }
}: Props) => {
    const testcases: Testcase[] = await getAllTestcasesForProblem(pid)
    const problem = await getProblem(pid)

    return (
        <div className='max-w-5xl mx-auto py-4 px-2'>
            <div className='flex flex-col gap-4'>
                <h2 className='text-2xl font-bold'>{problem.title}</h2>
                <div className='flex w-full justify-between'>
                    <h3 className='text-xl font-bold'>Testcases</h3>
                    <Button asChild>
                        <Link href={`/problems/crud/${pid}/testcases/crud`}>New Testcase</Link>
                    </Button>
                </div>
                {
                    testcases && testcases.length > 0 ? testcases.map((testcase: Testcase) => (
                        <React.Fragment key={testcase.id}>
                            <div className='flex gap-3 shadow-md p-4 rounded-xl'>
                                <div className='flex-grow flex flex-col gap-3'>
                                    {testcase.inputs.map((it, index) => (
                                        <React.Fragment key={index}>
                                            <p><strong>{it.details.name}</strong> = {it.value}</p>
                                        </React.Fragment>
                                    ))}
                                </div>
                                <div className='flex flex-col gap-2 items-center'>
                                    <Button className='bg-leetcode-tertiary' asChild>
                                        <Link href={`/problems/crud/${pid}/testcases/crud?tid=${testcase.id}`}>Edit</Link>
                                    </Button>
                                    <Button
                                        variant='destructive'
                                        formAction={async () => {
                                            "use server"
                                            await handleTestcaseDelete(pid, testcase.id.toString());
                                        }}
                                    >Delete</Button>
                                    {testcase.isHidden && <p>Hidden</p>}
                                </div>
                            </div>
                        </React.Fragment>
                    )) : (
                        <div className='flex-grow w-full items-center justify-center'>
                            <p className='text-2xl'>No testcases found</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Page;