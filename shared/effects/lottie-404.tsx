"use client"

import Lottie from "lottie-react"
import { useEffect, useState } from "react"

export function Lottie404() {
  const [animationData, setAnimationData] = useState<any>(null)

  useEffect(() => {
    fetch('/lottie/404.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load local 404 animation')
        }
        return response.json()
      })
      .then((data) => setAnimationData(data))
      .catch((error) => {
        console.error('Failed to load local 404 animation', error)
      })
  }, [])

  if (!animationData) {
    return <div className="mx-auto h-64 w-full max-w-md animate-pulse rounded-[2rem] border-2 border-slate-200 bg-white/70 shadow-[10px_10px_0px_#e2e8f0] dark:border-slate-700 dark:bg-slate-800/70 dark:shadow-[10px_10px_0px_#020617]" />
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Lottie animationData={animationData} loop />
    </div>
  )
}
