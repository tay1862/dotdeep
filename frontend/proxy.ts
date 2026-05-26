import createIntlMiddleware from 'next-intl/middleware'
import {createServerClient} from '@supabase/ssr'
import {type NextRequest, NextResponse} from 'next/server'
import {locales, defaultLocale} from './i18n/config'

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
})

export async function proxy(request: NextRequest) {
  const {pathname} = request.nextUrl

  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') return NextResponse.next()

    let response = NextResponse.next({request})

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({name, value}) => request.cookies.set(name, value))
            response = NextResponse.next({request})
            cookiesToSet.forEach(({name, value, options}) =>
              response.cookies.set(name, value, options),
            )
          },
        },
      },
    )

    const {data: {user}} = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    return response
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/admin/:path*', '/', '/(en|th|lo)/:path*'],
}
