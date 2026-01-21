'use client'

import { useState } from 'react'
import { useSupabaseAuthStore } from '@/lib/supabase-auth-store'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Lock, AlertCircle } from 'lucide-react'

export function SupabaseLoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const signInWithEmail = useSupabaseAuthStore((state) => state.signInWithEmail)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!email || !password) {
        setError('请输入邮箱和密码')
        setLoading(false)
        return
      }

      await signInWithEmail(email, password)
      router.push('/admin/posts')
    } catch (err: any) {
      setError(err.message || '认证失败，请检查邮箱和密码')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950 p-4">
      <div className="w-full max-w-md">
        {/* Logo / Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-zinc-900 dark:bg-zinc-50 mb-4">
            <Lock className="h-6 w-6 text-white dark:text-zinc-900" />
          </div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">管理后台</h1>
          <p className="text-zinc-600 dark:text-zinc-400">使用Supabase账号登录</p>
        </div>

        {/* Login Form */}
        <Card className="p-8 space-y-6 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 邮箱输入 */}
            <div>
              <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2">
                邮箱
              </label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                autoFocus
                className="text-base bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
              />
            </div>

            {/* 密码输入 */}
            <div>
              <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2">
                密码
              </label>
              <Input
                type="password"
                placeholder="输入密码..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="text-base bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
              />
            </div>

            {/* 错误提示 */}
            {error && (
              <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-3 flex gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              </div>
            )}

            {/* 提交按钮 */}
            <Button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full"
              size="lg"
            >
              {loading ? '处理中...' : '登录'}
            </Button>
          </form>
        </Card>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-zinc-500 dark:text-zinc-400">
          <p>© {new Date().getFullYear()} ZHalio Blog. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
