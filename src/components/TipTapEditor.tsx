"use client"

import type React from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Loader from "./common/Loader"

interface TiptapEditorProps {
    content: string
    onChange: (value: string) => void
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({ content, onChange }) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: content || "",
        immediatelyRender: false,
        shouldRerenderOnTransaction: false,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML()
            onChange(html)
        },
    })

    if (!editor) {
        return (
         <Loader/>
        )
    }

    return (
        <div className="border-2 border-[#EF8F57] rounded-md overflow-hidden flex flex-col">
            <div className="p-4 min-h-[200px] max-h-[300px] flex-1 overflow-y-auto flex flex-col">
                <EditorContent
                    editor={editor}
                    className="prose prose-sm max-w-none border-none border-0 focus:ring-0 focus:outline-none flex-1 h-full [&_.ProseMirror]:min-h-full [&_.ProseMirror]:h-full [&_.ProseMirror]:flex [&_.ProseMirror]:flex-col [&_.ProseMirror]:outline-none [&_.ProseMirror]:border-none"
                />
            </div>
        </div>
    )
}

export default TiptapEditor
