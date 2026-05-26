'use server'

import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'
import {supabaseAdmin} from '@/app/lib/supabase-admin'

export async function saveSettingsAction(formData: FormData) {
  const data = {
    id: 'main',
    contact_email: (formData.get('contact_email') as string) || null,
    contact_phone: (formData.get('contact_phone') as string) || null,
    address: null,
    social_links: {
      facebook: (formData.get('facebook') as string) || null,
      instagram: (formData.get('instagram') as string) || null,
      tiktok: (formData.get('tiktok') as string) || null,
      whatsapp: (formData.get('whatsapp') as string) || null,
      line: (formData.get('line') as string) || null,
      linkedin: (formData.get('linkedin') as string) || null,
    },
  }

  const {error} = await supabaseAdmin.from('site_settings').upsert(data)
  if (error) throw new Error(error.message)

  revalidatePath('/', 'layout')
  redirect('/admin/settings?saved=1')
}
