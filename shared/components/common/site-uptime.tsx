"use client"

import { useMemo } from "react"
import { Cog } from "lucide-react"
import confetti from "canvas-confetti"

const START_TIMESTAMP = new Date("2025-11-20T00:00:00Z").getTime()
const MS_PER_DAY = 24 * 60 * 60 * 1000

const calcDays = () => {
  const now = Date.now()
  const diff = Math.max(0, now - START_TIMESTAMP)
  return Math.floor(diff / MS_PER_DAY)
}

export function SiteUptimeBadge() {
  const days = useMemo(() => calcDays(), [])

  const handleConfetti = () => {
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min
    }

    const interval: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        clearInterval(interval)
        return
      }

      const particleCount = 50 * (timeLeft / duration)

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      })
    }, 250)
  }

  return (
    <button
      type="button"
      onClick={handleConfetti}
      className="sketch-ui inline-flex items-center gap-3 rounded-full bg-background/80 px-6 py-3 text-left text-sm text-foreground backdrop-blur-md hover:bg-background transition-all outline-none font-bold active:scale-95"
    >
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-foreground/20 bg-background" aria-hidden>
        <Cog className="h-5 w-5 animate-spin text-primary [animation-duration:3s]" />
      </span>

      <span className="flex flex-col leading-tight">
        <span className="flex items-center justify-center gap-1.5">
          <span className="text-foreground/90">本站已稳定运行</span>
          <span className="font-black text-lg text-primary">{days}</span>
          <span className="text-foreground/90">天</span>
        </span>
        <span className="block w-full text-center text-[11px] text-muted-foreground font-semibold">since 2025.11.20</span>
      </span>
    </button>
  )
}
