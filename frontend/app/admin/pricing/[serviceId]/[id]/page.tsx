import {notFound} from 'next/navigation'
import {savePricingItemAction} from '@/app/admin/_actions/pricing'
import {Field, Section, LocalizedFields} from '@/app/admin/_components/FormField'
import {SubmitButton} from '@/app/admin/_components/SubmitButton'
import {getServices} from '@/app/lib/db/services'

const CURRENCIES = ['LAK', 'THB', 'USD']

export default async function PricingItemFormPage({
  params,
}: {
  params: Promise<{serviceId: string; id: string}>
}) {
  const {serviceId, id} = await params
  const isNew = id === 'new'

  const services = await getServices()
  const service = services.find((s) => s.id === serviceId)
  if (!service) notFound()

  const item = isNew ? null : service.pricingItems.find((p) => p.id === id)
  if (!isNew && !item) notFound()

  return (
    <div className="space-y-6">
      <div>
        <p className="text-zinc-500 text-xs mb-1">{service.title.en}</p>
        <h1 className="text-xl font-bold">{isNew ? 'Add Pricing Tier' : 'Edit Pricing Tier'}</h1>
      </div>
      <form action={savePricingItemAction} className="space-y-6">
        <input type="hidden" name="id" value={isNew ? '' : item?.id} />
        <input type="hidden" name="service_id" value={serviceId} />
        <Section title="Tier Info">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Price (leave blank for contact)" name="price" type="number" defaultValue={item?.price != null ? String(item.price) : ''} placeholder="e.g. 500000" />
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Currency</label>
              <select
                name="currency"
                defaultValue={item?.currency ?? 'LAK'}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <Field label="Order Index" name="order_index" type="number" defaultValue={String(item ? 0 : 0)} />
          <div className="flex items-center gap-2">
            <input type="checkbox" name="popular" id="popular" defaultChecked={item?.popular} className="accent-blue-500" />
            <label htmlFor="popular" className="text-sm text-zinc-300">Mark as popular / recommended</label>
          </div>
        </Section>
        <Section title="Name">
          <LocalizedFields prefix="name" label="Tier Name" defaultValues={item?.name} />
        </Section>
        <Section title="Description">
          <LocalizedFields prefix="description" label="Description" defaultValues={item?.description} textarea rows={3} />
        </Section>
        <SubmitButton label={isNew ? 'Add tier' : 'Save changes'} />
      </form>
    </div>
  )
}
