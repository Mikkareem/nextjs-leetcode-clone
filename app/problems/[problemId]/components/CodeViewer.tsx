'use client'

import { usePlaygroundContext } from '@/app/contexts/playground'
import React from 'react'

const CodeViewer = () => {
  const { state: { code } } = usePlaygroundContext()
  return (
    <p>{code}</p>
  )
}

export default CodeViewer