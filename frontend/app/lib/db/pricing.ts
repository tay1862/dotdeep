import type {PricingItem} from '@/app/data/types'
import {getServices} from './services'

export async function getAllPricingItems(): Promise<PricingItem[]> {
  const services = await getServices()
  return services.flatMap((s) => s.pricingItems)
}
