"use client"

import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/routing"
import { ArrowRight, Github, MessageCircle } from "lucide-react"
import { MagneticButton } from "@/components/visuals/magnetic-button"

export function HomeButtons({ 
  viewPostsText, 
}: { 
  viewPostsText: string 
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-4">
      <MagneticButton>
        <Button asChild size="lg">
          <Link href="/posts">
            {viewPostsText} <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </MagneticButton>
      <MagneticButton>
        <Button variant="outline" size="lg" asChild>
          <Link href="https://github.com/zhalio" target="_blank" rel="noreferrer">
            <Github className="mr-2 size-4" /> GitHub
          </Link>
        </Button>
      </MagneticButton>
      <MagneticButton>
        <Button variant="outline" size="lg" asChild>
          <Link href="https://qm.qq.com/cgi-bin/qm/qr?k=GJV7-av-NF7gsXV13umV8RqQC0Cum5zo" target="_blank" rel="noreferrer">
            <MessageCircle className="mr-2 size-4" /> QQ
          </Link>
        </Button>
      </MagneticButton>
    </div>
  )
}
