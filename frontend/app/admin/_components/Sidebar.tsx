'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useState} from 'react'
import {logoutAction} from '@/app/admin/_actions/auth'
import {
  Settings,
  FileText,
  Users,
  Briefcase,
  Image,
  DollarSign,
  ChevronDown,
  ChevronRight,
  LogOut,
  LayoutDashboard,
} from 'lucide-react'

const navSections = [
  {
    title: 'General',
    items: [
      {label: 'Settings', href: '/admin/settings', icon: Settings},
      {label: 'About', href: '/admin/about', icon: FileText},
    ],
  },
  {
    title: 'Content',
    items: [
      {label: 'Team', href: '/admin/team', icon: Users},
      {label: 'Services', href: '/admin/services', icon: Briefcase},
      {label: 'Projects', href: '/admin/projects', icon: Image},
      {label: 'Pricing', href: '/admin/pricing', icon: DollarSign},
    ],
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    General: true,
    Content: true,
  })

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({...prev, [title]: !prev[title]}))
  }

  return (
    <aside className="w-64 shrink-0 bg-zinc-950 border-r border-zinc-800 flex flex-col min-h-screen">
      <div className="px-6 py-5 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="w-5 h-5 text-blue-500" />
          <span className="text-white font-semibold text-lg tracking-tight">DotDeep Admin</span>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navSections.map((section) => (
          <div key={section.title}>
            <button
              onClick={() => toggleSection(section.title)}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider hover:text-zinc-300 transition-colors"
            >
              {section.title}
              {openSections[section.title] ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
            {openSections[section.title] && (
              <div className="mt-1 space-y-0.5">
                {section.items.map((item) => {
                  const active = pathname.startsWith(item.href)
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                        active
                          ? 'bg-blue-600/10 text-blue-400 font-medium border border-blue-600/20'
                          : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </nav>
      <div className="px-3 py-4 border-t border-zinc-800">
        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-red-900/20 hover:border hover:border-red-900/30 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </form>
      </div>
    </aside>
  )
}
