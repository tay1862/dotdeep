import Link from 'next/link'
import {deleteServiceAction} from '@/app/admin/_actions/services'
import {getServices} from '@/app/lib/db/services'

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">Services</h1>
          <p className="text-zinc-400 text-sm mt-1">Manage your service offerings and pricing</p>
        </div>
        <Link
          href="/admin/services/new"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          <span>+</span> Add service
        </Link>
      </div>
      <div className="grid gap-3">
        {services.map((service) => (
          <div key={service.id} className="flex items-center justify-between bg-zinc-900/50 border border-zinc-800 rounded-xl px-6 py-4 hover:border-zinc-700 transition-colors">
            <div>
              <p className="text-white font-medium">{service.title.en}</p>
              <p className="text-zinc-400 text-sm">{service.slug} · {service.pricingItems.length} pricing tiers</p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/admin/services/${service.id}`}
                className="px-4 py-2 text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors"
              >
                Edit
              </Link>
              <form action={deleteServiceAction.bind(null, service.id)}>
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
    </div>
  )
}
