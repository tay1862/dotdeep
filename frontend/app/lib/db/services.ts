import {supabase} from '@/app/lib/supabase'
import type {Service, PricingItem} from '@/app/data/types'
import {services as fallback} from '@/app/data/services'

function mapPricingRow(row: Record<string, unknown>, serviceTitle: Service['title'], serviceSlug: string): PricingItem {
  return {
    id: row.id as string,
    name: row.name as PricingItem['name'],
    price: (row.price as number) ?? null,
    currency: (row.currency as string) ?? 'LAK',
    description: row.description as PricingItem['description'],
    features: (row.features as PricingItem['features']) ?? [],
    popular: (row.popular as boolean) ?? false,
    service: {title: serviceTitle, slug: serviceSlug},
  }
}

function mapServiceRow(row: Record<string, unknown>): Service {
  const pricingRows = (row.pricing_items as Record<string, unknown>[] | null) ?? []
  return {
    id: row.id as string,
    slug: row.slug as string,
    icon: row.icon as Service['icon'],
    title: row.title as Service['title'],
    shortDescription: row.short_description as Service['shortDescription'],
    description: row.description as Service['description'],
    features: (row.features as Service['features']) ?? [],
    pricingItems: pricingRows
      .sort((a, b) => ((a.order_index as number) ?? 0) - ((b.order_index as number) ?? 0))
      .map((p) => mapPricingRow(p, row.title as Service['title'], row.slug as string)),
  }
}

export async function getServices(): Promise<Service[]> {
  try {
    const {data, error} = await supabase
      .from('services')
      .select('*, pricing_items(*)')
      .order('order_index')
    if (error || !data?.length) return fallback
    return data.map(mapServiceRow)
  } catch {
    return fallback
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  const list = await getServices()
  return list.find((s) => s.slug === slug)
}
