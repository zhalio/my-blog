import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || ''

/**
 * 从请求头中提取认证令牌
 */
export function getAuthTokenFromRequest(request: Request): string | null {
  const authHeader = request.headers.get('authorization')
  if (!authHeader) return null
  
  // 支持两种格式: "Bearer token" 或直接是 token
  const parts = authHeader.split(' ')
  if (parts.length === 2 && parts[0] === 'Bearer') {
    return parts[1]
  }
  return authHeader
}

/**
 * 验证管理员请求（Supabase JWT），限制 ADMIN_EMAIL（可选）
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
