import {MetadataRoute} from 'next'

import {getSiteOrigin} from '@/app/lib/urls'
import {locales} from '@/i18n/config'
import {services} from '@/app/data/services'
import {projects} from '@/app/data/projects'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['/', '/about', '/services', '/gallery', '/pricing', '/team', '/contact'] as const
  const result: MetadataRoute.Sitemap = []
  const siteUrl = getSiteOrigin()

  for (const locale of locales) {
    for (const route of staticRoutes) {
      const localizedPath = route === '/' ? `/${locale}` : `/${locale}${route}`
      result.push({
        url: `${siteUrl}${localizedPath}`,
        lastModified: new Date(),
        priority: route === '/' ? (locale === 'en' ? 1 : 0.9) : 0.8,
        changeFrequency: route === '/' ? 'weekly' : 'monthly',
      })
    }

    for (const s of services) {
      result.push({
        url: `${siteUrl}/${locale}/services/${s.slug}`,
        priority: 0.7,
        changeFrequency: 'monthly',
      })
    }

    for (const p of projects) {
      result.push({
        url: `${siteUrl}/${locale}/gallery/${p.slug}`,
        priority: 0.7,
        changeFrequency: 'monthly',
      })
    }
  }

  return result
}
