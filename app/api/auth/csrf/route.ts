import { NextResponse } from 'next/server'
import { generateCSRFToken } from '@/lib/csrf'

export async function GET() {
  try {
    // 生成新的 CSRF token
    const csrfToken = generateCSRFToken()

    // 创建响应
    const response = NextResponse.json({ csrfToken })

    // 在 Cookie 中设置相同的 token
    const isProduction = process.env.NODE_ENV === 'production'
    
    response.cookies.set({
      name: 'x-csrf-token',
      value: csrfToken,
      httpOnly: false, // 允许 JS 读取，生产环境生效
      secure: isProduction, // 生产环境需要 HTTPS
      sameSite: isProduction ? 'none' : 'lax', // 生产环境允许跨站，需要配合 Secure
      maxAge: 60 * 60, // 1 hour
      path: '/',
    })

    console.log('[CSRF] Generated token:', {
      env: process.env.NODE_ENV,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
    })

    return response
  } catch (error) {
    console.error('[CSRF] Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate CSRF token' },
      { status: 500 }
    )
  }
}
