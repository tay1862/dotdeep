import {headers} from 'next/headers'
import {redirect} from 'next/navigation'
import {createSupabaseServerClient} from '@/app/lib/supabase-server'
import Sidebar from './_components/Sidebar'

export const metadata = {title: 'Admin — DotDeep'}

export default async function AdminLayout({children}: {children: React.ReactNode}) {
  const h = await headers()
  const isLoginPage = h.get('x-admin-is-login') === '1'

  // Login page renders standalone — no auth check, no sidebar
  if (isLoginPage) return <>{children}</>

  const supabase = await createSupabaseServerClient()
  const {data: {user}} = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto px-6 py-8">{children}</div>
      </main>
    </div>
  )
}
