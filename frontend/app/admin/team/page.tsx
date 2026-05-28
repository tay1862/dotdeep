/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import {deleteTeamMemberAction} from '@/app/admin/_actions/team'
import {getTeam} from '@/app/lib/db/team'

export default async function TeamPage() {
  const team = await getTeam()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Team Members</h1>
        <Link
          href="/admin/team/new"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors"
        >
          + Add member
        </Link>
      </div>
      <div className="space-y-3">
        {team.length === 0 && (
          <p className="text-zinc-500 text-sm">No team members yet.</p>
        )}
        {team.map((member) => (
          <div key={member.id} className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4">
            <div className="flex items-center gap-4">
              {member.pictureUrl ? (
                <img src={member.pictureUrl} alt="" className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center text-zinc-400 text-sm font-medium">
                  {member.firstName[0]}
                </div>
              )}
              <div>
                <p className="text-white font-medium text-sm">{member.firstName} {member.lastName}</p>
                <p className="text-zinc-400 text-xs">{member.role.en}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/admin/team/${member.id}`}
                className="px-3 py-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-md transition-colors"
              >
                Edit
              </Link>
              <form action={deleteTeamMemberAction.bind(null, member.id)}>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs bg-red-900/40 hover:bg-red-900/70 text-red-400 rounded-md transition-colors"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
