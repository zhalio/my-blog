import { Link } from "@/i18n/routing"
import { ModeToggle } from "@/components/layout/mode-toggle"
import { LanguageToggle } from "@/components/layout/language-toggle"
import { useTranslations } from "next-intl"
import { Terminal } from "lucide-react"
import { CommandMenu } from "@/components/layout/command-menu"
import { MobileNav } from "@/components/layout/mobile-nav"
import { VantaSwitcher } from "@/components/effects/vanta-switcher"

export function SiteHeader() {
  const t = useTranslations('Navigation')

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200/50 dark:border-neutral-800/50 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <MobileNav />
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2 ml-4 md:ml-6">
            <Terminal className="h-6 w-6" />
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-primary">{t('home')}</Link>
            <Link href="/posts" className="transition-colors hover:text-primary">{t('posts')}</Link>
            <Link href="/guestbook" className="transition-colors hover:text-primary">{t('guestbook')}</Link>
            <Link href="/about" className="transition-colors hover:text-primary">{t('about')}</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2 pr-3 md:pr-0">
           <div className="w-full flex-1 md:w-auto md:flex-none">
             <CommandMenu />
           </div>
           <VantaSwitcher />
           <ModeToggle />
           <LanguageToggle />
        </div>
      </div>
    </header>
  )
}