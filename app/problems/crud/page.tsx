import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import FormCodeEditor from "@/app/problems/crud/FormCodeEditor";
import FormTextEditor from "@/app/problems/crud/FormTextEditor";
import FormTestcaseFormat from "@/app/problems/crud/FormTestcaseFormat";
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {handleProblemSubmit} from "@/app/actions";
import {ProblemCrudItem} from "@/app/types";
import {notFound} from "next/navigation";
import Link from "next/link";
import SubmitButton from "@/components/SubmitButton";

const getProblemCrudDetails = async (problemId: string = '')  => {
    const response = problemId == ''
        ? await fetch("http://localhost:8080/problems/crud", { cache: 'no-cache' })
        : await fetch("http://localhost:8080/problems/crud?pid=" + problemId, { cache: 'no-cache' })

    if(!response.ok) {
        notFound()
    }

    return await response.json() as ProblemCrudItem
}

// eslint-disable-next-line import/no-anonymous-default-export,react/display-name
export default async ({
    searchParams
}: {
    params: { slug: string }
    searchParams: { [_: string]: string | string[] }
}) => {

    const problemId = (searchParams['pid'] ?? '') as string

    const isEditMode = problemId.trim() != ''

    let problem: ProblemCrudItem
    if(isEditMode) {
        problem = await getProblemCrudDetails(problemId)
    } else {
        problem = await getProblemCrudDetails()
    }

    return (
        <div className='max-w-5xl m-auto py-4'>
            <form
                action={
                    async (formData) => {
                        "use server"
                        await handleProblemSubmit(formData, isEditMode, isEditMode ? +problemId: undefined)
                    }
                }
                className='flex flex-col gap-12'
            >
                <div className='flex gap-4'>
                    <div className='flex flex-col gap-2'>
                        <Label className='font-bold'>Difficulty</Label>
                        <Select name='difficulty' defaultValue={problem.difficulty}>
                            <SelectTrigger>
                                <SelectValue placeholder='Select Difficulty Level'/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='Easy'>Easy</SelectItem>
                                <SelectItem value='Medium'>Medium</SelectItem>
                                <SelectItem value='Hard'>Hard</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='flex flex-col gap-2 flex-grow'>
                        <Label htmlFor='problemName' className='font-bold'>Problem Name</Label>
                        <Input
                            defaultValue={problem.title}
                            name='problemName'
                            id='problemName'
                        />
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <Label className='font-bold'>Description</Label>
                    <FormTextEditor
                        defaultValue={problem.description}
                        name='description'
                        placeholder='Write here the problem description.....'
                    />
                </div>

                <h3 className='font-bold text-2xl'>Snippets</h3>

                <div className='flex flex-col gap-2'>
                    <Label className='font-bold'>C Snippet</Label>
                    <Label className='text-muted-foreground'>This is the snippet shown to the user, when they try to
                        solve the problem, (if they select the language as &#39;C&#39;)</Label>
                    <FormCodeEditor
                        defaultValue={problem.snippets.c}
                        language='C'
                        name='cSnippet'
                        className='h-[350px]'
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <Label className='font-bold'>C++ Snippet</Label>
                    <Label className='text-muted-foreground'>This is the snippet shown to the user, when they try to
                        solve the problem, (if they select the language as &#39;C++&#39;)</Label>
                    <FormCodeEditor
                        defaultValue={problem.snippets.cpp}
                        language='CPP'
                        name='cppSnippet'
                        className='h-[350px]'
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <Label className='font-bold'>Java Snippet</Label>
                    <Label className='text-muted-foreground'>This is the snippet shown to the user, when they try to
                        solve the problem, (if they select the language as &#39;Java&#39;)</Label>
                    <FormCodeEditor
                        defaultValue={problem.snippets.java}
                        language='Java'
                        name='javaSnippet'
                        className='h-[350px]'
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <Label className='font-bold'>Python Snippet</Label>
                    <Label className='text-muted-foreground'>This is the snippet shown to the user, when they try to
                        solve the problem, (if they select the language as &#39;Python&#39;)</Label>
                    <FormCodeEditor
                        defaultValue={problem.snippets.python}
                        language='Python'
                        name='pythonSnippet'
                        className='h-[350px]'
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <Label className='font-bold'>Javascript Snippet</Label>
                    <Label className='text-muted-foreground'>This is the snippet shown to the user, when they try to
                        solve the problem, (if they select the language as &#39;Javascript&#39;)</Label>
                    <FormCodeEditor
                        defaultValue={problem.snippets.javascript}
                        language='Javascript'
                        name='jsSnippet'
                        className='h-[350px]'
                    />
                </div>

                <h3 className='font-bold text-2xl'>File Contents</h3>

                <div className="flex flex-col gap-4">
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor='cCodeReplacementStr' className='font-bold'>Code Replacement String (C)</Label>
                        <Label className='text-muted-foreground'>Please, make sure the provided string is always
                            available in C code. We will replace this value in C code to the C snippet code at runtime.
                            Also the provided string should be unique in C code.</Label>
                        <Input
                            defaultValue={problem.fileContent.creplaceStr}
                            name='cCodeReplacementStr'
                            id='cCodeReplacementStr'
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label className='font-bold'>C code</Label>
                        <Label className='text-muted-foreground'>This is the code which we try to run the testcases for
                            results, (if they select the language as &#39;C&#39;)</Label>
                        <FormCodeEditor
                            defaultValue={problem.fileContent.c}
                            language='C'
                            name='cCode'
                            className='h-[350px]'
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor='cppCodeReplacementStr' className='font-bold'>Code Replacement String
                            (C++)</Label>
                        <Label className='text-muted-foreground'>Please, make sure the provided string is always
                            available in C++ code. We will replace this value in C++ code to the C++ snippet code at
                            runtime. Also the provided string should be unique in C++ code.</Label>
                        <Input
                            defaultValue={problem.fileContent.cppReplaceStr}
                            name='cppCodeReplacementStr'
                            id='cppCodeReplacementStr'
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label className='font-bold'>C++ code</Label>
                        <Label className='text-muted-foreground'>This is the code which we try to run the testcases for
                            results, (if they select the language as &#39;C++&#39;)</Label>
                        <FormCodeEditor
                            defaultValue={problem.fileContent.cpp}
                            language='CPP'
                            name='cppCode'
                            className='h-[350px]'
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor='javaCodeReplacementStr' className='font-bold'>Code Replacement String
                            (Java)</Label>
                        <Label className='text-muted-foreground'>Please, make sure the provided string is always
                            available in Java code. We will replace this value in Java code to the Java snippet code at
                            runtime. Also the provided string should be unique in Java code.</Label>
                        <Input
                            defaultValue={problem.fileContent.javaReplaceStr}
                            name='javaCodeReplacementStr'
                            id='javaCodeReplacementStr'
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label className='font-bold'>Java code</Label>
                        <Label className='text-muted-foreground'>This is the code which we try to run the testcases for
                            results, (if they select the language as &#39;Java&#39;)</Label>
                        <FormCodeEditor
                            defaultValue={problem.fileContent.java}
                            language='Java'
                            name='javaCode'
                            className='h-[350px]'
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor='pythonCodeReplacementStr' className='font-bold'>Code Replacement String
                            (Python)</Label>
                        <Label className='text-muted-foreground'>Please, make sure the provided string is always
                            available in Python code. We will replace this value in Python code to the Python snippet
                            code at runtime. Also the provided string should be unique in Python code.</Label>
                        <Input
                            defaultValue={problem.fileContent.pythonReplaceStr}
                            name='pythonCodeReplacementStr'
                            id='pythonCodeReplacementStr'
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label className='font-bold'>Python code</Label>
                        <Label className='text-muted-foreground'>This is the code which we try to run the testcases for
                            results, (if they select the language as &#39;Python&#39;)</Label>
                        <FormCodeEditor
                            defaultValue={problem.fileContent.python}
                            language='Python'
                            name='pythonCode'
                            className='h-[350px]'
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor='jsCodeReplacementStr' className='font-bold'>Code Replacement String
                            (Javascript)</Label>
                        <Label className='text-muted-foreground'>Please, make sure the provided string is always
                            available in Javascript code. We will replace this value in Javascript code to the
                            Javascript snippet code at runtime. Also the provided string should be unique in Javascript
                            code.</Label>
                        <Input
                            defaultValue={problem.fileContent.javascriptReplaceStr}
                            name='jsCodeReplacementStr'
                            id='jsCodeReplacementStr'
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label className='font-bold'>Javascript code</Label>
                        <Label className='text-muted-foreground'>This is the code which we try to run the testcases for
                            results, (if they select the language as &#39;Javascript&#39;)</Label>
                        <FormCodeEditor
                            defaultValue={problem.fileContent.javascript}
                            language='Javascript'
                            name='jsCode'
                            className='h-[350px]'
                        />
                    </div>
                </div>
                {
                    isEditMode ? (
                        <Button asChild>
                            <Link href={`/problems/crud/${problemId}/testcases`}>Testcases</Link>
                        </Button>
                    ) : <FormTestcaseFormat />
                }

                <SubmitButton className='self-start'>{
                    isEditMode ? 'Update' : 'Submit'
                }</SubmitButton>
            </form>
        </div>
    )
}