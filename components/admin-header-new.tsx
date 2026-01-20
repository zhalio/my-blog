'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSupabaseAuthStore } from '@/lib/supabase-auth-store'
import { Button } from '@/components/ui/button'
import { BookOpen, LogOut } from 'lucide-react'

export function AdminHeader() {
  const router = useRouter()
  const logout = useSupabaseAuthStore((state) => state.logout)

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/admin/posts')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
      <div className="container mx-auto px-4 max-w-6xl py-4">
        <div className="flex items-center justify-between">
          <Link href="/admin/posts" className="flex items-center gap-3">
            <div className="bg-zinc-900 dark:bg-zinc-50 p-2 rounded-lg">
              <BookOpen className="h-5 w-5 text-white dark:text-zinc-900" />
            </div>
            <div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Admin</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/admin/posts"
              className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
            >
              文章管理
            </Link>
            <a
              href="/"
              className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
            >
              返回首页
            </a>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="gap-2 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300"
            >
              <LogOut className="h-4 w-4" />
              退出登录
            </Button>
          </nav>

          {/* 移动端菜单 */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="sm"
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
