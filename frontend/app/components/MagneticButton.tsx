'use client'

import {useEffect, useRef, type ReactNode} from 'react'

import useReducedMotion from '@/app/components/useReducedMotion'

/**
 * Wrap an interactive element with a subtle magnetic hover that draws the
 * inner element toward the cursor. Disabled on touch and reduced-motion.
 */
export default function MagneticButton({
  children,
  strength = 0.35,
  className = '',
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const wrapRef = useRef<HTMLSpanElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    if (reducedMotion) return
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const inner = el.querySelector<HTMLElement>('[data-magnetic]')
    if (!inner) return

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const dx = e.clientX - (rect.left + rect.width / 2)
      const dy = e.clientY - (rect.top + rect.height / 2)
      inner.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`
    }
    const onLeave = () => {
      inner.style.transform = 'translate(0, 0)'
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [reducedMotion, strength])

  return (
    <span ref={wrapRef} className={`inline-block ${className}`}>
      {children}
    </span>
  )
}
