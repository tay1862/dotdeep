import {notFound} from 'next/navigation'

import {buildPageMetadata} from '@/app/lib/metadata'
import {services} from '@/app/data/services'
import ServiceDetail from '@/app/components/services/ServiceDetail'

export function generateStaticParams() {
  return services.map((s) => ({slug: s.slug}))
}

export async function generateMetadata({params}: {params: Promise<{locale: string; slug: string}>}) {
  const {locale, slug} = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) return {}
  const l = locale as 'en' | 'th' | 'lo'

  return buildPageMetadata({
    locale,
    pathname: `/services/${slug}`,
    title: `${service.title[l]} — DotDeep Design`,
    description: service.shortDescription[l],
  })
}

export default async function ServicePage({params}: {params: Promise<{locale: string; slug: string}>}) {
  const {locale, slug} = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) notFound()

  return <ServiceDetail service={service} locale={locale} />
}
