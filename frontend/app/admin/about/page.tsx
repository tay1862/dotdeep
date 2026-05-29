import {saveAboutAction} from '@/app/admin/_actions/about'
import {Field, Section, LocalizedFields} from '@/app/admin/_components/FormField'
import {SubmitButton} from '@/app/admin/_components/SubmitButton'
import {getAboutData} from '@/app/lib/db/about'

export default async function AboutPage({searchParams}: {searchParams: Promise<{saved?: string}>}) {
  const [about, sp] = await Promise.all([getAboutData(), searchParams])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-white tracking-tight">About Page</h1>
        <p className="text-zinc-400 text-sm mt-1">Edit your company story and tech stack</p>
      </div>
      {sp.saved && (
        <div className="flex items-center gap-2 px-4 py-3 bg-green-500/10 border border-green-500/20 rounded-lg">
          <span className="text-green-400 text-sm font-medium">✓ About page saved successfully</span>
        </div>
      )}
      <form action={saveAboutAction} className="space-y-6">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <Section title="Heading">
            <LocalizedFields prefix="heading" label="Heading" defaultValues={about.heading} />
          </Section>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <Section title="Vision">
            <LocalizedFields prefix="vision" label="Vision" defaultValues={about.vision} textarea rows={3} />
          </Section>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <Section title="Mission">
            <LocalizedFields prefix="mission" label="Mission" defaultValues={about.mission} textarea rows={3} />
          </Section>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <Section title="Our Story">
            <LocalizedFields prefix="story" label="Story" defaultValues={about.story} textarea rows={5} />
          </Section>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <Section title="Story Image & Tech Stack">
            <Field label="Story Image URL" name="story_image_url" defaultValue={about.storyImageUrl} placeholder="https://..." />
            <Field
              label="Tech Stack (comma separated)"
              name="tech_stack"
              defaultValue={about.techStack.join(', ')}
              placeholder="Figma, React, Next.js, ..."
            />
          </Section>
        </div>
        <SubmitButton />
      </form>
    </div>
  )
}
