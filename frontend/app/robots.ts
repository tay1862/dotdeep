import {MetadataRoute} from 'next'
import {getSiteOrigin} from '@/app/lib/urls'

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteOrigin()

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/studio/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/draft-mode/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/draft-mode/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
