'use client'

import { createContext, useContext, useReducer } from "react";
import { PlaygroundAction, PlaygroundContextType, PlaygroundState, Problem } from "../types";


const PlaygroundContext = createContext<PlaygroundContextType | null>(null);

const playgroundDispatchFn = (state: PlaygroundState, action: PlaygroundAction): PlaygroundState => {

    switch(action.type) {
        case 'changeLanguage': {
            return { ...state, language: action.payload };
        }
        case 'setCode': {
            return { ...state, code: action.payload };
        }
        case 'runCode': {
            const testResultTab = state.thirdSectionTabs.find(tab => tab.type === 'testResults')
            if(testResultTab) {
                return { ...state, selectedThirdSectionTab: testResultTab }
            } else {
                return state
            }
        }
        case 'submitCode': {
            const submissionTab = state.firstSectionTabs.find(tab => tab.type === 'submission')
            if(submissionTab) {
                return { ...state, selectedFirstSectionTab: submissionTab }
            } else {
                return state
            }
        }
        case 'firstSectionTabChange': {
            const selectedTab = state.firstSectionTabs.find((tab) => tab.type === action.payload) || state.firstSectionTabs[0]
            return {...state, selectedFirstSectionTab: selectedTab};
        }
        case 'secondSectionTabChange': {
            const selectedTab = state.secondSectionTabs.find((tab) => tab.type === action.payload) || state.secondSectionTabs[0]
            return {...state, selectedSecondSectionTab: selectedTab};
        }
        case 'thirdSectionTabChange': {
            const selectedTab = state.thirdSectionTabs.find((tab) => tab.type === action.payload) || state.thirdSectionTabs[0]
            return {...state, selectedThirdSectionTab: selectedTab};
        }
    }
}

const initialState: PlaygroundState = {
    code: '',
    language: 'C',
    firstSectionTabs: [
        { type: 'description', isCloseable: false, title: 'Description' },
        { type: 'submissions', isCloseable: false, title: 'Submissions' },
        { type: 'submission', isCloseable: false, title: 'Submission' },
        { type: 'solution', isCloseable: false, title: 'Solution' },
    ],
    secondSectionTabs: [
        { type: 'editor', isCloseable: false, title: 'Code' },
        { type: 'notes', isCloseable: true, title: 'Notes' },
    ],
    thirdSectionTabs: [
        { type: 'testcases', isCloseable: false, title: 'Testcases' },
        { type: 'testResults', isCloseable: false, title: 'Test Results' },
    ],
    selectedFirstSectionTab: { type: 'description', isCloseable: false, title: 'Description' },
    selectedSecondSectionTab: { type: 'editor', isCloseable: false, title: 'Code' },
    selectedThirdSectionTab: { type: 'testcases', isCloseable: false, title: 'Testcases' },
    problem: null
}

type PlaygroundContextProviderProps = {
    problem: Problem,
    children: React.ReactNode
}  

export default function PlaygroundContextProvider(
    { children, problem }: PlaygroundContextProviderProps
) {
    const newState = { ...initialState, problem }
    const [state, dispatch] = useReducer(playgroundDispatchFn, newState)

    return (
        <PlaygroundContext.Provider 
            value={{state, dispatch}}
        >
            {children}
        </PlaygroundContext.Provider>
    )
}

export const usePlaygroundContext = () => {
    const context = useContext(PlaygroundContext)
    if(!context) {
        throw new Error("Playground Context values are not provided")
    }
    return context;
}