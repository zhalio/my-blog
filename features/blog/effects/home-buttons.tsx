"use client"

import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/routing"
import { ArrowRight, Github, MessageCircle } from "lucide-react"
import { MagneticButton } from "@/shared/visuals/magnetic-button"

export function HomeButtons({ 
  viewPostsText, 
}: { 
  viewPostsText: string 
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-4 sm:gap-6">
      <MagneticButton className="min-w-0">
        <Button asChild size="lg" className="sketch-ui h-12 w-[160px] md:h-14 md:w-[180px] px-4 text-sm md:text-base font-black">
          <Link href="/posts" className="flex items-center justify-center whitespace-nowrap">
            <span className="truncate">{viewPostsText}</span>
            <ArrowRight className="ml-2 hidden size-5 sm:inline" />
          </Link>
        </Button>
      </MagneticButton>
      <MagneticButton className="min-w-0">
        <Button variant="outline" asChild size="lg" className="sketch-ui h-12 w-[140px] md:h-14 md:w-[160px] px-4 text-sm md:text-base font-black">
          <Link href="https://github.com/zzemy" target="_blank" rel="noreferrer" className="flex items-center justify-center whitespace-nowrap">
            <Github className="mr-2 hidden size-5 sm:inline" /> <span className="truncate">GitHub</span>
          </Link>
        </Button>
      </MagneticButton>
      <MagneticButton className="min-w-0">
        <Button variant="outline" asChild size="lg" className="sketch-ui h-12 w-[140px] md:h-14 md:w-[160px] px-4 text-sm md:text-base font-black">
          <Link href="https://qm.qq.com/cgi-bin/qm/qr?k=GJV7-av-NF7gsXV13umV8RqQC0Cum5zo" target="_blank" rel="noreferrer" className="flex items-center justify-center whitespace-nowrap">
            <MessageCircle className="mr-2 hidden size-5 sm:inline" /> <span className="truncate">QQ</span>
          </Link>
        </Button>
      </MagneticButton>
    </div>
  )
}
