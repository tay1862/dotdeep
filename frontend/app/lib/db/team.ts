import {supabase} from '@/app/lib/supabase'
import type {TeamMember} from '@/app/data/types'
import {team as fallback} from '@/app/data/team'

function mapTeamRow(row: Record<string, unknown>): TeamMember {
  return {
    id: row.id as string,
    firstName: row.first_name as string,
    lastName: row.last_name as string,
    pictureUrl: (row.picture_url as string) ?? null,
    role: row.role as TeamMember['role'],
    bio: row.bio as TeamMember['bio'],
    socialLinks: (row.social_links as TeamMember['socialLinks']) ?? {
      facebook: null,
      instagram: null,
      linkedin: null,
      tiktok: null,
      whatsapp: null,
      line: null,
    },
  }
}

export async function getTeam(): Promise<TeamMember[]> {
  try {
    const {data, error} = await supabase
      .from('team_members')
      .select('*')
      .order('order_index')
    if (error || !data?.length) return fallback
    return data.map(mapTeamRow)
  } catch {
    return fallback
  }
}
