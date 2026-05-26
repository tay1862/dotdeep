'use server'

import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'
import {supabaseAdmin} from '@/app/lib/supabase-admin'

export async function saveServiceAction(formData: FormData) {
  const id = formData.get('id') as string
  const featuresRaw = formData.get('features') as string

  let features: unknown[] = []
  try {
    features = JSON.parse(featuresRaw)
  } catch {
    features = featuresRaw
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((en) => ({en, th: en, lo: en}))
  }

  const data = {
    id: id || crypto.randomUUID(),
    slug: formData.get('slug') as string,
    icon: (formData.get('icon') as string) || 'code',
    title: {
      en: formData.get('title_en') as string,
      th: formData.get('title_th') as string,
      lo: formData.get('title_lo') as string,
    },
    short_description: {
      en: formData.get('short_description_en') as string,
      th: formData.get('short_description_th') as string,
      lo: formData.get('short_description_lo') as string,
    },
    description: {
      en: formData.get('description_en') as string,
      th: formData.get('description_th') as string,
      lo: formData.get('description_lo') as string,
    },
    features,
    order_index: parseInt(formData.get('order_index') as string) || 0,
  }

  const {error} = await supabaseAdmin.from('services').upsert(data)
  if (error) throw new Error(error.message)

  revalidatePath('/', 'layout')
  redirect('/admin/services')
}

export async function deleteServiceAction(id: string) {
  const {error} = await supabaseAdmin.from('services').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/', 'layout')
}
