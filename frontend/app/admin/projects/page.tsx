import Link from 'next/link'
import {deleteProjectAction, toggleFeaturedAction} from '@/app/admin/_actions/projects'
import {getProjects} from '@/app/lib/db/projects'

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors"
        >
          + Add project
        </Link>
      </div>
      <div className="space-y-3">
        {projects.length === 0 && (
          <p className="text-zinc-500 text-sm">No projects yet.</p>
        )}
        {projects.map((project) => (
          <div key={project.id} className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4">
            <div className="flex items-center gap-4">
              {project.coverUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={project.coverUrl} alt="" className="w-14 h-10 rounded object-cover" />
              ) : (
                <div className="w-14 h-10 rounded bg-zinc-700 flex items-center justify-center text-zinc-500 text-xs">No img</div>
              )}
              <div>
                <p className="text-white font-medium text-sm">{project.title.en}</p>
                <p className="text-zinc-500 text-xs">{project.category} · {project.slug}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <form action={toggleFeaturedAction.bind(null, project.id, !project.featured)}>
                <button
                  type="submit"
                  className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                    project.featured
                      ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                      : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                  }`}
                >
                  {project.featured ? '★ Featured' : '☆ Feature'}
                </button>
              </form>
              <Link
                href={`/admin/projects/${project.id}`}
                className="px-3 py-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-md transition-colors"
              >
                Edit
              </Link>
              <form action={deleteProjectAction.bind(null, project.id)}>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs bg-red-900/40 hover:bg-red-900/70 text-red-400 rounded-md transition-colors"
                  onClick={(e) => {if (!confirm('Delete this project?')) e.preventDefault()}}
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
