import {getSiteOrigin} from '@/app/lib/urls'

type JsonLd = Record<string, unknown>

export function buildBreadcrumbJsonLd(
  items: {name: string; path: string}[],
  locale: string,
): JsonLd {
  const siteUrl = getSiteOrigin()

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}/${locale}${item.path === '/' ? '' : item.path}`,
    })),
  }
}

export function buildServiceJsonLd(services: {name: string; description?: string; slug?: string}[], locale: string): JsonLd {
  const siteUrl = getSiteOrigin()

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Services',
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.name,
        description: service.description || undefined,
        url: service.slug ? `${siteUrl}/${locale}/services/${service.slug}` : undefined,
        provider: {
          '@type': 'Organization',
          name: 'DotDeep Design',
        },
      },
    })),
  }
}

export function buildLocalBusinessJsonLd(settings?: {
  email?: string | null
  phone?: string | null
  address?: string | null
} | null): JsonLd {
  const siteUrl = getSiteOrigin()

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/#business`,
    name: 'DotDeep Design',
    url: siteUrl,
    email: settings?.email || undefined,
    telephone: settings?.phone || undefined,
    address: settings?.address
      ? {
          '@type': 'PostalAddress',
          addressLocality: 'Vientiane',
          addressCountry: 'LA',
          streetAddress: settings.address,
        }
      : {
          '@type': 'PostalAddress',
          addressLocality: 'Vientiane',
          addressCountry: 'LA',
        },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 17.9757,
      longitude: 102.6331,
    },
    areaServed: [
      {
        '@type': 'Country',
        name: 'Laos',
      },
      {
        '@type': 'Country',
        name: 'Thailand',
      },
      {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: 17.9757,
          longitude: 102.6331,
        },
        geoRadius: '500000',
      },
    ],
    priceRange: '$$',
    image: `${siteUrl}/icon.png`,
    sameAs: [],
  }
}

export function buildFAQJsonLd(faqs: {question: string; answer: string}[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function buildProjectJsonLd(project: {
  name: string
  description?: string
  image?: string
  url?: string
  datePublished?: string
  category?: string
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    description: project.description || undefined,
    image: project.image || undefined,
    url: project.url || undefined,
    datePublished: project.datePublished || undefined,
    genre: project.category || undefined,
    creator: {
      '@type': 'Organization',
      name: 'DotDeep Design',
    },
  }
}
