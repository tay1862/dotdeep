import {getTranslations} from 'next-intl/server'

import {buildPageMetadata} from '@/app/lib/metadata'
import {buildBreadcrumbJsonLd} from '@/app/lib/structured-data'
import {getAllPricingItems} from '@/app/lib/db/pricing'
import PricingGrid from '@/app/components/pricing/PricingGrid'

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'pricing'})
  return buildPageMetadata({
    locale,
    pathname: '/pricing',
    title: `${t('title')} — DotDeep Design`,
    description: t('subtitle'),
  })
}

export default async function PricingPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'pricing'})
  const allPricingItems = await getAllPricingItems()

  const breadcrumb = buildBreadcrumbJsonLd(
    [{name: 'Home', path: '/'}, {name: t('title'), path: '/pricing'}],
    locale,
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(breadcrumb)}} />
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <PricingGrid items={allPricingItems} locale={locale} />
        </div>
      </section>
    </>
  )
}
