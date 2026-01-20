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
import { uploadImage } from '@/lib/upload-image'

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
  const [isUploading, setIsUploading] = useState(false)
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
        class: 'prose prose-lg dark:prose-invert max-w-none focus:outline-none min-h-[500px] leading-relaxed font-serif prose-headings:font-sans ProseMirror',
      },
      handlePaste: (view, event, slice) => {
        // 1. Image Paste Support
        const item = event.clipboardData?.items[0]
        if (item?.type.indexOf('image') === 0) {
          event.preventDefault()
          const file = item.getAsFile()
          if (file) {
            setIsUploading(true)
            uploadImage(file).then((url) => {
              if (url) {
                const { schema } = view.state
                const node = schema.nodes.image.create({ src: url })
                const transaction = view.state.tr.replaceSelectionWith(node)
                view.dispatch(transaction)
              } else {
                alert('图片上传失败，请检查 Supabase Storage 设置')
              }
            }).finally(() => {
              setIsUploading(false)
            })
          }
          return true
        }

        // 2. Existing Markdown Support
        try {
          const e = event as unknown as ClipboardEvent
          const text = e.clipboardData?.getData('text/markdown') || e.clipboardData?.getData('text/plain') || ''
          // 简单启发式：包含 Markdown 特征再拦截
          const looksMarkdown = /(^|\n)\s{0,3}(#{1,6}\s|[-*+]\s|\d+\.\s|>\s|```|~~|\*\*|__)/.test(text)
          
          if (text && looksMarkdown) {
             e.preventDefault()
             ;(async () => {
               const file = await remark().use(remarkGfm).use(remarkRehype).use(rehypeStringify).process(text)
               const html = String(file)
               // Note: 'editor' comes from closure, might be safer to use view.props.editor? 
               // Accessing via view.dom doesn't give Tiptap editor. 
               // Stick to closure 'editor' as it was before, or use view in some way if possible, 
               // but 'editor' is available in scope.
               editor?.chain().focus().insertContent(html).run()
             })()
             return true
          }
        } catch {}
        
        return false
      },
      handleDrop: (view, event, slice, moved) => {
        if (!moved && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
          const file = event.dataTransfer.files[0]
          
          if (file.type.indexOf('image') === 0) {
            event.preventDefault()
            
            setIsUploading(true)
            uploadImage(file).then((url) => {
              if (url) {
                const { schema } = view.state
                const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY })
                if (coordinates) {
                   const node = schema.nodes.image.create({ src: url })
                   const transaction = view.state.tr.insert(coordinates.pos, node)
                   view.dispatch(transaction)
                }
              } else {
                alert('图片上传失败，请检查 Supabase Storage 设置')
              }
            }).finally(() => {
              setIsUploading(false)
            })
            return true
          }
        }
        return false
      },
    },
  })

  if (!editor) {
    return null
  }

  return (
    <div className="border rounded-lg overflow-hidden relative">
      {isUploading && (
        <div className="absolute inset-0 z-50 bg-background/50 backdrop-blur-sm flex items-center justify-center">
            <div className="animate-pulse text-primary font-medium">图片上传中...</div>
        </div>
      )}
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
