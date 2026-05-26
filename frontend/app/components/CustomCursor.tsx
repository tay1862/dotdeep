'use client'

import {useEffect, useRef, useState} from 'react'

import useReducedMotion from '@/app/components/useReducedMotion'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY
    let frameId = 0

    const move = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`
      frameId = requestAnimationFrame(animate)
    }
    frameId = requestAnimationFrame(animate)

    const onEnter = (e: Event) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [role="button"], input, textarea, select')) {
        setHovering(true)
      }
    }
    const onLeave = (e: Event) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [role="button"], input, textarea, select')) {
        setHovering(false)
      }
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
    }
  }, [reducedMotion])

  return (
    <div className="custom-cursor-wrap" aria-hidden="true">
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-1 -mt-1 h-2 w-2 rounded-full bg-brand-500 mix-blend-difference will-change-transform"
        style={{transition: 'width 200ms, height 200ms, margin 200ms'}}
      />
      <div
        ref={ringRef}
        className={`pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border border-brand-400/50 mix-blend-difference will-change-transform transition-[width,height,margin,border-width] duration-300 ${
          hovering ? '-ml-8 -mt-8 h-16 w-16 border-2 border-brand-500/80' : '-ml-5 -mt-5 h-10 w-10'
        }`}
      />
    </div>
  )
}
