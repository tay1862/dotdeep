import {NextIntlClientProvider, hasLocale} from 'next-intl'
import {notFound} from 'next/navigation'
import {Toaster} from 'sonner'

import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import FloatingButtons from '@/app/components/FloatingButtons'
import CustomCursor from '@/app/components/CustomCursor'
import {locales} from '@/i18n/config'
import {getSiteSettings} from '@/app/lib/db/settings'

export function generateStaticParams() {
  return locales.map((locale) => ({locale}))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{locale: string}>
}) {
  const {locale} = await params
  if (!hasLocale(locales, locale)) notFound()

  const [messages, settings] = await Promise.all([
    import(`@/i18n/messages/${locale}.json`).then((m) => m.default),
    getSiteSettings(),
  ])

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div data-locale={locale} className="min-h-screen flex flex-col grain-overlay">
        <CustomCursor />
        <Toaster />
        <Header locale={locale} />
        <main className="flex-1 pt-20">{children}</main>
        <Footer locale={locale} settings={settings} />
        <FloatingButtons settings={settings} />
      </div>
    </NextIntlClientProvider>
  )
}
