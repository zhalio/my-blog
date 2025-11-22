"use client"

import { Button } from "@/components/ui/button"
import { useVanta } from "./vanta-context"
import { Palette } from "lucide-react"

export function VantaSwitcher() {
  const { nextEffect, effect } = useVanta()

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={nextEffect}
      title={`Change Background Effect (Current: ${effect})`}
    >
      <Palette className="h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">Change Background Effect</span>
    </Button>
  )
}
