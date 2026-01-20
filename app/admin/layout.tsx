import "../globals.css"
import { AdminProtector } from "@/components/admin-protector"
import { AdminHeader } from "@/components/admin-header"
import { ThemeProvider } from "@/components/layout/theme-provider"

export const metadata = {
  metadataBase: new URL('https://emmmxx.xyz'),
  title: 'Blog Admin',
  description: 'Manage your blog content',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className="min-h-screen bg-background">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AdminProtector>
            <div className="min-h-screen">
              <AdminHeader />
              <main className="container mx-auto px-4 max-w-6xl py-8">
                {children}
              </main>
            </div>
          </AdminProtector>
        </ThemeProvider>
      </body>
    </html>
  )
}
