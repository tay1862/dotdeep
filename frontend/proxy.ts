import createMiddleware from 'next-intl/middleware'
import {type NextRequest, NextResponse} from 'next/server'
import {locales, defaultLocale} from './i18n/config'

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
})

export function proxy(request: NextRequest) {
  const {pathname} = request.nextUrl

  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') return NextResponse.next()
    const token = request.cookies.get('admin_session')?.value
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    return NextResponse.next()
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/admin/:path*', '/', '/(en|th|lo)/:path*'],
}
