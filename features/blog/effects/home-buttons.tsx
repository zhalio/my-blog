"use client"

import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/routing"
import { HandDrawnArrow } from "@/shared/visuals/doodles"

export function HomeButtons({ 
  viewPostsText, 
}: { 
  viewPostsText: string 
}) {
  return (
    <div className="flex flex-wrap items-center justify-start gap-4 lg:gap-6 w-full">
      <Button asChild size="lg" className="h-12 md:h-14 px-6 md:px-8 text-base md:text-lg font-bold group bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all rounded-full cursor-pointer border border-primary-foreground/10">
        <Link href="/posts" className="flex items-center justify-center whitespace-nowrap">
          <span className="truncate mr-2">{viewPostsText}</span>
          <HandDrawnArrow className="size-5 group-hover:translate-x-1 group-hover:-rotate-12 transition-transform stroke-2 fill-transparent" />
        </Link>
      </Button>
      <Button variant="outline" asChild size="lg" className="h-12 md:h-14 px-6 md:px-8 text-base md:text-lg font-bold group bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-zinc-700 text-foreground shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all rounded-full cursor-pointer border border-slate-200 dark:border-zinc-700">
        <Link href="https://github.com/zzemy" target="_blank" rel="noreferrer" className="flex items-center justify-center whitespace-nowrap">
          <span className="truncate">GitHub</span>
        </Link>
      </Button>
    </div>
  )
}
