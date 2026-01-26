import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { generateCSRFToken, validateCSRFToken } from '@/lib/csrf'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function POST(request: NextRequest) {
  try {
    const { email, password, csrfToken } = await request.json()

    // 验证 CSRF token
    if (!validateCSRFToken(csrfToken, request)) {
      return NextResponse.json(
        { error: 'CSRF token invalid' },
        { status: 403 }
      )
    }

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password required' },
        { status: 400 }
      )
    }

    // 创建 Supabase 客户端
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false },
    })

    // 验证用户
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error || !data.session) {
      return NextResponse.json(
        { error: 'Authentication failed' },
        { status: 401 }
      )
    }

    // 创建响应
    const response = NextResponse.json(
      {
        success: true,
        user: {
          id: data.user?.id,
          email: data.user?.email,
        },
      },
      { status: 200 }
    )

    // 设置 httpOnly Cookie（安全传输访问令牌）
    response.cookies.set({
      name: 'auth-token',
      value: data.session.access_token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    // 设置刷新令牌（httpOnly Cookie）
    response.cookies.set({
      name: 'refresh-token',
      value: data.session.refresh_token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
