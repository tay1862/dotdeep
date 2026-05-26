export interface LocalizedString {
  en: string
  th: string
  lo: string
}

export type Locale = 'en' | 'th' | 'lo'

export function loc(s: LocalizedString | undefined | null, locale: string): string {
  if (!s) return ''
  return s[locale as Locale] || s.en || ''
}

export interface PricingItem {
  id: string
  name: LocalizedString
  price: number | null
  currency: string
  description: LocalizedString
  features: LocalizedString[]
  popular: boolean
  service: {
    title: LocalizedString
    slug: string
  }
}

export interface Service {
  id: string
  slug: string
  title: LocalizedString
  shortDescription: LocalizedString
  description: LocalizedString
  icon: 'palette' | 'code' | 'layout' | 'video'
  features: LocalizedString[]
  pricingItems: PricingItem[]
}

export interface Project {
  id: string
  slug: string
  title: LocalizedString
  description: LocalizedString
  category: 'graphic' | 'web' | 'uiux' | 'video'
  coverUrl: string | null
  imageUrls: string[]
  client: string | null
  techStack: string[]
  projectUrl: string | null
  videoUrl: string | null
  featured: boolean
  completedAt: string | null
}

export interface TeamMember {
  id: string
  firstName: string
  lastName: string
  pictureUrl: string | null
  role: LocalizedString
  bio: LocalizedString
  socialLinks: {
    facebook: string | null
    instagram: string | null
    linkedin: string | null
    tiktok: string | null
    whatsapp: string | null
    line: string | null
  }
}

export interface AboutData {
  heading: LocalizedString
  vision: LocalizedString
  mission: LocalizedString
  story: LocalizedString
  storyImageUrl: string | null
  techStack: string[]
}

export interface SiteSettings {
  contactEmail: string | null
  contactPhone: string | null
  address: LocalizedString | null
  googleMapsEmbed: string | null
  socialLinks: {
    facebook: string | null
    instagram: string | null
    tiktok: string | null
    whatsapp: string | null
    line: string | null
    linkedin: string | null
  }
}
