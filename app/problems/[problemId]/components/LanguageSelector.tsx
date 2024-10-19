'use client'

import { usePlaygroundContext } from '@/app/contexts/playground'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type LanguageSelectorProps = { className ?: string; }

const LanguageSelector = ({ className }: LanguageSelectorProps) => {
  const { state: { language }, dispatch } = usePlaygroundContext()

  return (
    <div className={className}>
      <Select value={language} onValueChange={value => dispatch({ type: 'changeLanguage', payload: value })}>
        <SelectTrigger className='outline-none border-none'>
            <SelectValue placeholder='Select Language' />
        </SelectTrigger>
        <SelectContent className='bg-leetcode-secondary text-white'>
            <SelectItem value='C'>C</SelectItem>
            <SelectItem value='Cpp'>Cpp</SelectItem>
            <SelectItem value='Java'>Java</SelectItem>
            <SelectItem value='Python'>Python</SelectItem>
            <SelectItem value='Javascript'>Javascript</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default LanguageSelector