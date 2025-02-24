"use server"

import {Difficulty, ProblemCrudItem, TestcaseCollectionType, TestcaseInputFormat, TestcaseType} from "@/app/types";
import {redirect} from "next/navigation";

export const handleProblemSubmit = async (formData: FormData, isEditMode: boolean, pid: number|undefined) => {
    const count = parseInt(formData.get('inputCount') as string)
    const testcaseFormats = []
    for(let i = 1; i <= count; i++) {
        const name = formData.get(`testcaseInputName${i}`) as string
        const type = formData.get(`type${i}`) as TestcaseType
        const collectionType = formData.get(`collection${i}`) as TestcaseCollectionType
        const displayOrder = parseInt(formData.get(`order${i}`) as string)

        testcaseFormats.push(
            { name, type, collectionType, displayOrder }
        )
    }

    const problem: ProblemCrudItem = {
        id: (pid || 0) as number,
        title: formData.get('problemName') as string,
        description: formData.get('description') as string,
        difficulty: formData.get('difficulty') as Difficulty,
        snippets: {
            c: formData.get('cSnippet') as string,
            cpp: formData.get('cppSnippet') as string,
            java: formData.get('javaSnippet') as string,
            python: formData.get('pythonSnippet') as string,
            javascript: formData.get('jsSnippet') as string
        },
        fileContent: {
            creplaceStr: formData.get('cCodeReplacementStr') as string,
            cppReplaceStr: formData.get('cppCodeReplacementStr') as string,
            javaReplaceStr: formData.get('javaCodeReplacementStr') as string,
            pythonReplaceStr: formData.get('pythonCodeReplacementStr') as string,
            javascriptReplaceStr: formData.get('jsCodeReplacementStr') as string,

            c: formData.get('cCode') as string,
            cpp: formData.get('cppCode') as string,
            java: formData.get('javaCode') as string,
            python: formData.get('pythonCode') as string,
            javascript: formData.get('jsCode') as string
        },
        testcaseFormats
    }

    await fetch(
        'http://localhost:8080/problems/crud',
        {
            method: isEditMode ? 'PUT' : 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(problem),
        }
    )
}

export const handleTestcaseSubmit = async (formData: FormData, isEditMode: boolean, pid: number, tid: number|undefined, formats: TestcaseInputFormat[]) => {
    const p: {
        value: string,
        details: TestcaseInputFormat,
    }[] = []

    for(let i = 1; i <= formats.length; i++) {
        const input = formData.get(`input${i}`) as string
        p.push({
            value: input,
            details: formats[i-1]
        })
    }

    const body = {
        id: (tid || 0) as number,
        inputs: p,
        isHidden: formData.get('isHidden') == 'on',
    }

    await fetch(
        `http://localhost:8080/problems/crud/${pid}/testcases`,
        {
            method: isEditMode ? 'PUT' : 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }
    )
}

export const handleProblemDelete = async (pid: number) => {
    await fetch(
        `http://localhost:8080/problems/crud/${pid}`,
        {
            method: 'DELETE',
            cache: 'no-cache'
        }
    )
}

export const handleTestcaseDelete = async (pid: number, tid: string) => {
    await fetch(
        `http://localhost:8080/problems/crud/${pid}/testcases/${tid}`,
        {
            method: 'DELETE',
            cache: 'no-cache'
        }
    )
}

export const handleLogin = async (formData: FormData) => {
    const loginRequestBody = {
        username: formData.get('username') as string,
        password: formData.get('password') as string
    }

    const response = await fetch(
        `http://localhost:8080/auth/login`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginRequestBody),
            cache: 'no-cache'
        }
    )

    const data = await response.json()

    if(data.status === "SUCCESS") {
        redirect("/dashboard")
    } else {

    }
}