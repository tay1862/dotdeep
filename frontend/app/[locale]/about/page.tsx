import {getTranslations} from 'next-intl/server'

import {buildPageMetadata} from '@/app/lib/metadata'
import {buildBreadcrumbJsonLd} from '@/app/lib/structured-data'
import {aboutData} from '@/app/data/about'
import {team} from '@/app/data/team'
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

  const breadcrumb = buildBreadcrumbJsonLd(
    [{name: 'Home', path: '/'}, {name: t('title'), path: '/about'}],
    locale,
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(breadcrumb)}} />
      <AboutContent about={aboutData} team={team} locale={locale} />
    </>
  )
}
