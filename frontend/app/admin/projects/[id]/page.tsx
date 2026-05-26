import {notFound} from 'next/navigation'
import {saveProjectAction} from '@/app/admin/_actions/projects'
import {Field, Section, LocalizedFields} from '@/app/admin/_components/FormField'
import {SubmitButton} from '@/app/admin/_components/SubmitButton'
import {getProjects} from '@/app/lib/db/projects'

const CATEGORIES = ['graphic-design', 'web-development', 'ui-ux', 'video', 'branding', 'other']

export default async function ProjectFormPage({params}: {params: Promise<{id: string}>}) {
  const {id} = await params
  const isNew = id === 'new'
  let project = null

  if (!isNew) {
    const projects = await getProjects()
    project = projects.find((p) => p.id === id)
    if (!project) notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">{isNew ? 'Add Project' : 'Edit Project'}</h1>
      <form action={saveProjectAction} className="space-y-6">
        <input type="hidden" name="id" value={isNew ? '' : project?.id} />
        <Section title="Basic Info">
          <Field label="Slug (URL)" name="slug" defaultValue={project?.slug} required placeholder="my-project-name" />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Category<span className="text-red-400 ml-0.5">*</span></label>
              <select
                name="category"
                defaultValue={project?.category ?? 'graphic-design'}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <Field label="Order Index" name="order_index" type="number" defaultValue={String(0)} />
          </div>
          <Field label="Cover Image URL" name="cover_url" defaultValue={project?.coverUrl} placeholder="https://..." />
          <Field label="Client" name="client" defaultValue={project?.client} placeholder="Client name" />
          <Field label="Project URL" name="project_url" defaultValue={project?.projectUrl} placeholder="https://..." />
          <Field label="Video URL" name="video_url" defaultValue={project?.videoUrl} placeholder="https://youtube.com/..." />
          <Field label="Completed Date" name="completed_at" type="date" defaultValue={project?.completedAt ?? ''} />
          <Field label="Tech Stack (comma separated)" name="tech_stack" defaultValue={project?.techStack?.join(', ')} placeholder="Figma, React, ..." />
          <div className="flex items-center gap-2">
            <input type="checkbox" name="featured" id="featured" defaultChecked={project?.featured} className="accent-blue-500" />
            <label htmlFor="featured" className="text-sm text-zinc-300">Featured project (shown on homepage)</label>
          </div>
        </Section>
        <Section title="Title">
          <LocalizedFields prefix="title" label="Title" defaultValues={project?.title} />
        </Section>
        <Section title="Description">
          <LocalizedFields prefix="description" label="Description" defaultValues={project?.description} textarea rows={4} />
        </Section>
        <SubmitButton label={isNew ? 'Add project' : 'Save changes'} />
      </form>
    </div>
  )
}
