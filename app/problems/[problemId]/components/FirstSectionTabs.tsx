'use client'

import { usePlaygroundContext } from "@/app/contexts/playground"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CodeDescription from "./CodeDescription"
import SubmissionResult from "./SubmissionResult"
import Submissions from "@/app/problems/[problemId]/components/Submissions";
import Solution from "@/app/problems/[problemId]/components/Solution";

// eslint-disable-next-line import/no-anonymous-default-export,react/display-name
export default ({ className }: { className ?: string }) => {
  const { state: { selectedFirstSectionTab, firstSectionTabs }, dispatch } = usePlaygroundContext()

  return <Tabs value={selectedFirstSectionTab.type} onValueChange={(value)=>{ dispatch({ type: 'firstSectionTabChange', payload: value }) }} className={className}>
    <TabsList className="justify-start w-max">
      {firstSectionTabs.map((tab)=>(
        <TabsTrigger key={tab.type} value={tab.type}>{tab.title}</TabsTrigger>
      ))}
    </TabsList>
    {
      firstSectionTabs.map(tab => (
        <TabsContent key={tab.type} value={tab.type} className="flex-grow overflow-auto">
          {
            (()=>{
              switch(tab.type) {
                case 'description':
                  return <CodeDescription />
                case 'submissions':
                  return <Submissions />
                case 'submission':
                  return <SubmissionResult />
                case 'solution':
                  return <Solution />
              }
            })()
          }
        </TabsContent>
      ))
    }
  </Tabs>
}