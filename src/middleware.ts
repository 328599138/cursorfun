import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { defaultLocale, locales } from "@/lib/i18n"

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // 检查路径是否已经包含语言前缀
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // 重定向到默认语言
  const locale = defaultLocale

  // 例如: incoming request /about
  // 新的 URL: /en/about
  return NextResponse.redirect(
    new URL(
      `/${locale}${pathname === "/" ? "" : pathname}`,
      request.url
    )
  )
}

export const config = {
  // 匹配所有路径除了 public 文件和 api 路由
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
} 