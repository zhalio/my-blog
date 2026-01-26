import { NextResponse } from 'next/server'
import { generateCSRFToken } from '@/lib/csrf'

export async function GET() {
  try {
    // 生成新的 CSRF token
    const csrfToken = generateCSRFToken()

    // 创建响应
    const response = NextResponse.json({ csrfToken })

    // 在 Cookie 中设置相同的 token（HttpOnly）
    response.cookies.set({
      name: 'x-csrf-token',
      value: csrfToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60, // 1 hour
      path: '/',
    })

    return response
  } catch (error) {
    console.error('CSRF token generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate CSRF token' },
      { status: 500 }
    )
  }
}
