/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import {deleteTeamMemberAction} from '@/app/admin/_actions/team'
import {getTeam} from '@/app/lib/db/team'

export default async function TeamPage() {
  const team = await getTeam()

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">Team Members</h1>
          <p className="text-zinc-400 text-sm mt-1">Manage your team profiles and roles</p>
        </div>
        <Link
          href="/admin/team/new"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          <span>+</span> Add member
        </Link>
      </div>
      {team.length === 0 ? (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-12 text-center">
          <p className="text-zinc-400 text-sm">No team members yet. Add your first team member to get started.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {team.map((member) => (
            <div key={member.id} className="flex items-center justify-between bg-zinc-900/50 border border-zinc-800 rounded-xl px-6 py-4 hover:border-zinc-700 transition-colors">
              <div className="flex items-center gap-4">
                {member.pictureUrl ? (
                  <img src={member.pictureUrl} alt="" className="w-12 h-12 rounded-full object-cover ring-2 ring-zinc-800" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 text-base font-semibold ring-2 ring-zinc-800">
                    {member.firstName[0]}
                  </div>
                )}
                <div>
                  <p className="text-white font-medium">{member.firstName} {member.lastName}</p>
                  <p className="text-zinc-400 text-sm">{member.role.en}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/team/${member.id}`}
                  className="px-4 py-2 text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors"
                >
                  Edit
                </Link>
                <form action={deleteTeamMemberAction.bind(null, member.id)}>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm bg-red-900/20 hover:bg-red-900/30 text-red-400 rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
