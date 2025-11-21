"use client"

import * as React from "react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, Terminal } from "lucide-react"
import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const t = useTranslations('Navigation')

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <SheetTitle className="px-7">
          <Link
            href="/"
            className="flex items-center"
            onClick={() => setOpen(false)}
          >
            <Terminal className="mr-2 h-4 w-4" />
          </Link>
        </SheetTitle>
        <div className="flex flex-col gap-4 py-4 pl-7 pr-6 mt-4">
            <Link
              href="/posts"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setOpen(false)}
            >
              {t('posts')}
            </Link>
            <Link
              href="/guestbook"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setOpen(false)}
            >
              {t('guestbook')}
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setOpen(false)}
            >
              {t('about')}
            </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}
