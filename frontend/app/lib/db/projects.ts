import {supabase} from '@/app/lib/supabase'
import type {Project} from '@/app/data/types'
import {projects as fallback} from '@/app/data/projects'

function mapProjectRow(row: Record<string, unknown>): Project {
  return {
    id: row.id as string,
    slug: row.slug as string,
    title: row.title as Project['title'],
    description: row.description as Project['description'],
    category: row.category as Project['category'],
    coverUrl: (row.cover_url as string) ?? null,
    imageUrls: (row.image_urls as string[]) ?? [],
    client: (row.client as string) ?? null,
    techStack: (row.tech_stack as string[]) ?? [],
    projectUrl: (row.project_url as string) ?? null,
    videoUrl: (row.video_url as string) ?? null,
    featured: (row.featured as boolean) ?? false,
    completedAt: (row.completed_at as string) ?? null,
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const {data, error} = await supabase
      .from('projects')
      .select('*')
      .order('order_index')
    if (error || !data?.length) return fallback
    return data.map(mapProjectRow)
  } catch {
    return fallback
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const list = await getProjects()
  return list.find((p) => p.slug === slug)
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const list = await getProjects()
  return list.filter((p) => p.featured)
}
