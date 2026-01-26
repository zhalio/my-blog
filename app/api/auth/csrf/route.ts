import { NextResponse } from 'next/server'
import { generateCSRFToken } from '@/lib/csrf'

export async function GET() {
  try {
    // 生成新的 CSRF token
    const csrfToken = generateCSRFToken()

    // 创建响应
    const response = NextResponse.json({ csrfToken })

    // 在 Cookie 中设置相同的 token（HttpOnly）
    // 开发环境下 secure: false 允许 HTTP，生产环境下需要 HTTPS
    const isProduction = process.env.NODE_ENV === 'production'
    
    response.cookies.set({
      name: 'x-csrf-token',
      value: csrfToken,
      httpOnly: false, // 允许 JS 读取用于调试，生产环境应设为 true
      secure: isProduction, // 开发环境 HTTP，生产环境 HTTPS
      sameSite: 'strict', // 更严格的同站检查
      maxAge: 60 * 60, // 1 hour
      path: '/',
    })

    console.log('[CSRF] Generated new token and set cookie')

    return response
  } catch (error) {
    console.error('CSRF token generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate CSRF token' },
      { status: 500 }
    )
  }
}
