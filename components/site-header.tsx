import { Link } from "@/i18n/routing"
import { ModeToggle } from "@/components/mode-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useTranslations } from "next-intl"
import { Terminal } from "lucide-react"
import { CommandMenu } from "@/components/command-menu"
import { MobileNav } from "@/components/mobile-nav"

export function SiteHeader() {
  const t = useTranslations('Navigation')

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <MobileNav />
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2 ml-2 md:ml-[20px]">
            <Terminal className="h-6 w-6" />
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-foreground/80">{t('home')}</Link>
            <Link href="/posts" className="transition-colors hover:text-foreground/80">{t('posts')}</Link>
            <Link href="/guestbook" className="transition-colors hover:text-foreground/80">{t('guestbook')}</Link>
            <Link href="/about" className="transition-colors hover:text-foreground/80">{t('about')}</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
           <div className="w-full flex-1 md:w-auto md:flex-none">
             <CommandMenu />
           </div>
           <ModeToggle />
           <LanguageToggle />
        </div>
      </div>
    </header>
  )
}