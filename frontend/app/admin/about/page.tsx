import {saveAboutAction} from '@/app/admin/_actions/about'
import {Field, Section, LocalizedFields} from '@/app/admin/_components/FormField'
import {SubmitButton} from '@/app/admin/_components/SubmitButton'
import {getAboutData} from '@/app/lib/db/about'

export default async function AboutPage({searchParams}: {searchParams: Promise<{saved?: string}>}) {
  const [about, sp] = await Promise.all([getAboutData(), searchParams])

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">About Page</h1>
      {sp.saved && <p className="text-green-400 text-sm bg-green-400/10 px-4 py-2 rounded-lg">✓ Saved successfully</p>}
      <form action={saveAboutAction} className="space-y-6">
        <Section title="Heading">
          <LocalizedFields prefix="heading" label="Heading" defaultValues={about.heading} />
        </Section>
        <Section title="Vision">
          <LocalizedFields prefix="vision" label="Vision" defaultValues={about.vision} textarea rows={3} />
        </Section>
        <Section title="Mission">
          <LocalizedFields prefix="mission" label="Mission" defaultValues={about.mission} textarea rows={3} />
        </Section>
        <Section title="Our Story">
          <LocalizedFields prefix="story" label="Story" defaultValues={about.story} textarea rows={5} />
        </Section>
        <Section title="Story Image & Tech Stack">
          <Field label="Story Image URL" name="story_image_url" defaultValue={about.storyImageUrl} placeholder="https://..." />
          <Field
            label="Tech Stack (comma separated)"
            name="tech_stack"
            defaultValue={about.techStack.join(', ')}
            placeholder="Figma, React, Next.js, ..."
          />
        </Section>
        <SubmitButton />
      </form>
    </div>
  )
}
