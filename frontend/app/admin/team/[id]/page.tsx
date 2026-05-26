import {notFound} from 'next/navigation'
import {saveTeamMemberAction} from '@/app/admin/_actions/team'
import {Field, Section, LocalizedFields} from '@/app/admin/_components/FormField'
import {SubmitButton} from '@/app/admin/_components/SubmitButton'
import {getTeam} from '@/app/lib/db/team'

export default async function TeamMemberFormPage({params}: {params: Promise<{id: string}>}) {
  const {id} = await params
  const isNew = id === 'new'
  let member = null

  if (!isNew) {
    const team = await getTeam()
    member = team.find((m) => m.id === id)
    if (!member) notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">{isNew ? 'Add Team Member' : 'Edit Team Member'}</h1>
      <form action={saveTeamMemberAction} className="space-y-6">
        <input type="hidden" name="id" value={isNew ? '' : member?.id} />
        <Section title="Name & Order">
          <div className="grid grid-cols-2 gap-3">
            <Field label="First Name" name="first_name" defaultValue={member?.firstName} required />
            <Field label="Last Name" name="last_name" defaultValue={member?.lastName} required />
          </div>
          <Field label="Order Index" name="order_index" type="number" defaultValue={String(member ? 0 : 0)} />
          <Field label="Picture URL" name="picture_url" defaultValue={member?.pictureUrl} placeholder="https://..." />
        </Section>
        <Section title="Role">
          <LocalizedFields prefix="role" label="Role / Position" defaultValues={member?.role} />
        </Section>
        <Section title="Bio">
          <LocalizedFields prefix="bio" label="Bio" defaultValues={member?.bio} textarea rows={4} />
        </Section>
        <Section title="Social Links">
          <Field label="Facebook" name="facebook" defaultValue={member?.socialLinks?.facebook} placeholder="https://facebook.com/..." />
          <Field label="Instagram" name="instagram" defaultValue={member?.socialLinks?.instagram} placeholder="https://instagram.com/..." />
          <Field label="LinkedIn" name="linkedin" defaultValue={member?.socialLinks?.linkedin} placeholder="https://linkedin.com/in/..." />
          <Field label="TikTok" name="tiktok" defaultValue={member?.socialLinks?.tiktok} placeholder="https://tiktok.com/..." />
          <Field label="WhatsApp" name="whatsapp" defaultValue={member?.socialLinks?.whatsapp} placeholder="https://wa.me/..." />
          <Field label="LINE" name="line" defaultValue={member?.socialLinks?.line} placeholder="https://line.me/ti/p/~..." />
        </Section>
        <SubmitButton label={isNew ? 'Add member' : 'Save changes'} />
      </form>
    </div>
  )
}
