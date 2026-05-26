import './globals.css'

import {SpeedInsights} from '@vercel/speed-insights/next'
import type {Metadata} from 'next'
import Script from 'next/script'
import localFont from 'next/font/local'
import {Noto_Sans_Lao, Noto_Sans_Thai} from 'next/font/google'
import {getLocale} from 'next-intl/server'

import {buildRootRedirectAlternates} from '@/app/lib/metadata'
import {getSiteOrigin, sanitizeExternalUrl} from '@/app/lib/urls'
import {siteSettings} from '@/app/data/settings'

/**
 * Generate metadata for the page.
 */
const SITE_TITLE = 'DotDeep Design'
const SITE_DESCRIPTION = 'Creative design studio in Vientiane — Graphic Design, Web Development, UI/UX, and Video Production.'

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = getSiteOrigin()
  let metadataBase: URL | undefined = undefined
  try {
    metadataBase = siteUrl ? new URL(siteUrl) : undefined
  } catch {
    // ignore
  }
  return {
    metadataBase,
    title: {
      template: `%s | ${SITE_TITLE}`,
      default: SITE_TITLE,
    },
    description: SITE_DESCRIPTION,
    applicationName: SITE_TITLE,
    alternates: buildRootRedirectAlternates('/'),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: [
        {url: '/icon.png', type: 'image/png', sizes: '512x512'},
        {url: '/icon.png', type: 'image/png', sizes: '192x192'},
      ],
      shortcut: ['/icon.png'],
      apple: [{url: '/apple-icon.png', sizes: '180x180'}],
    },
    keywords: [
      'DotDeep Design',
      'DotDeep',
      'design studio',
      'design studio Laos',
      'web development Laos',
      'graphic design Vientiane',
      'UI UX design',
      'ອອກແບບ',
      'ພັດທະນາເວັບ',
      'ອອກແບບກຣາບຟິກ',
      'ออกแบบเว็บไซต์',
      'ออกแบบกราฟิก ลาว',
      'web design Southeast Asia',
      'branding agency Laos',
      'Vientiane',
      'ວຽງຈັນ',
    ],
    openGraph: {
      type: 'website',
      siteName: SITE_TITLE,
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      url: siteUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
    },
  }
}

/* ===== Fonts ===== */

// Display font: General Sans (self-hosted)
const generalSans = localFont({
  src: [
    {path: '../public/fonts/GeneralSans-Medium.woff2', weight: '500', style: 'normal'},
    {path: '../public/fonts/GeneralSans-Semibold.woff2', weight: '600', style: 'normal'},
    {path: '../public/fonts/GeneralSans-Bold.woff2', weight: '700', style: 'normal'},
  ],
  variable: '--font-display',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
})

// Body font: Satoshi (self-hosted)
const satoshi = localFont({
  src: [
    {path: '../public/fonts/Satoshi-Regular.woff2', weight: '400', style: 'normal'},
    {path: '../public/fonts/Satoshi-Medium.woff2', weight: '500', style: 'normal'},
    {path: '../public/fonts/Satoshi-Bold.woff2', weight: '700', style: 'normal'},
  ],
  variable: '--font-body',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
})

// Lao font: Hinsiew
const hinsiew = localFont({
  src: [
    {path: '../public/fonts/Hinsiew-Regular.otf', weight: '400', style: 'normal'},
    {path: '../public/fonts/Hinsiew-Bold.otf', weight: '700', style: 'normal'},
    {path: '../public/fonts/Hinsiew-SemiBoldItalic.otf', weight: '600', style: 'italic'},
  ],
  variable: '--font-hinsiew',
  display: 'swap',
})

// Thai font: Noto Sans Thai
const notoSansThai = Noto_Sans_Thai({
  variable: '--font-noto-thai',
  subsets: ['thai'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const notoSansLao = Noto_Sans_Lao({
  variable: '--font-noto-lao',
  subsets: ['lao'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const locale = await getLocale()
  const siteUrl = getSiteOrigin()
  const sameAs = [
    siteSettings.socialLinks.facebook,
    siteSettings.socialLinks.instagram,
    siteSettings.socialLinks.tiktok,
    siteSettings.socialLinks.linkedin,
  ].flatMap((value) => {
    const url = sanitizeExternalUrl(value)
    return url ? [url] : []
  })
  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: SITE_TITLE,
        url: siteUrl,
        description: SITE_DESCRIPTION,
        email: siteSettings.contactEmail || undefined,
        telephone: siteSettings.contactPhone || undefined,
        sameAs: sameAs.length ? sameAs : undefined,
      },
      {
        '@type': 'WebSite',
        name: SITE_TITLE,
        url: siteUrl,
        inLanguage: ['en', 'th', 'lo'],
      },
    ],
  }

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${generalSans.variable} ${satoshi.variable} ${hinsiew.variable} ${notoSansThai.variable} ${notoSansLao.variable}`}
    >
      <head>
        <Script src="/theme.js" strategy="beforeInteractive" />
        <meta name="geo.region" content="LA-VT" />
        <meta name="geo.placename" content="Vientiane" />
        <meta name="geo.position" content="17.9757;102.6331" />
        <meta name="ICBM" content="17.9757, 102.6331" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(schemaGraph)}}
        />
      </head>
      <body className="bg-surface text-on-surface font-body antialiased">
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
