'use client'

import PlaygroundContextProvider from "@/app/contexts/playground"
import dynamic from 'next/dynamic'

import { type Problem } from '../../types'

const PanelModel = dynamic(() => import('./components/PanelModel'), { ssr: false })

const HeaderSection = () => {
  return (
    <div className="min-h-12 flex justify-center items-center">
      <p>Hi user, More features will be added in future here. Stay Tuned</p>
    </div>
  )
}

const PlaygroundPage = ({ problem }: { problem: Problem }) => {
  return (
    <PlaygroundContextProvider problem={problem}>
      <div className='flex flex-col h-full'>
        <HeaderSection />
        <div className='flex-grow min-h-0'>
          <PanelModel />
        </div>
      </div>
    </PlaygroundContextProvider>
  )
}

export default PlaygroundPage