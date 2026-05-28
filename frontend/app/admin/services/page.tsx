import Link from 'next/link'
import {deleteServiceAction} from '@/app/admin/_actions/services'
import {getServices} from '@/app/lib/db/services'

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Services</h1>
        <Link
          href="/admin/services/new"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors"
        >
          + Add service
        </Link>
      </div>
      <div className="space-y-3">
        {services.map((service) => (
          <div key={service.id} className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4">
            <div>
              <p className="text-white font-medium text-sm">{service.title.en}</p>
              <p className="text-zinc-500 text-xs">{service.slug} · {service.pricingItems.length} pricing tiers</p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/admin/services/${service.id}`}
                className="px-3 py-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-md transition-colors"
              >
                Edit
              </Link>
              <form action={deleteServiceAction.bind(null, service.id)}>
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
