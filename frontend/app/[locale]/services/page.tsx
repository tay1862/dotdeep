import {getTranslations} from 'next-intl/server'

import {buildPageMetadata} from '@/app/lib/metadata'
import {buildBreadcrumbJsonLd} from '@/app/lib/structured-data'
import {sanityFetch} from '@/sanity/lib/live'
import {allServicesQuery} from '@/sanity/lib/queries'
import ServicesList from '@/app/components/services/ServicesList'

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'services'})
  return buildPageMetadata({
    locale,
    pathname: '/services',
    title: `${t('title')} — DotDeep Design`,
    description: t('subtitle'),
  })
}

export default async function ServicesPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'services'})
  const {data: services} = await sanityFetch({query: allServicesQuery})

  const breadcrumb = buildBreadcrumbJsonLd(
    [{name: 'Home', path: '/'}, {name: t('title'), path: '/services'}],
    locale,
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(breadcrumb)}} />
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <ServicesList services={services || []} locale={locale} />
        </div>
      </section>
    </>
  )
}
