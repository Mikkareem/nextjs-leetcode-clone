'use client'

import PlaygroundContextProvider from "@/app/contexts/playground"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import dynamic from 'next/dynamic'

import { type Problem } from '../../types'

const PanelModel = dynamic(() => import('./components/PanelModel'), { ssr: false })

const HeaderSection = () => {
  return (
    <div className="h-12 min-h-12 bg-leetcode-secondary">
      Header
    </div>
  )
}

const PlaygroundPage = ({ problem }: { problem: Problem }) => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <PlaygroundContextProvider problem={problem}>
        <div className='flex flex-col md:h-[100vh]'>
          <HeaderSection />
          <div className='flex-grow min-h-0 bg-leetcode-background'>
            <PanelModel />
          </div>
        </div>
      </PlaygroundContextProvider>
    </QueryClientProvider>
  )
}

export default PlaygroundPage