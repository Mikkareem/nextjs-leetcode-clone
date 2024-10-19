import { Suspense } from "react";
import CodeButtons from "./CodeButtons";
import CodeEditor from "./CodeEditor";
import LanguageSelector from "./LanguageSelector";

export default () => (
  <div className="h-[100%] flex flex-col gap-2">
    <div className='flex justify-between text-white'>
        <LanguageSelector className='self-start'/>
        <CodeButtons />
    </div>
    {/* <div className="flex-grow"> */}
      <Suspense fallback={<div>Loading....</div>}>
          <CodeEditor />
      </Suspense>
    {/* </div> */}
  </div>
)