import { createClient } from '@supabase/supabase-js'
import { getAuthTokenFromCookie } from '@/lib/server-auth'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || ''

/**
 * 从请求头或 Cookie 中提取认证令牌
 */
export function getAuthTokenFromRequest(request: Request): string | null {
  // 1. 尝试从 Authorization Header 获取
  const authHeader = request.headers.get('authorization')
  if (authHeader) {
    const parts = authHeader.split(' ')
    if (parts.length === 2 && parts[0] === 'Bearer') {
      return parts[1]
    }
    return authHeader // 兼容直接传 token 的情况
  }

  // 2. 尝试从 Cookie 获取 (auth-token)
  // 注意：NextRequest 对象有 cookies 属性，但为了保持通用性，我们解析 Cookie 头部
  const cookieHeader = request.headers.get('cookie')
  if (cookieHeader) {
    const match = cookieHeader.match(/auth-token=([^;]+)/)
    if (match && match[1]) {
      return match[1]
    }
  }

  return null
}

/**
 * 验证管理员请求（使用服务端 Cookie 中的 JWT）
 */
export async function validateAdminRequest(token: string | null): Promise<boolean> {
  if (!token) return false
  if (!supabaseUrl || !supabaseAnonKey) return false

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false },
  })

  const { data, error } = await supabase.auth.getUser(token)
  if (error || !data.user) return false

  if (ADMIN_EMAIL && data.user.email !== ADMIN_EMAIL) return false
  return true
}

/**
 * 带原因的管理员校验，便于排查 401 问题
 */
export async function validateAdminRequestWithReason(token: string | null): Promise<{ ok: boolean; reason?: string; email?: string | null }>{
  if (!token) return { ok: false, reason: 'missing_token', email: null }
  if (!supabaseUrl || !supabaseAnonKey) return { ok: false, reason: 'missing_supabase_env', email: null }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false },
  })

  const { data, error } = await supabase.auth.getUser(token)
  if (error || !data.user) {
    return { ok: false, reason: 'token_invalid', email: null }
  }

  if (ADMIN_EMAIL && data.user.email !== ADMIN_EMAIL) {
    return { ok: false, reason: 'email_mismatch', email: data.user.email }
  }

  return { ok: true, email: data.user.email }
}

/**
 * 返回当前管理员用户（Supabase）
 */
export async function getAdminUser(token: string | null) {
  if (!token || !supabaseUrl || !supabaseAnonKey) return null
  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false },
  })
  const { data, error } = await supabase.auth.getUser(token)
  if (error || !data.user) return null
  if (ADMIN_EMAIL && data.user.email !== ADMIN_EMAIL) return null
  return data.user
}

/**
 * 从服务端 Cookie 获取认证令牌并验证（推荐用法）
 */
export async function validateAdminRequestFromCookie(): Promise<boolean> {
  try {
    const token = await getAuthTokenFromCookie()
    return validateAdminRequest(token)
  } catch {
    return false
  }
}
