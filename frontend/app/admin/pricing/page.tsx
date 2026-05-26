import Link from 'next/link'
import {getServices} from '@/app/lib/db/services'

export default async function PricingPage() {
  const services = await getServices()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Pricing</h1>
        <p className="text-zinc-500 text-xs">Pricing is managed per service</p>
      </div>
      <div className="space-y-4">
        {services.map((service) => (
          <div key={service.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold text-sm">{service.title.en}</h2>
              <Link
                href={`/admin/pricing/${service.id}/new`}
                className="px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors"
              >
                + Add tier
              </Link>
            </div>
            {service.pricingItems.length === 0 ? (
              <p className="text-zinc-600 text-xs">No pricing tiers yet</p>
            ) : (
              <div className="space-y-2">
                {service.pricingItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2 border-t border-zinc-800">
                    <div>
                      <p className="text-white text-sm">{item.name.en}</p>
                      <p className="text-zinc-500 text-xs">
                        {item.price ? `${item.price.toLocaleString()} ${item.currency}` : 'Contact for price'}
                        {item.popular && <span className="ml-2 text-yellow-400">★ Popular</span>}
                      </p>
                    </div>
                    <Link
                      href={`/admin/pricing/${service.id}/${item.id}`}
                      className="px-3 py-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-md transition-colors"
                    >
                      Edit
                    </Link>
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
