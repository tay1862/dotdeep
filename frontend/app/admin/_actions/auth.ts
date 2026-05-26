'use server'

import {redirect} from 'next/navigation'
import {createSupabaseServerClient} from '@/app/lib/supabase-server'

export async function loginAction(_: unknown, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const supabase = await createSupabaseServerClient()
  const {error} = await supabase.auth.signInWithPassword({email, password})

  if (error) {
    return {error: 'Incorrect email or password'}
  }

  redirect('/admin')
}

export async function logoutAction() {
  const supabase = await createSupabaseServerClient()
  await supabase.auth.signOut()
  redirect('/admin/login')
}
