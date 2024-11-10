import React from 'react';
import {Testcase, TestcaseInputFormat} from "@/app/types";
import {notFound} from "next/navigation";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {handleTestcaseDelete, handleTestcaseSubmit} from "@/app/actions";
import {Button} from "@/components/ui/button";
import {Switch} from "@/components/ui/switch";

type Props = {
    params: { pid: number }
    searchParams: { [_: string]: string | string[] }
}

const getTestcaseFormatForProblem = async (pid: number) => {
    const response = await fetch(`http://localhost:8080/problems/crud/${pid}/testcases/formats`, {cache: 'no-cache'});

    if(!response.ok) {
        notFound()
    }

    return await response.json() as TestcaseInputFormat[]
}

const getTestcaseForProblem = async (pid: number, tid: string) => {
    const response = await fetch(`http://localhost:8080/problems/crud/${pid}/testcases/${tid}`, { cache: 'no-cache' });

    if(!response.ok) {
        notFound()
    }

    return await response.json() as Testcase
}

const Page = async ({
    params: { pid },
    searchParams
}: Props) => {

    const formats = await getTestcaseFormatForProblem(pid)

    const testcaseId = (searchParams['tid'] ?? 'null') as string

    const isEditMode = testcaseId != 'null'

    let testcase: Testcase | null = null
    if(isEditMode) {
        testcase = await getTestcaseForProblem(pid, testcaseId)
        if(testcase == null) {
            notFound()
        }
    }

    const submitAction = async (formData: FormData) => {
        "use server"
        await handleTestcaseSubmit(formData, isEditMode, pid, isEditMode ? +testcaseId : undefined, formats)
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const deleteAction = async (_: FormData) => {
        "use server"
        await handleTestcaseDelete(pid, testcaseId)
    }

    return (
        <div className='max-w-5xl mx-auto h-[100vh]'>
            <div className='flex flex-col gap-4 justify-center items-center h-full border'>
                <h2 className='font-bold text-2xl'>{isEditMode ? 'Edit' : 'Create New'} Testcase</h2>
                <form
                    action={submitAction}
                    className='flex flex-col gap-3 w-[50%] border border-leetcode p-3 rounded-xl'
                >
                    {
                        formats.map((it, index) => (
                            <React.Fragment key={it.name}>
                                <div className='flex flex-col gap-2 flex-grow'>
                                    <Label htmlFor={`input${index + 1}`} className='font-bold'>{it.name + " = "}</Label>
                                    <Input
                                        defaultValue={
                                            (() => {
                                                if(testcase?.inputs.find(itt => itt.details.name == it.name)?.value == undefined) {
                                                    return ''
                                                } else {
                                                    return testcase?.inputs.find(itt => itt.details.name == it.name)?.value
                                                }
                                            })()
                                        }
                                        name={`input${index + 1}`}
                                        id={`input${index + 1}`}
                                    />
                                </div>
                            </React.Fragment>
                        ))
                    }

                    <div className='flex gap-2 items-center'>
                        <Label htmlFor='isHidden'>Is Testcase Hidden?</Label>
                        <Switch name='isHidden' id='isHidden' defaultChecked={testcase?.isHidden || false}/>
                    </div>
                    <div className='flex gap-4'>
                        <Button type='submit'>{isEditMode ? 'Edit' : 'Create'}</Button>
                        {isEditMode && <Button type='submit' formAction={deleteAction} variant="destructive">Delete</Button>}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Page;