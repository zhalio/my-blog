import { Link } from "@/i18n/routing"
import { ModeToggle } from "@/components/mode-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useTranslations } from "next-intl"
import { Command } from "lucide-react"

export function SiteHeader() {
  const t = useTranslations('Navigation')
  const tHome = useTranslations('Home')

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2 ml-[20px]">
            <Command className="h-6 w-6" />
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/posts" className="transition-colors hover:text-foreground/80">{t('posts')}</Link>
            <Link href="/about" className="transition-colors hover:text-foreground/80">{t('about')}</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
           <ModeToggle />
           <LanguageToggle />
        </div>
      </div>
    </header>
  )
}