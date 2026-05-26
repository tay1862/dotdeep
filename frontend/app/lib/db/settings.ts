import {supabase} from '@/app/lib/supabase'
import type {SiteSettings} from '@/app/data/types'
import {siteSettings as fallback} from '@/app/data/settings'

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const {data, error} = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 'main')
      .single()
    if (error || !data) return fallback
    return {
      contactEmail: data.contact_email ?? fallback.contactEmail,
      contactPhone: data.contact_phone ?? fallback.contactPhone,
      address: data.address ?? fallback.address,
      googleMapsEmbed: data.google_maps_embed ?? null,
      socialLinks: data.social_links ?? fallback.socialLinks,
    }
  } catch {
    return fallback
  }
}
