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
    <div className="inline-flex items-center gap-3 rounded-2xl border border-white/30 bg-gradient-to-r from-white/60 via-white/40 to-emerald-50/60 px-4 py-3 text-sm text-zinc-700 shadow-lg shadow-emerald-500/10 ring-1 ring-white/20 backdrop-blur-xl dark:border-white/10 dark:from-zinc-900/70 dark:via-zinc-900/60 dark:to-emerald-900/30 dark:text-zinc-100">
      <span className="relative inline-flex h-3 w-3">
        <span
          className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60"
          aria-hidden
          style={{ animationDuration: "1.8s" }}
        />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" aria-hidden />
      </span>

      <span className="flex flex-col leading-tight">
        <span className="flex items-center gap-1">
          <Activity className="h-4 w-4 text-emerald-500" aria-hidden />
          <span className="text-zinc-700/80 dark:text-zinc-200/80">本站已稳定运行</span>
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">{days}</span>
          <span className="text-zinc-700/80 dark:text-zinc-200/80">天</span>
        </span>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">since 2025.11.20</span>
      </span>
    </div>
  )
}
