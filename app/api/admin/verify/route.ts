import { NextRequest, NextResponse } from 'next/server'
import { validateAdminRequest, getAuthTokenFromRequest } from '@/lib/auth'

/**
 * POST - 验证管理员密码
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password } = body

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      )
    }

    // 验证密码
    const isValid = await validateAdminRequest(password)
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }

    return NextResponse.json({ success: true, message: '密码正确' })
  } catch (error) {
    console.error('Error in POST /api/admin/verify:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
