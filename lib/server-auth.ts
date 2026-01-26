import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

/**
 * 从 httpOnly Cookie 获取认证令牌（服务端）
 */
export async function getAuthTokenFromCookie(): Promise<string | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value
  return token || null
}

/**
 * 从 httpOnly Cookie 获取刷新令牌（服务端）
 */
export async function getRefreshTokenFromCookie(): Promise<string | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('refresh-token')?.value
  return token || null
}

/**
 * 创建具有认证令牌的 Supabase 客户端（服务端）
 */
export async function createAuthenticatedSupabaseClient() {
  const token = await getAuthTokenFromCookie()

  if (!token) {
    throw new Error('No authentication token found')
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
  })
}

/**
 * 安全验证 API 请求的认证
 */
export async function validateAPIRequest(request: Request): Promise<{
  isValid: boolean
  token: string | null
}> {
  const authHeader = request.headers.get('authorization')

  if (!authHeader) {
    return { isValid: false, token: null }
  }

  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : authHeader

  if (!token) {
    return { isValid: false, token: null }
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false },
    })

    const { data, error } = await supabase.auth.getUser(token)

    if (error || !data.user) {
      return { isValid: false, token: null }
    }

    return { isValid: true, token }
  } catch {
    return { isValid: false, token: null }
  }
}
