'use server'

import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'
import {supabaseAdmin} from '@/app/lib/supabase-admin'

export async function saveTeamMemberAction(formData: FormData) {
  const id = formData.get('id') as string
  const data = {
    id: id || crypto.randomUUID(),
    first_name: formData.get('first_name') as string,
    last_name: formData.get('last_name') as string,
    picture_url: (formData.get('picture_url') as string) || null,
    role: {
      en: formData.get('role_en') as string,
      th: formData.get('role_th') as string,
      lo: formData.get('role_lo') as string,
    },
    bio: {
      en: formData.get('bio_en') as string,
      th: formData.get('bio_th') as string,
      lo: formData.get('bio_lo') as string,
    },
    social_links: {
      facebook: (formData.get('facebook') as string) || null,
      instagram: (formData.get('instagram') as string) || null,
      linkedin: (formData.get('linkedin') as string) || null,
      tiktok: (formData.get('tiktok') as string) || null,
      whatsapp: (formData.get('whatsapp') as string) || null,
      line: (formData.get('line') as string) || null,
    },
    order_index: parseInt(formData.get('order_index') as string) || 0,
  }

  const {error} = await supabaseAdmin.from('team_members').upsert(data)
  if (error) throw new Error(error.message)

  revalidatePath('/', 'layout')
  redirect('/admin/team')
}

export async function deleteTeamMemberAction(id: string) {
  const {error} = await supabaseAdmin.from('team_members').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/', 'layout')
  redirect('/admin/team')
}
