"use client"

import { useEffect, useMemo, useState, type ReactNode } from "react"
import { Check, Code, Italic, Languages, Sparkles, Type } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const FONT_STORAGE_KEY = "article-font-preference"

type LatinChoice = "latin-sans" | "latin-serif" | "latin-display" | "latin-mono"
type CjkChoice = "cjk-sans" | "cjk-serif" | "cjk-rounded" | "cjk-kai"
type FontSizeChoice = "xs" | "sm" | "base" | "lg" | "xl" | "2xl"

type FontOption = {
  id: LatinChoice | CjkChoice
  label: string
  hint: string
  stack: string
  icon: ReactNode
}

const LATIN_OPTIONS: FontOption[] = [
  { id: "latin-sans", label: "英文无衬线", hint: "Inter/Segoe/系统", stack: '"Inter", "Segoe UI", "SF Pro Text", system-ui, sans-serif', icon: <Type className="h-4 w-4" /> },
  { id: "latin-serif", label: "英文衬线", hint: "Georgia/Times", stack: 'Georgia, "Times New Roman", Times, serif', icon: <Italic className="h-4 w-4" /> },
  { id: "latin-display", label: "英文优雅衬线", hint: "Playfair / Baskerville", stack: '"Playfair Display", "Libre Baskerville", "Baskerville", "Times New Roman", serif', icon: <Sparkles className="h-4 w-4" /> },
  { id: "latin-mono", label: "英文等宽", hint: "Fira Code/Consolas", stack: '"Fira Code", "JetBrains Mono", "Menlo", "Consolas", "Courier New", monospace', icon: <Code className="h-4 w-4" /> },
]

const CJK_OPTIONS: FontOption[] = [
  { id: "cjk-sans", label: "中文无衬线", hint: "思源黑/苹方/雅黑", stack: '"Noto Sans SC", "Source Han Sans SC", "PingFang SC", "Microsoft YaHei", "Heiti SC", "WenQuanYi Micro Hei", system-ui, sans-serif', icon: <Languages className="h-4 w-4" /> },
  { id: "cjk-serif", label: "中文宋体", hint: "思源宋/宋体", stack: '"Noto Serif SC", "Source Han Serif SC", "Songti SC", "SimSun", "STSong", serif', icon: <Italic className="h-4 w-4" /> },
  { id: "cjk-rounded", label: "中文圆体", hint: "更圆润", stack: '"MiSans", "HarmonyOS Sans SC", "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif', icon: <Sparkles className="h-4 w-4" /> },
  { id: "cjk-kai", label: "中文楷体", hint: "更书写感", stack: '"Kaiti SC", "STKaiti", "KaiTi", "FangSong", serif', icon: <Italic className="h-4 w-4" /> },
]

const LATIN_MAP = Object.fromEntries(LATIN_OPTIONS.map((o) => [o.id, o.stack])) as Record<LatinChoice, string>
const CJK_MAP = Object.fromEntries(CJK_OPTIONS.map((o) => [o.id, o.stack])) as Record<CjkChoice, string>

const FONT_SIZE_OPTIONS = [
  { id: "xs" as const, label: "特小", size: "0.875rem", lineHeight: "1.6" },
  { id: "sm" as const, label: "小", size: "0.9375rem", lineHeight: "1.65" },
  { id: "base" as const, label: "标准", size: "1rem", lineHeight: "1.7" },
  { id: "lg" as const, label: "大", size: "1.0625rem", lineHeight: "1.75" },
  { id: "xl" as const, label: "特大", size: "1.125rem", lineHeight: "1.8" },
  { id: "2xl" as const, label: "超大", size: "1.25rem", lineHeight: "1.85" },
]

const FONT_SIZE_MAP = Object.fromEntries(FONT_SIZE_OPTIONS.map((o) => [o.id, { size: o.size, lineHeight: o.lineHeight }])) as Record<FontSizeChoice, { size: string; lineHeight: string }>

type StoredPref = { latin: LatinChoice; cjk: CjkChoice; size: FontSizeChoice }

function applyFontPreference(pref: StoredPref) {
  const root = document.documentElement
  const latinStack = LATIN_MAP[pref.latin] ?? LATIN_MAP["latin-sans"]
  const cjkStack = CJK_MAP[pref.cjk] ?? CJK_MAP["cjk-sans"]
  const sizeConfig = FONT_SIZE_MAP[pref.size] ?? FONT_SIZE_MAP["base"]
  root.style.setProperty("--article-font-latin", latinStack)
  root.style.setProperty("--article-font-cjk", cjkStack)
  // 拉丁字体在前，这样英文会优先使用拉丁字体，中文会fallback到CJK字体
  root.style.setProperty("--article-font", `${latinStack}, ${cjkStack}, system-ui, sans-serif`)
  root.style.setProperty("--article-font-size", sizeConfig.size)
  root.style.setProperty("--article-line-height", sizeConfig.lineHeight)
  root.dataset.articleFontLatin = pref.latin
  root.dataset.articleFontCjk = pref.cjk
  root.dataset.articleFontSize = pref.size
}

export function FontToggle() {
  const [latin, setLatin] = useState<LatinChoice>("latin-sans")
  const [cjk, setCjk] = useState<CjkChoice>("cjk-sans")
  const [size, setSize] = useState<FontSizeChoice>("base")

  useEffect(() => {
    if (typeof window === "undefined") return
    const savedRaw = window.localStorage.getItem(FONT_STORAGE_KEY)
    try {
      const parsed = savedRaw ? (JSON.parse(savedRaw) as Partial<StoredPref>) : null
      const initial: StoredPref = {
        latin: parsed?.latin && parsed.latin in LATIN_MAP ? (parsed.latin as LatinChoice) : "latin-sans",
        cjk: parsed?.cjk && parsed.cjk in CJK_MAP ? (parsed.cjk as CjkChoice) : "cjk-sans",
        size: parsed?.size && parsed.size in FONT_SIZE_MAP ? (parsed.size as FontSizeChoice) : "base",
      }
      setLatin(initial.latin)
      setCjk(initial.cjk)
      setSize(initial.size)
      applyFontPreference(initial)
    } catch (e) {
      applyFontPreference({ latin: "latin-sans", cjk: "cjk-sans", size: "base" })
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    const pref: StoredPref = { latin, cjk, size }
    applyFontPreference(pref)
    window.localStorage.setItem(FONT_STORAGE_KEY, JSON.stringify(pref))
  }, [latin, cjk, size])

  const activeIcon = useMemo(() => {
    if (latin === "latin-mono") return <Code className="h-4 w-4" />
    if (latin === "latin-serif" || latin === "latin-display") return <Italic className="h-4 w-4" />
    return <Type className="h-4 w-4" />
  }, [latin])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="切换正文字体">
          {activeIcon}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="w-64">
        <DropdownMenuLabel>英文/数字字体</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {LATIN_OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option.id}
            className="flex items-center justify-between gap-2"
            onSelect={(e) => {
              e.preventDefault()
              setLatin(option.id as LatinChoice)
            }}
          >
            <div className="flex items-center gap-2">
              {option.icon}
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-medium">{option.label}</span>
                <span className="text-xs text-muted-foreground">{option.hint}</span>
              </div>
            </div>
            {latin === option.id && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />
        <DropdownMenuLabel>中文字体</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {CJK_OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option.id}
            className="flex items-center justify-between gap-2"
            onSelect={(e) => {
              e.preventDefault()
              setCjk(option.id as CjkChoice)
            }}
          >
            <div className="flex items-center gap-2">
              {option.icon}
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-medium">{option.label}</span>
                <span className="text-xs text-muted-foreground">{option.hint}</span>
              </div>
            </div>
            {cjk === option.id && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />
        <DropdownMenuLabel>字号大小</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="grid grid-cols-3 gap-1 px-2 pb-2">
          {FONT_SIZE_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => setSize(option.id)}
              className={`px-2 py-1.5 text-xs rounded transition-colors ${
                size === option.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
