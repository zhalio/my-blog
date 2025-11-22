import { Link } from "@/i18n/routing"
import { ModeToggle } from "@/components/layout/mode-toggle"
import { LanguageToggle } from "@/components/layout/language-toggle"
import { useTranslations } from "next-intl"
import { Terminal, CalendarDays } from "lucide-react"
import { CommandMenu } from "@/components/layout/command-menu"
import { MobileNav } from "@/components/layout/mobile-nav"
import { VantaSwitcher } from "@/components/effects/vanta-switcher"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
            <HoverCard>
              <HoverCardTrigger asChild>
                <Link href="/about" className="transition-colors hover:text-primary">{t('about')}</Link>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4">
                  <Avatar>
                    <AvatarImage src="https://github.com/zhemmmzh.png" />
                    <AvatarFallback>EM</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">@zhemmmzh</h4>
                    <p className="text-sm">
                      Full-stack developer, open source enthusiast.
                    </p>
                    <div className="flex items-center pt-2">
                      <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                      <span className="text-xs text-muted-foreground">
                        Joined November 2025
                      </span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
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