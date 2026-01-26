import crypto from 'crypto'
import type { NextRequest } from 'next/server'

const CSRF_SECRET = process.env.CSRF_SECRET || 'default-csrf-secret-change-in-production'

/**
 * 生成 CSRF token
 * 返回可发送给客户端的 token
 */
export function generateCSRFToken(): string {
  // 生成一个随机 token
  const token = crypto.randomBytes(32).toString('hex')
  return token
}

/**
 * 验证 CSRF token
 * 比对客户端发送的 token 和 Cookie 中存储的 token
 */
export function validateCSRFToken(
  tokenFromBody: string,
  request: NextRequest
): boolean {
  if (!tokenFromBody || typeof tokenFromBody !== 'string') {
    return false
  }

  try {
    // 从 Cookie 中获取之前存储的 CSRF token
    const tokenFromCookie = request.cookies.get('x-csrf-token')?.value

    if (!tokenFromCookie) {
      console.warn('CSRF token not found in cookie')
      return false
    }

    // 比对两个 token
    const isValid = tokenFromBody === tokenFromCookie
    
    if (!isValid) {
      console.warn('CSRF token mismatch', {
        fromBody: tokenFromBody.substring(0, 10) + '...',
        fromCookie: tokenFromCookie.substring(0, 10) + '...',
      })
    }

    return isValid
  } catch (error) {
    console.error('CSRF token validation error:', error)
    return false
  }
}
