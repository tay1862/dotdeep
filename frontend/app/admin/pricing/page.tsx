import Link from 'next/link'
import {deletePricingItemAction} from '@/app/admin/_actions/pricing'
import {getServices} from '@/app/lib/db/services'

export default async function PricingPage() {
  const services = await getServices()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-white tracking-tight">Pricing</h1>
        <p className="text-zinc-400 text-sm mt-1">Manage pricing tiers for each service</p>
      </div>
      <div className="space-y-4">
        {services.map((service) => (
          <div key={service.id} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold">{service.title.en}</h2>
              <Link
                href={`/admin/pricing/${service.id}/new`}
                className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <span>+</span> Add tier
              </Link>
            </div>
            {service.pricingItems.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-zinc-500 text-sm">No pricing tiers yet</p>
              </div>
            ) : (
              <div className="space-y-2">
                {service.pricingItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-3 border-t border-zinc-800">
                    <div>
                      <p className="text-white font-medium">{item.name.en}</p>
                      <p className="text-zinc-400 text-sm">
                        {item.price ? `${item.price.toLocaleString()} ${item.currency}` : 'Contact for price'}
                        {item.popular && <span className="ml-2 text-yellow-400">★ Popular</span>}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/pricing/${service.id}/${item.id}`}
                        className="px-4 py-2 text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors"
                      >
                        Edit
                      </Link>
                      <form action={deletePricingItemAction.bind(null, item.id)}>
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
        ))}
      </div>
    </div>
  )
}
