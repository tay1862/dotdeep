'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {logoutAction} from '@/app/admin/_actions/auth'

const navItems = [
  {label: 'Settings', href: '/admin/settings', icon: '⚙️'},
  {label: 'About', href: '/admin/about', icon: '📄'},
  {label: 'Team', href: '/admin/team', icon: '👥'},
  {label: 'Services', href: '/admin/services', icon: '🛠'},
  {label: 'Projects', href: '/admin/projects', icon: '🖼'},
  {label: 'Pricing', href: '/admin/pricing', icon: '💰'},
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-56 shrink-0 bg-zinc-900 border-r border-zinc-800 flex flex-col min-h-screen">
      <div className="px-5 py-5 border-b border-zinc-800">
        <span className="text-white font-bold text-base">DotDeep Admin</span>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors ${
                active
                  ? 'bg-zinc-800 text-white font-medium'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="px-3 py-4 border-t border-zinc-800">
        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors"
          >
            <span>🚪</span> Sign out
          </button>
        </form>
      </div>
    </aside>
  )
}
