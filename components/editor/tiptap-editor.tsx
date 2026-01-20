'use client'

import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Link } from '@tiptap/extension-link'
import { Image } from '@tiptap/extension-image'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import { TaskList } from '@tiptap/extension-task-list'
import { TaskItem } from '@tiptap/extension-task-item'
import { Placeholder } from '@tiptap/extension-placeholder'
import { CharacterCount } from '@tiptap/extension-character-count'
import { Color } from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight } from 'lowlight'
import { useState } from 'react'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import { MenuBar } from './menu-bar'

const lowlight = createLowlight(common)

interface TipTapEditorProps {
  content?: any
  onChange?: (content: any) => void
  placeholder?: string
  editable?: boolean
}

export function TipTapEditor({
  content,
  onChange,
  placeholder = '开始编写内容...',
  editable = true,
}: TipTapEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        codeBlock: false, // 使用 CodeBlockLowlight 替代
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 hover:text-blue-600 underline',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto',
          referrerPolicy: 'no-referrer',
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: 'rounded-lg bg-zinc-100 dark:bg-zinc-950 p-4 overflow-x-auto text-sm',
        },
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'border-collapse table-auto w-full my-4',
        },
      }),
      TableRow.configure({
        HTMLAttributes: {
          class: 'border border-zinc-200 dark:border-zinc-800',
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: 'border border-zinc-200 dark:border-zinc-800 px-4 py-2',
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: 'border border-zinc-200 dark:border-zinc-800 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 font-bold',
        },
      }),
      TaskList.configure({
        HTMLAttributes: {
          class: 'list-none pl-0',
        },
      }),
      TaskItem.configure({
        HTMLAttributes: {
          class: 'flex items-start gap-2',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      CharacterCount,
      Color,
      TextStyle,
    ],
    content,
    editable,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getJSON())
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none focus:outline-none min-h-[500px] px-4 py-2 bg-background text-foreground dark:prose-invert',
      },
      handlePaste: (_view, event) => {
        try {
          const e = event as unknown as ClipboardEvent
          const text = e.clipboardData?.getData('text/markdown') || e.clipboardData?.getData('text/plain') || ''
          // 简单启发式：包含 Markdown 特征再拦截
          const looksMarkdown = /(^|\n)\s{0,3}(#{1,6}\s|[-*+]\s|\d+\.\s|>\s|```|~~|\*\*|__)/.test(text)
          if (!text || !looksMarkdown) return false
          e.preventDefault()
          ;(async () => {
            const file = await remark().use(remarkGfm).use(remarkRehype).use(rehypeStringify).process(text)
            const html = String(file)
            editor?.chain().focus().insertContent(html).run()
          })()
          return true
        } catch {
          return false
        }
      },
    },
  })

  if (!editor) {
    return null
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      {editable && <MenuBar editor={editor} />}
      <EditorContent editor={editor} />
      {editable && editor && (
        <div className="border-t px-4 py-2 text-xs text-gray-500 flex justify-between">
          <span>{editor.storage.characterCount.characters()} 字符</span>
          <span>{editor.storage.characterCount.words()} 词</span>
        </div>
      )}
    </div>
  )
}
