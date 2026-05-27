import {redirect} from 'next/navigation'
import {defaultLocale} from '@/i18n/config'

// Fallback — next-intl middleware handles this redirect, but keep as safety net
export default function RootPage() {
  redirect(`/${defaultLocale}`)
}
