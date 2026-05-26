'use server'

import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'
import {supabaseAdmin} from '@/app/lib/supabase-admin'

export async function saveAboutAction(formData: FormData) {
  const tech = (formData.get('tech_stack') as string)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

  const data = {
    id: 'main',
    heading: {
      en: formData.get('heading_en') as string,
      th: formData.get('heading_th') as string,
      lo: formData.get('heading_lo') as string,
    },
    vision: {
      en: formData.get('vision_en') as string,
      th: formData.get('vision_th') as string,
      lo: formData.get('vision_lo') as string,
    },
    mission: {
      en: formData.get('mission_en') as string,
      th: formData.get('mission_th') as string,
      lo: formData.get('mission_lo') as string,
    },
    story: {
      en: formData.get('story_en') as string,
      th: formData.get('story_th') as string,
      lo: formData.get('story_lo') as string,
    },
    story_image_url: (formData.get('story_image_url') as string) || null,
    tech_stack: tech,
  }

  const {error} = await supabaseAdmin.from('about').upsert(data)
  if (error) throw new Error(error.message)

  revalidatePath('/', 'layout')
  redirect('/admin/about?saved=1')
}
