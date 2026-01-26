import { NextResponse } from 'next/server'
import { generateCSRFToken } from '@/lib/csrf'

export async function GET() {
  try {
    // 生成新的 CSRF token
    const csrfToken = generateCSRFToken()

    // 创建响应
    const response = NextResponse.json({ csrfToken })

    // 在 Cookie 中设置相同的 token
    // 生产环境需要 secure: true 并使用 SameSite=None
    // 开发环境可以使用 secure: false 和 SameSite=Lax
    const isProduction = process.env.NODE_ENV === 'production'
    
    response.cookies.set({
      name: 'x-csrf-token',
      value: csrfToken,
      httpOnly: false, // 允许 JS 读取以便调试和测试
      secure: isProduction, // 生产环境 HTTPS，开发环境 HTTP
      sameSite: isProduction ? 'none' : 'lax', // 生产环境跨站，开发环境同站
      maxAge: 60 * 60, // 1 hour
      path: '/',
    })

    console.log('[CSRF] Generated token:', {
      tokenLength: csrfToken.length,
      isProduction,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
    })

    return response
  } catch (error) {
    console.error('[CSRF] Generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate CSRF token' },
      { status: 500 }
    )
  }
}
