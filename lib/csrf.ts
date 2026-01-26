import crypto from 'crypto'
import type { NextRequest } from 'next/server'

const CSRF_SECRET = process.env.CSRF_SECRET || 'default-csrf-secret-change-in-production'

/**
 * 生成 CSRF token
 */
export function generateCSRFToken(sessionId: string): string {
  const token = crypto.randomBytes(32).toString('hex')
  const signature = crypto
    .createHmac('sha256', CSRF_SECRET)
    .update(`${sessionId}:${token}`)
    .digest('hex')
  return `${token}.${signature}`
}

/**
 * 验证 CSRF token
 */
export function validateCSRFToken(
  token: string,
  request: NextRequest
): boolean {
  if (!token || typeof token !== 'string') {
    return false
  }

  try {
    const [tokenPart, signaturePart] = token.split('.')
    if (!tokenPart || !signaturePart) {
      return false
    }

    // 从请求头或 Cookie 获取 session ID
    const sessionId = request.headers.get('x-session-id') || 'anonymous'

    // 验证签名
    const expectedSignature = crypto
      .createHmac('sha256', CSRF_SECRET)
      .update(`${sessionId}:${tokenPart}`)
      .digest('hex')

    return signaturePart === expectedSignature
  } catch {
    return false
  }
}

/**
 * 生成 CSRF token 端点（获取新 token）
 */
export function generateNewCSRFToken(): string {
  const randomId = crypto.randomBytes(16).toString('hex')
  return generateCSRFToken(randomId)
}
