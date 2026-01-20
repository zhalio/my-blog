'use client'

import { useState } from 'react'
import { useAuthStore } from '@/lib/auth-store'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Lock, AlertCircle } from 'lucide-react'

export function AdminLoginForm() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const login = useAuthStore((state) => state.login)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!password) {
        setError('请输入密码')
        return
      }

      // 验证密码
      const response = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      if (!response.ok) {
        if (response.status === 401) {
          setError('密码错误，请重试')
        } else {
          setError('验证失败，请检查网络')
        }
        return
      }

      // 登录成功
      login(password)
      router.push('/admin/posts')
    } catch (err) {
      setError('网络错误，请重试')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900 p-4">
      <div className="w-full max-w-md">
        {/* Logo / Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-blue-600 mb-4">
            <Lock className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">管理员登录</h1>
          <p className="text-muted-foreground">输入密码访问博客后台</p>
        </div>

        {/* Login Form */}
        <Card className="p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 密码输入 */}
            <div>
              <label className="block text-sm font-medium mb-2">
                管理员密码
              </label>
              <Input
                type="password"
                placeholder="输入密码..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                autoFocus
                className="text-base"
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
              disabled={loading || !password}
              className="w-full"
              size="lg"
            >
              {loading ? '验证中...' : '登录'}
            </Button>
          </form>

          {/* 提示信息 */}
          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <p className="text-xs text-blue-700 dark:text-blue-300 text-center">
              💡 为了安全，请不要分享你的管理员密码
            </p>
          </div>
        </Card>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} ZHalio Blog. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
