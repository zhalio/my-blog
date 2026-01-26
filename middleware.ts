import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { validateAdminRequest, getAuthTokenFromRequest } from '@/lib/auth'

// 保护的路由（需要认证的路由）
const protectedRoutes = ['/admin']
// 排除的路由（不需要认证）
const excludedRoutes = ['/admin', '/admin/'] // 登录页面本身需要其他处理

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // 检查是否是受保护的路由
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  if (!isProtectedRoute) {
    return NextResponse.next()
  }

  // 跳过某些路由（如登录页面）
  if (excludedRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // 从 httpOnly Cookie 获取认证令牌
  const authToken = request.cookies.get('auth-token')?.value

  if (!authToken) {
    // 没有有效的认证 cookie，重定向到登录页面
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  // 验证令牌有效性
  const isValid = await validateAdminRequest(authToken)

  if (!isValid) {
    // 令牌无效，清除 cookie 并重定向到登录页面
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

  // 令牌有效，继续处理请求
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
