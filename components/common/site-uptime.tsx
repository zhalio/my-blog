"use client"

import { useMemo } from "react"
import { Cog, Activity } from "lucide-react"

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
    <div className="inline-flex items-center gap-3 rounded-2xl border border-border/70 bg-gradient-to-r from-background/92 via-background/82 to-background/72 px-4 py-3 text-sm text-foreground shadow-sm ring-1 ring-border/45 backdrop-blur-xl dark:border-white/8 dark:from-zinc-900/58 dark:via-zinc-900/46 dark:to-emerald-900/22 dark:text-zinc-100 dark:shadow-lg dark:shadow-emerald-500/8 dark:ring-white/14">
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border/70 bg-background/70 ring-1 ring-border/50 dark:border-white/16 dark:bg-white/6 dark:ring-white/12" aria-hidden>
        <Cog className="h-4 w-4 animate-spin text-zinc-600 [animation-duration:2.6s] dark:text-zinc-300" />
      </span>

      <span className="flex flex-col leading-tight">
        <span className="flex items-center gap-1">
          <Activity className="h-4 w-4 text-emerald-500" aria-hidden />
          <span className="text-foreground/80 dark:text-zinc-200/80">本站已稳定运行</span>
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">{days}</span>
          <span className="text-foreground/80 dark:text-zinc-200/80">天</span>
        </span>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">since 2025.11.20</span>
      </span>
    </div>
  )
}
