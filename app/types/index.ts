import { Dispatch } from "react"

export type TestcaseResult = {
  testcase: Testcase,
  output?: string,
  expectedOutput?: string,
  stdout?: string,
  result: 'Accepted' | 'Wrong Answer' | 'Runtime Error' | 'Compilation Error' | 'Time Limit Exceeded'
}

export type Testcase = {
  testcaseNo: number,
  inputs: {
      name: string,
      value: string
  }[]
}

type Difficulty = 'Easy' | 'Medium' | 'Hard'

export type Problem = {
  problemNo: number,
  title: string,
  description: string,
  difficulty: Difficulty,
  sampleTestcases: Testcase[]
}

type FirstSectionTabType = 'description' | 'submissions' | 'submission' | 'solution'
type SecondSectionTabType = 'editor' | 'notes'
type ThirdSectionTabType = 'testcases' | 'testResults'

type Tab<T> = {
  type: T,
  title: string,
  isCloseable: Boolean
}

export type PlaygroundState = {
  code: string;
  language: string;
  firstSectionTabs: Tab<FirstSectionTabType>[];
  secondSectionTabs: Tab<SecondSectionTabType>[];
  thirdSectionTabs: Tab<ThirdSectionTabType>[];
  selectedFirstSectionTab: Tab<FirstSectionTabType>;
  selectedSecondSectionTab: Tab<SecondSectionTabType>;
  selectedThirdSectionTab: Tab<ThirdSectionTabType>;
  problem: Problem | null;
}

export type PlaygroundActionType = 'changeLanguage' | 'setCode' | 'runCode' | 'submitCode' | 'firstSectionTabChange' | 'secondSectionTabChange' | 'thirdSectionTabChange'

export type PlaygroundAction = {
  type: PlaygroundActionType,
  payload ?: any,
}

export type PlaygroundContextType = {
  state: PlaygroundState,
  dispatch: Dispatch<PlaygroundAction>
}
