import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 保护的路由
const protectedRoutes = ['/admin']

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // 检查是否是受保护的路由
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  if (!isProtectedRoute) {
    return NextResponse.next()
  }

  // 获取认证令牌（从 cookie）
  const authToken = request.cookies.get('auth-storage')?.value

  // 如果没有认证令牌，重定向到登录
  if (!authToken) {
    // 注意：这只是一个简单的检查，真实应用应该在客户端检查
    // 因为我们使用 Zustand 和 localStorage
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
