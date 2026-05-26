import {notFound} from 'next/navigation'

import {buildPageMetadata} from '@/app/lib/metadata'
import {getServices, getServiceBySlug} from '@/app/lib/db/services'
import ServiceDetail from '@/app/components/services/ServiceDetail'

export async function generateStaticParams() {
  const services = await getServices()
  return services.map((s) => ({slug: s.slug}))
}

export async function generateMetadata({params}: {params: Promise<{locale: string; slug: string}>}) {
  const {locale, slug} = await params
  const service = await getServiceBySlug(slug)
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
  const service = await getServiceBySlug(slug)
  if (!service) notFound()

  return <ServiceDetail service={service} locale={locale} />
}
