import {cookies} from 'next/headers'
import {createHmac, timingSafeEqual} from 'crypto'

const SECRET = process.env.ADMIN_SECRET || 'fallback-secret-change-me'
const COOKIE_NAME = 'admin_session'
const MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export function signToken(value: string): string {
  const mac = createHmac('sha256', SECRET).update(value).digest('hex')
  return `${value}.${mac}`
}

export function verifyToken(token: string): boolean {
  const lastDot = token.lastIndexOf('.')
  if (lastDot === -1) return false
  const value = token.slice(0, lastDot)
  const mac = token.slice(lastDot + 1)
  const expected = createHmac('sha256', SECRET).update(value).digest('hex')
  try {
    return timingSafeEqual(Buffer.from(mac, 'hex'), Buffer.from(expected, 'hex'))
  } catch {
    return false
  }
}

export async function getAdminSession(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return false
  return verifyToken(token)
}

export async function createAdminSession(): Promise<void> {
  const cookieStore = await cookies()
  const token = signToken(Date.now().toString())
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: MAX_AGE,
    path: '/',
  })
}

export async function destroyAdminSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

export function checkPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD || ''
  if (!expected || !input) return false
  try {
    const a = Buffer.from(input.padEnd(expected.length))
    const b = Buffer.from(expected)
    return input.length === expected.length && timingSafeEqual(a, b)
  } catch {
    return false
  }
}
