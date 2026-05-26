import {notFound} from 'next/navigation'

import {buildPageMetadata} from '@/app/lib/metadata'
import {projects, getProjectBySlug} from '@/app/data/projects'
import ProjectDetail from '@/app/components/gallery/ProjectDetail'

export function generateStaticParams() {
  return projects.map((p) => ({slug: p.slug}))
}

export async function generateMetadata({params}: {params: Promise<{locale: string; slug: string}>}) {
  const {locale, slug} = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  const l = locale as 'en' | 'th' | 'lo'

  return buildPageMetadata({
    locale,
    pathname: `/gallery/${slug}`,
    title: `${project.title[l]} — DotDeep Design`,
    description: project.description[l],
  })
}

export default async function ProjectPage({params}: {params: Promise<{locale: string; slug: string}>}) {
  const {locale, slug} = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  return <ProjectDetail project={project} locale={locale} />
}
