'use client'

import HiddenInput from "@/components/HiddenInput";
import {useState} from "react";
import TipTapEditor from "@/components/tiptap/TipTapEditor";

type FormTextEditorProps = {
    name: string;
    defaultValue: string | undefined;
    placeholder ?: string;
    className ?: string;
}

const FormTextEditor = ({ name, defaultValue, placeholder, className }: FormTextEditorProps) => {
    const [content, setContent] = useState(defaultValue ?? '')

  return (
    <div className={className}>
        <TipTapEditor placeholder={placeholder} content={content} onContentChange={setContent}/>
        <HiddenInput name={name} value={content}/>
        {/*<Markdown rehypePlugins={[rehypeRaw]}>{content}</Markdown>*/}
    </div>
  )
}

export default FormTextEditor