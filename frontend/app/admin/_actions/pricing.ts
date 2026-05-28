'use server'

import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'
import {supabaseAdmin} from '@/app/lib/supabase-admin'

export async function savePricingItemAction(formData: FormData) {
  const id = formData.get('id') as string
  const serviceId = formData.get('service_id') as string

  const data = {
    id: id || crypto.randomUUID(),
    service_id: serviceId,
    name: {
      en: formData.get('name_en') as string,
      th: formData.get('name_th') as string,
      lo: formData.get('name_lo') as string,
    },
    price: formData.get('price') ? parseInt(formData.get('price') as string) : null,
    currency: (formData.get('currency') as string) || 'LAK',
    description: {
      en: formData.get('description_en') as string,
      th: formData.get('description_th') as string,
      lo: formData.get('description_lo') as string,
    },
    features: [],
    popular: formData.get('popular') === 'on',
    order_index: parseInt(formData.get('order_index') as string) || 0,
  }

  const {error} = await supabaseAdmin.from('pricing_items').upsert(data)
  if (error) throw new Error(error.message)

  revalidatePath('/', 'layout')
  redirect('/admin/pricing')
}

export async function deletePricingItemAction(id: string) {
  const {error} = await supabaseAdmin.from('pricing_items').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/', 'layout')
  redirect('/admin/pricing')
}
