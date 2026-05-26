'use server'

import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'
import {supabaseAdmin} from '@/app/lib/supabase-admin'

export async function saveProjectAction(formData: FormData) {
  const id = formData.get('id') as string
  const techStack = (formData.get('tech_stack') as string)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

  const data = {
    id: id || crypto.randomUUID(),
    slug: formData.get('slug') as string,
    title: {
      en: formData.get('title_en') as string,
      th: formData.get('title_th') as string,
      lo: formData.get('title_lo') as string,
    },
    description: {
      en: formData.get('description_en') as string,
      th: formData.get('description_th') as string,
      lo: formData.get('description_lo') as string,
    },
    category: formData.get('category') as string,
    cover_url: (formData.get('cover_url') as string) || null,
    client: (formData.get('client') as string) || null,
    tech_stack: techStack,
    project_url: (formData.get('project_url') as string) || null,
    video_url: (formData.get('video_url') as string) || null,
    featured: formData.get('featured') === 'on',
    completed_at: (formData.get('completed_at') as string) || null,
    order_index: parseInt(formData.get('order_index') as string) || 0,
    image_urls: [],
  }

  const {error} = await supabaseAdmin.from('projects').upsert(data)
  if (error) throw new Error(error.message)

  revalidatePath('/', 'layout')
  redirect('/admin/projects')
}

export async function deleteProjectAction(id: string) {
  const {error} = await supabaseAdmin.from('projects').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/', 'layout')
}

export async function toggleFeaturedAction(id: string, featured: boolean) {
  const {error} = await supabaseAdmin.from('projects').update({featured}).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/', 'layout')
}
