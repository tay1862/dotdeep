import {supabase} from '@/app/lib/supabase'
import type {AboutData} from '@/app/data/types'
import {aboutData as fallback} from '@/app/data/about'

export async function getAboutData(): Promise<AboutData> {
  try {
    const {data, error} = await supabase
      .from('about')
      .select('*')
      .eq('id', 'main')
      .single()
    if (error || !data) return fallback
    return {
      heading: data.heading,
      vision: data.vision,
      mission: data.mission,
      story: data.story,
      storyImageUrl: data.story_image_url ?? null,
      techStack: data.tech_stack ?? [],
    }
  } catch {
    return fallback
  }
}
