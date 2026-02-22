'use client'

import { EditorContent, useEditor, Editor } from '@tiptap/react'
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
import { Mathematics } from '@tiptap/extension-mathematics'
import { common, createLowlight } from 'lowlight'
import { useState, useRef } from 'react'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
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
  const editorRef = useRef<Editor | null>(null)

  const editor = useEditor({
    immediatelyRender: false,
    onCreate({ editor }) {
      editorRef.current = editor
    },
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
      TableCell.extend({
        content: 'block+',
      }).configure({
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
      Mathematics,
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
        class: 'prose prose-lg dark:prose-invert max-w-none focus:outline-none min-h-[500px] leading-relaxed article-font ProseMirror',
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
          
          // Include all common markdown triggers: math, tables, headers, lists, quotes, code, formatting, html, footnotes
          const looksMarkdown = /(^|\n)\s{0,3}(#{1,6}\s|[-*+]\s|\d+\.\s|>|```|~~|[*_](?!\s)|`|[-*_]{3,}|!\[|\[|\||\$\$?|\\|<\/?[a-z]|\[\^)/i.test(text)
          
          if (text && looksMarkdown) {
             e.preventDefault()
             ;(async () => {
               // Strategy 1: Try full parse with Math
               try {
                 const file = await remark()
                   .use(remarkMath)
                   .use(remarkGfm)
                   .use(remarkRehype, {
                     handlers: {
                       math: (state: any, node: any) => {
                         // Build HAST node directly (mdast-util-to-hast 13+ passes state as first arg)
                         return {
                           type: 'element',
                           tagName: 'div',
                           properties: { 
                             'data-type': 'block-math', 
                             'data-latex': node.value || '' 
                           },
                           children: [{ type: 'text', value: node.value || '' }]
                         }
                       },
                       inlineMath: (state: any, node: any) => {
                         return {
                           type: 'element',
                           tagName: 'span',
                           properties: { 
                             'data-type': 'inline-math', 
                             'data-latex': node.value || '' 
                           },
                           children: [{ type: 'text', value: node.value || '' }]
                         }
                       }
                     }
                    })
                   .use(rehypeStringify)
                   .process(text)
                 
                 const html = String(file)
                 editorRef.current?.chain().focus().insertContent(html).run()
                 return
               } catch (error) {
                 console.warn('Math parsing failed, retrying without math...', error)
               }

               // Strategy 2: Try basic GFM parse (restore previous functionality)
               try {
                 const file = await remark()
                   .use(remarkGfm)
                   .use(remarkRehype)
                   .use(rehypeStringify)
                   .process(text)
                 
                 const html = String(file)
                 editorRef.current?.chain().focus().insertContent(html).run()
                 return
               } catch (error) {
                 console.error('Markdown processing completely failed', error)
               }

               // Strategy 3: Fallback to plain text
               editorRef.current?.chain().focus().insertContent(text).run()
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
    <div className="border rounded-lg overflow-hidden relative admin-editor">
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
      <style>{`
        .admin-editor {
          background: #0b1220;
          border: 1px solid #111827;
          box-shadow: 0 10px 30px rgba(0,0,0,0.35);
        }
        .admin-editor .ProseMirror {
          background: #0b1220;
          padding: 20px 24px 28px;
          min-height: 520px;
          line-height: 1.8;
          color: #e5e7eb;
        }
        .admin-editor .ProseMirror h1,
        .admin-editor .ProseMirror h2,
        .admin-editor .ProseMirror h3,
        .admin-editor .ProseMirror h4,
        .admin-editor .ProseMirror h5,
        .admin-editor .ProseMirror h6 {
          color: #f8fafc;
          letter-spacing: -0.01em;
        }
        .admin-editor .ProseMirror p {
          color: #d1d5db;
        }
        .admin-editor .ProseMirror pre {
          background: #0f172a;
          color: #e5e7eb;
          border: 1px solid #1f2937;
          border-radius: 10px;
          padding: 14px 16px;
          font-family: "JetBrains Mono", "Menlo", "Consolas", monospace;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.03);
          position: relative;
        }
        .admin-editor .ProseMirror pre::before {
          content: 'code';
          position: absolute;
          top: 10px;
          right: 12px;
          font-size: 11px;
          color: rgba(229, 231, 235, 0.6);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .admin-editor .ProseMirror pre code {
          background: transparent;
          padding: 0;
        }
        .admin-editor .ProseMirror li {
          padding-left: 6px;
        }
        .admin-editor .ProseMirror ul,
        .admin-editor .ProseMirror ol {
          margin-left: 1.2rem;
        }
        .admin-editor .ProseMirror ul li::marker {
          color: #22d3ee;
        }
        .admin-editor .ProseMirror code:not(pre code) {
          background: rgba(99, 102, 241, 0.12);
          color: #6366f1;
          padding: 0.15rem 0.35rem;
          border-radius: 6px;
          font-family: "JetBrains Mono", "Menlo", "Consolas", monospace;
          border: 1px solid rgba(99, 102, 241, 0.25);
        }
        .admin-editor .ProseMirror blockquote {
          border-left: 3px solid #22d3ee;
          background: rgba(34, 211, 238, 0.05);
          padding: 10px 14px;
          border-radius: 10px;
          color: #cbd5e1;
        }
        .admin-editor .ProseMirror table {
          border: 1px solid #1f2937;
          border-radius: 8px;
          overflow: hidden;
          background: #0f172a;
        }
        .admin-editor .ProseMirror th {
          background: #111827;
          color: #e5e7eb;
          border: 1px solid #1f2937;
        }
        .admin-editor .ProseMirror tr:nth-child(odd) td {
          background: rgba(255,255,255,0.02);
        }
        .admin-editor .ProseMirror td {
          border: 1px solid #1f2937;
        }
        .admin-editor .ProseMirror hr {
          border-top: 1px dashed rgba(99, 102, 241, 0.4);
          margin: 1.5rem 0;
        }
        .admin-editor .ProseMirror a {
          color: #38bdf8;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .admin-editor .ProseMirror img {
          border-radius: 12px;
          border: 1px solid #1f2937;
          box-shadow: 0 10px 30px rgba(0,0,0,0.35);
        }
      `}</style>
    </div>
  )
}
