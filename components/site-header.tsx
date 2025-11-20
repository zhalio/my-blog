import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2 font-bold">
            My Blog
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/posts" className="transition-colors hover:text-foreground/80">文章</Link>
            <Link href="/about" className="transition-colors hover:text-foreground/80">关于</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
           <ModeToggle />
        </div>
      </div>
    </header>
  )
}