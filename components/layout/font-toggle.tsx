"use client"

import { useEffect, useState } from "react"
import { Italic, Type } from "lucide-react"
import { Button } from "@/components/ui/button"

const FONT_STORAGE_KEY = "font-preference"
type FontChoice = "sans" | "serif"

function applyFontPreference(choice: FontChoice) {
  const root = document.documentElement
  if (choice === "serif") {
    root.dataset.font = "serif"
  } else {
    root.removeAttribute("data-font")
  }
}

export function FontToggle() {
  const [font, setFont] = useState<FontChoice>("sans")

  useEffect(() => {
    const saved = (typeof window !== "undefined" ? window.localStorage.getItem(FONT_STORAGE_KEY) : null) as FontChoice | null
    const initial = saved === "serif" ? "serif" : "sans"
    setFont(initial)
    applyFontPreference(initial)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    applyFontPreference(font)
    window.localStorage.setItem(FONT_STORAGE_KEY, font)
  }, [font])

  const toggle = () => setFont((prev) => (prev === "sans" ? "serif" : "sans"))

  const isSerif = font === "serif"

  return (
    <Button variant="outline" size="icon" onClick={toggle} aria-pressed={isSerif}>
      {isSerif ? <Italic className="h-[1.2rem] w-[1.2rem]" /> : <Type className="h-[1.2rem] w-[1.2rem]" />}
      <span className="sr-only">Toggle font</span>
    </Button>
  )
}
