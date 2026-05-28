import createIntlMiddleware from 'next-intl/middleware'
import {type NextRequest, NextResponse} from 'next/server'
import {locales, defaultLocale} from './i18n/config'

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
})

export function proxy(request: NextRequest) {
  const {pathname} = request.nextUrl

  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') {
      // Tell the layout this is the public login page — skips auth redirect
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set('x-admin-is-login', '1')
      return NextResponse.next({request: {headers: requestHeaders}})
    }

    // Check for any Supabase auth session cookie (full verification in admin layout)
    const hasSession = request.cookies.getAll().some(
      (c) => c.name.startsWith('sb-') && c.name.endsWith('-auth-token'),
    )
    if (!hasSession) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    return NextResponse.next()
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!_next|_vercel|api|.*\\..*).*)'],
}
