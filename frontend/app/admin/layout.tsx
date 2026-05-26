import {redirect} from 'next/navigation'
import {getAdminSession} from '@/app/lib/admin-auth'
import Sidebar from './_components/Sidebar'

export const metadata = {title: 'Admin — DotDeep'}

export default async function AdminLayout({children}: {children: React.ReactNode}) {
  const isAuth = await getAdminSession()
  if (!isAuth) redirect('/admin/login')

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto px-6 py-8">{children}</div>
      </main>
    </div>
  )
}
