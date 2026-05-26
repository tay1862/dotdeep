import {getTranslations} from 'next-intl/server'

import {buildPageMetadata} from '@/app/lib/metadata'
import {buildServiceJsonLd, buildLocalBusinessJsonLd} from '@/app/lib/structured-data'
import {getServices} from '@/app/lib/db/services'
import {getFeaturedProjects} from '@/app/lib/db/projects'
import {getSiteSettings} from '@/app/lib/db/settings'
import HeroSection from '@/app/components/home/HeroSection'
import FeaturedProjects from '@/app/components/home/FeaturedProjects'
import ServicesSummary from '@/app/components/home/ServicesSummary'
import QuoteSection from '@/app/components/home/QuoteSection'
import CTASection from '@/app/components/home/CTASection'

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'hero'})
  return buildPageMetadata({
    locale,
    pathname: '/',
    title: `DotDeep Design — ${t('tagline')}`,
    description: t('subtitle'),
  })
}

export default async function HomePage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params
  const l = locale as 'en' | 'th' | 'lo'

  const [services, featuredProjects, siteSettings] = await Promise.all([
    getServices(),
    getFeaturedProjects(),
    getSiteSettings(),
  ])

  const serviceList = services.map((s) => ({
    name: s.title[l],
    description: s.shortDescription[l],
    slug: s.slug,
  }))

  const serviceJsonLd = buildServiceJsonLd(serviceList, locale)
  const businessJsonLd = buildLocalBusinessJsonLd({
    email: siteSettings.contactEmail,
    phone: siteSettings.contactPhone,
    address: siteSettings.address?.[l] ?? undefined,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(businessJsonLd)}}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(serviceJsonLd)}}
      />
      <HeroSection data={null} locale={locale} />
      {featuredProjects.length > 0 && (
        <FeaturedProjects projects={featuredProjects} locale={locale} />
      )}
      {services.length > 0 && (
        <ServicesSummary services={services} locale={locale} />
      )}
      <QuoteSection locale={locale} />
      <CTASection data={null} locale={locale} />
    </>
  )
}
