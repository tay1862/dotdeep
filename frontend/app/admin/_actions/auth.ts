'use server'

import {redirect} from 'next/navigation'
import {checkPassword, createAdminSession, destroyAdminSession} from '@/app/lib/admin-auth'

export async function loginAction(_: unknown, formData: FormData) {
  const password = formData.get('password') as string
  if (!checkPassword(password)) {
    return {error: 'Incorrect password'}
  }
  await createAdminSession()
  redirect('/admin')
}

export async function logoutAction() {
  await destroyAdminSession()
  redirect('/admin/login')
}
