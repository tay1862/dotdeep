import Link from 'next/link'
import {deleteProjectAction, toggleFeaturedAction} from '@/app/admin/_actions/projects'
import {getProjects} from '@/app/lib/db/projects'

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">Projects</h1>
          <p className="text-zinc-400 text-sm mt-1">Manage your portfolio and featured work</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          <span>+</span> Add project
        </Link>
      </div>
      {projects.length === 0 ? (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-12 text-center">
          <p className="text-zinc-400 text-sm">No projects yet. Add your first project to showcase your work.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {projects.map((project) => (
            <div key={project.id} className="flex items-center justify-between bg-zinc-900/50 border border-zinc-800 rounded-xl px-6 py-4 hover:border-zinc-700 transition-colors">
              <div className="flex items-center gap-4">
                {project.coverUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={project.coverUrl} alt="" className="w-16 h-12 rounded-lg object-cover ring-2 ring-zinc-800" />
                ) : (
                  <div className="w-16 h-12 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-500 text-xs ring-2 ring-zinc-800">No img</div>
                )}
                <div>
                  <p className="text-white font-medium">{project.title.en}</p>
                  <p className="text-zinc-400 text-sm">{project.category} · {project.slug}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <form action={toggleFeaturedAction.bind(null, project.id, !project.featured)}>
                  <button
                    type="submit"
                    className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                      project.featured
                        ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border border-yellow-500/30'
                        : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                    }`}
                  >
                    {project.featured ? '★ Featured' : '☆ Feature'}
                  </button>
                </form>
                <Link
                  href={`/admin/projects/${project.id}`}
                  className="px-4 py-2 text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors"
                >
                  Edit
                </Link>
                <form action={deleteProjectAction.bind(null, project.id)}>
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
