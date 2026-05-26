import {getTranslations} from 'next-intl/server'

import {buildPageMetadata} from '@/app/lib/metadata'
import {buildBreadcrumbJsonLd} from '@/app/lib/structured-data'
import {projects} from '@/app/data/projects'
import GalleryGrid from '@/app/components/gallery/GalleryGrid'

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'gallery'})
  return buildPageMetadata({
    locale,
    pathname: '/gallery',
    title: `${t('title')} — DotDeep Design`,
    description: t('description'),
  })
}

export default async function GalleryPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'gallery'})

  const breadcrumb = buildBreadcrumbJsonLd(
    [{name: 'Home', path: '/'}, {name: t('title'), path: '/gallery'}],
    locale,
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(breadcrumb)}} />
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <GalleryGrid projects={projects} locale={locale} />
        </div>
      </section>
    </>
  )
}
