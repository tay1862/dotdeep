import type {PricingItem} from './types'
import {services} from './services'

export const allPricingItems: PricingItem[] = services.flatMap((s) => s.pricingItems)
