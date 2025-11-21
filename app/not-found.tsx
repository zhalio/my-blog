import Link from 'next/link'
import { Button } from '@/components/ui/button'
import "./globals.css"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased flex flex-col items-center justify-center text-center">
      <div className="space-y-6 px-4">
        <div className="space-y-2">
          <h1 className="text-8xl font-bold tracking-tighter text-primary">404</h1>
          <h2 className="text-2xl font-semibold tracking-tight">Page not found</h2>
          <p className="text-muted-foreground max-w-[500px]">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
          </p>
        </div>
        <Button asChild size="lg">
          <Link href="/">
            Go back home
          </Link>
        </Button>
      </div>
    </div>
  )
}
