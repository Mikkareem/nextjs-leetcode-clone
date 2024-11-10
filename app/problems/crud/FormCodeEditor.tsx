'use client'

import React, { useState } from 'react'
import ReactCodeMirror from '@uiw/react-codemirror'
import { StreamLanguage } from '@codemirror/language';
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import { java, c, cpp } from '@codemirror/legacy-modes/mode/clike'
import { javascript } from '@codemirror/legacy-modes/mode/javascript'
import { python } from '@codemirror/legacy-modes/mode/python'
import HiddenInput from '@/components/HiddenInput';

type FormCodeEditorProps = {
    className?: string;
    language: string;
    name: string;
    defaultValue: string | undefined;
}

const FormCodeEditor = ({ className, language, name, defaultValue }: FormCodeEditorProps) => {
    const [code, setCode] = useState(defaultValue ?? '')

    const extensions = language == 'C' ? [StreamLanguage.define(c)] 
                        : language == 'CPP' ? [StreamLanguage.define(cpp)] 
                        : language === 'Java' ? [StreamLanguage.define(java)] 
                        : language === 'Python' ? [StreamLanguage.define(python)] 
                        : language === 'Javascript' ? [StreamLanguage.define(javascript)] : []

  return (
    <div className={className}>
        <ReactCodeMirror
            id={name}
            value={code}
            theme={vscodeDark}
            extensions={extensions}
            onChange={setCode}
            className='h-[100%]'
            height='100%'
        />
        <HiddenInput name={name} value={code}/>
    </div>
  )
}

export default FormCodeEditor