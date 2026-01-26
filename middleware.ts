import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { validateAdminRequest } from '@/lib/auth'

// 保护的路由（需要认证的路由）
const protectedRoutes = ['/admin']

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  console.log('[MIDDLEWARE] Checking path:', pathname)

  // 检查是否是受保护的路由
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  if (!isProtectedRoute) {
    return NextResponse.next()
  }

  // 允许访问 /admin 登录页面（不需要认证）
  if (pathname === '/admin' || pathname === '/admin/') {
    console.log('[MIDDLEWARE] Allowing login page access')
    return NextResponse.next()
  }

  // 其他 /admin/* 路由需要认证
  console.log('[MIDDLEWARE] Checking auth for protected route:', pathname)

  // 从 httpOnly Cookie 获取认证令牌
  const authToken = request.cookies.get('auth-token')?.value

  if (!authToken) {
    console.log('[MIDDLEWARE] No auth token, redirecting to login')
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  // 验证令牌有效性
  const isValid = await validateAdminRequest(authToken)

  if (!isValid) {
    console.log('[MIDDLEWARE] Invalid token, redirecting to login')
    const response = NextResponse.redirect(new URL('/admin', request.url))
    response.cookies.set({
      name: 'auth-token',
      value: '',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    })
    return response
  }

  console.log('[MIDDLEWARE] Token valid, allowing access')
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
