import {notFound} from 'next/navigation'
import {saveServiceAction} from '@/app/admin/_actions/services'
import {Field, Section, LocalizedFields} from '@/app/admin/_components/FormField'
import {SubmitButton} from '@/app/admin/_components/SubmitButton'
import {getServices} from '@/app/lib/db/services'

const ICONS = ['palette', 'code', 'layout', 'video', 'megaphone', 'star', 'zap', 'box']

export default async function ServiceFormPage({params}: {params: Promise<{id: string}>}) {
  const {id} = await params
  const isNew = id === 'new'
  let service = null

  if (!isNew) {
    const services = await getServices()
    service = services.find((s) => s.id === id)
    if (!service) notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">{isNew ? 'Add Service' : 'Edit Service'}</h1>
      <form action={saveServiceAction} className="space-y-6">
        <input type="hidden" name="id" value={isNew ? '' : service?.id} />
        <Section title="Basic Info">
          <Field label="Slug (URL)" name="slug" defaultValue={service?.slug} required placeholder="graphic-design" />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Icon</label>
              <select
                name="icon"
                defaultValue={service?.icon ?? 'code'}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {ICONS.map((i) => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <Field label="Order Index" name="order_index" type="number" defaultValue={String(0)} />
          </div>
        </Section>
        <Section title="Title">
          <LocalizedFields prefix="title" label="Title" defaultValues={service?.title} />
        </Section>
        <Section title="Short Description">
          <LocalizedFields prefix="short_description" label="Short Description" defaultValues={service?.shortDescription} textarea rows={2} />
        </Section>
        <Section title="Full Description">
          <LocalizedFields prefix="description" label="Full Description" defaultValues={service?.description} textarea rows={4} />
        </Section>
        <Section title="Features (JSON array or one per line)">
          <textarea
            name="features"
            rows={8}
            defaultValue={JSON.stringify(service?.features ?? [], null, 2)}
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </Section>
        <SubmitButton label={isNew ? 'Add service' : 'Save changes'} />
      </form>
    </div>
  )
}
