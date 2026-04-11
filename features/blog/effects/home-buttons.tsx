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
    <div className="flex flex-wrap items-center justify-start gap-4 lg:gap-5 w-full mt-4">
      <Button asChild size="lg" className="h-12 md:h-14 px-8 text-base md:text-lg font-black group bg-gradient-to-r from-indigo-500 to-primary hover:from-indigo-400 hover:to-indigo-500 hover:scale-105 text-white shadow-xl shadow-primary/30 transition-all rounded-full cursor-pointer border-none overflow-hidden relative">
        <Link href="/posts" className="flex items-center justify-center whitespace-nowrap">
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
          <span className="truncate mr-3 relative z-10">{viewPostsText}</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="size-5 relative z-10 group-hover:translate-x-1 transition-transform stroke-[3px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
        </Link>
      </Button>
      <Button variant="outline" asChild size="lg" className="h-12 md:h-14 px-8 text-base md:text-lg font-black group bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 shadow-xl shadow-slate-200/50 dark:shadow-none hover:scale-105 transition-all rounded-full cursor-pointer border border-slate-100 dark:border-slate-700">
        <Link href="https://github.com/zzemy" target="_blank" rel="noreferrer" className="flex items-center justify-center whitespace-nowrap">
          <span className="truncate">GitHub</span>
        </Link>
      </Button>
    </div>
  )
}
