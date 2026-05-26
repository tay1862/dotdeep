import {getTranslations} from 'next-intl/server'

import {buildPageMetadata} from '@/app/lib/metadata'
import {buildBreadcrumbJsonLd} from '@/app/lib/structured-data'
import {sanityFetch} from '@/sanity/lib/live'
import {aboutPageQuery, allTeamQuery} from '@/sanity/lib/queries'
import AboutContent from '@/app/components/about/AboutContent'

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'about'})
  return buildPageMetadata({
    locale,
    pathname: '/about',
    title: `${t('title')} — DotDeep Design`,
    description: t('description'),
  })
}

export default async function AboutPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params
  const t = await getTranslations({locale, namespace: 'about'})
  const [{data: about}, {data: team}] = await Promise.all([
    sanityFetch({query: aboutPageQuery}),
    sanityFetch({query: allTeamQuery}),
  ])

  const breadcrumb = buildBreadcrumbJsonLd(
    [{name: 'Home', path: '/'}, {name: t('title'), path: '/about'}],
    locale,
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(breadcrumb)}} />
      <AboutContent about={about} team={team || []} locale={locale} />
    </>
  )
}
