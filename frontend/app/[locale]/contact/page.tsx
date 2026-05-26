import {getTranslations} from 'next-intl/server'

import {buildPageMetadata} from '@/app/lib/metadata'
import {buildBreadcrumbJsonLd} from '@/app/lib/structured-data'
import {getSiteSettings} from '@/app/lib/db/settings'
import ContactForm from '@/app/components/contact/ContactForm'

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'contact'})
  return buildPageMetadata({
    locale,
    pathname: '/contact',
    title: `${t('title')} — DotDeep Design`,
    description: t('subtitle'),
  })
}

export default async function ContactPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'contact'})
  const siteSettings = await getSiteSettings()
  const breadcrumb = buildBreadcrumbJsonLd(
    [{name: 'Home', path: '/'}, {name: t('title'), path: '/contact'}],
    locale,
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(breadcrumb)}} />
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <ContactForm locale={locale} settings={siteSettings} />
        </div>
      </section>
    </>
  )
}
