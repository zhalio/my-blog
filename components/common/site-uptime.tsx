"use client"

import { useMemo } from "react"
import { Activity } from "lucide-react"

const START_TIMESTAMP = new Date("2025-11-20T00:00:00Z").getTime()
const MS_PER_DAY = 24 * 60 * 60 * 1000

const calcDays = () => {
  const now = Date.now()
  const diff = Math.max(0, now - START_TIMESTAMP)
  return Math.floor(diff / MS_PER_DAY)
}

export function SiteUptimeBadge() {
  const days = useMemo(() => calcDays(), [])

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white/70 px-3 py-2 text-sm text-zinc-700 shadow-sm backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-900/70 dark:text-zinc-200">
      <span className="relative inline-flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" aria-hidden />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" aria-hidden />
      </span>
      <span className="flex items-center gap-1">
        <Activity className="h-4 w-4 text-emerald-500" aria-hidden />
        <span>本站已稳定运行</span>
        <span className="font-semibold text-emerald-600 dark:text-emerald-400">{days}</span>
        <span>天</span>
      </span>
    </div>
  )
}
