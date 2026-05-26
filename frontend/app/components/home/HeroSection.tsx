'use client'

import {useTranslations} from 'next-intl'
import Link from 'next/link'
import {useEffect, useRef} from 'react'

import SanityImage from '@/app/components/SanityImage'
import ScrollReveal from '@/app/components/ScrollReveal'
import MagneticButton from '@/app/components/MagneticButton'
import useReducedMotion from '@/app/components/useReducedMotion'
import {resolveLocalizedInternalPath} from '@/app/lib/urls'

interface HeroData {
  heroHeading?: {en?: string; th?: string; lo?: string} | null
  heroSubheading?: {en?: string; th?: string; lo?: string} | null
  heroCtaText?: {en?: string; th?: string; lo?: string} | null
  heroCtaLink?: string | null
  heroImage?: {asset?: {_ref?: string}} | null
  stats?: Array<{
    value?: string | null
    suffix?: string | null
    label?: {en?: string | null; th?: string | null; lo?: string | null} | null
  }> | null
}

function KineticMarquee({items}: {items: string[]}) {
  return (
    <div className="relative overflow-hidden border-y border-border-default py-3 lg:py-4 bg-surface/80 backdrop-blur-sm">
      <div className="flex gap-8 lg:gap-12 animate-[marquee_45s_linear_infinite] motion-reduce:animate-none whitespace-nowrap w-max">
        {[...items, ...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-8 lg:gap-12">
            <span
              className={`marquee-kinetic ${i % 2 === 0 ? 'solid' : ''} text-[clamp(0.65rem,1.2vw,0.8rem)] font-display font-semibold leading-none tracking-[0.15em] uppercase`}
            >
              {item}
            </span>
            <span className="text-brand-500 text-[0.6rem] leading-none opacity-60">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function HeroSection({data, locale}: {data: HeroData | null; locale: string}) {
  const t = useTranslations('hero')
  const tGallery = useTranslations('gallery')
  const tCommon = useTranslations('common')
  const l = locale as 'en' | 'th' | 'lo'
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const heading = t('tagline')
  const subheading = t('subtitle')
  const ctaText = data?.heroCtaText?.[l] || t('cta')
  const ctaLink = resolveLocalizedInternalPath(data?.heroCtaLink, locale) || `/${locale}/gallery`
  const serviceItems = [tGallery('graphic'), tGallery('web'), tGallery('uiux'), tGallery('video')]
  const statsItems = (data?.stats || []).map(
    (s) => `${s.value ?? ''}${s.suffix ?? ''} ${s.label?.[l] ?? s.label?.en ?? ''}`.trim(),
  ).filter(Boolean)
  const tickerItems = [...serviceItems, ...statsItems]

  // Localized labels for hero meta + bento
  const labels = {
    en: {
      avail: 'We are ready',
      eyebrow: '(01) Design Studio',
      year: 'Est. 2024',
      services: 'Brand · Web · UI/UX',
      tagline: 'Every detail has meaning',
    },
    th: {
      avail: 'พวกเราพร้อมแล้ว',
      eyebrow: '(01) สตูดิโอออกแบบ',
      year: 'ก่อตั้ง 2024',
      services: 'แบรนด์ · เว็บ · UI/UX',
      tagline: 'ทุกรายละเอียดมีความหมาย',
    },
    lo: {
      avail: 'ພວກເຮົາພ້ອມແລ້ວ',
      eyebrow: '(01) ສະຕູດິໂອອອກແບບ',
      year: 'ກໍ່ຕັ້ງ 2024',
      services: 'ແບຣນ · ເວັບ · UI/UX',
      tagline: 'ທຸກລາຍລະອຽດ ມີຄວາມໝາຍ',
    },
  } as const
  const lbl = labels[l] || labels.en

  // Particle canvas effect
  useEffect(() => {
    if (prefersReducedMotion) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const particles: {x: number; y: number; vx: number; vy: number; r: number; o: number}[] = []
    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.8 + 0.4,
        o: Math.random() * 0.4 + 0.1,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(82, 130, 255, ${p.o})`
        ctx.fill()
      })
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 110) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(82, 130, 255, ${0.08 * (1 - dist / 110)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [prefersReducedMotion])

  // Word-by-word reveal: keep last word as accent, second-to-last optional italic emphasis
  const words = prefersReducedMotion ? [heading] : heading.split(' ')

  return (
    <>
      <section className="relative min-h-[94vh] flex flex-col justify-center overflow-hidden bg-mesh bg-grid">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-70" />

        <div className="relative mx-auto max-w-[1400px] px-6 py-24 lg:py-28 w-full">
          {/* Top meta strip */}
          <ScrollReveal>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-12 lg:mb-16 text-xs uppercase tracking-[0.2em] text-on-surface-muted">
              <div className="flex items-center gap-3">
                <span className={`${locale === 'lo' ? 'font-lao normal-case tracking-normal text-sm' : ''}`}>
                  {lbl.eyebrow}
                </span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-success/10 dark:bg-success/15 border border-success/30 px-3 py-1.5">
                <span className="avail-dot relative inline-block h-1.5 w-1.5 rounded-full bg-success" />
                <span className={`text-success text-[11px] font-semibold ${locale === 'lo' ? 'font-lao tracking-normal normal-case text-xs' : ''}`}>
                  {lbl.avail}
                </span>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Text side */}
            <div className="lg:col-span-7">
              <h1
                className={`mb-8 lg:mb-10 font-bold leading-[0.95] tracking-[-0.02em] ${
                  locale === 'lo'
                    ? 'font-lao text-[clamp(2.5rem,7vw,6rem)] leading-[1.1]'
                    : 'font-display text-[clamp(2.75rem,8vw,7rem)]'
                }`}
              >
                {words.map((word, i) => {
                  const isLast = i === words.length - 1
                  const isSecondLast = i === words.length - 2 && words.length > 2
                  return (
                    <span key={i} className="inline-block overflow-hidden align-bottom" style={{marginRight: '0.22em'}}>
                      <span
                        className="inline-block"
                        style={{
                          animation: prefersReducedMotion
                            ? undefined
                            : `heroSlide 0.7s cubic-bezier(0.16,1,0.3,1) both`,
                          animationDelay: prefersReducedMotion ? undefined : `${i * 70 + 150}ms`,
                        }}
                      >
                        {isLast ? (
                          <span className="text-brand-500">{word}</span>
                        ) : isSecondLast && locale !== 'lo' ? (
                          <span className="font-serif italic font-normal">{word}</span>
                        ) : (
                          word
                        )}
                      </span>
                    </span>
                  )
                })}
              </h1>

              <ScrollReveal delay={400}>
                <p
                  className={`text-lg lg:text-xl text-on-surface-muted max-w-xl mb-10 leading-relaxed ${
                    locale === 'lo' ? 'font-lao' : ''
                  }`}
                >
                  {subheading}
                </p>
              </ScrollReveal>

              <ScrollReveal delay={500}>
                <div className="flex flex-wrap gap-4 items-center">
                  <MagneticButton strength={0.3}>
                    <Link
                      href={ctaLink}
                      data-magnetic
                      className="group relative inline-flex items-center gap-3 rounded-full bg-brand-500 hover:bg-brand-600 text-white pl-7 pr-3 py-3 font-semibold transition-colors active:scale-[0.97] shadow-xl shadow-brand-500/30"
                    >
                      <span>{ctaText}</span>
                      <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/15 group-hover:bg-white/25 transition-colors">
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                          <path d="m5 12 7-7M5 5h7v7" />
                        </svg>
                      </span>
                    </Link>
                  </MagneticButton>

                  <Link
                    href={`/${locale}/contact`}
                    className="group inline-flex items-center gap-2 px-2 py-2 font-medium text-on-surface hover:text-brand-500 transition-colors"
                  >
                    <span className="relative">
                      {t('contact')}
                      <span className="absolute -bottom-1 left-0 w-full h-px bg-current scale-x-100 group-hover:scale-x-0 origin-right transition-transform duration-500" />
                      <span className="absolute -bottom-1 left-0 w-full h-px bg-brand-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 delay-150" />
                    </span>
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-0.5">
                      <path d="m5 10 4-4-4-4" />
                    </svg>
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            {/* Bento visual side */}
            <ScrollReveal delay={200} className="lg:col-span-5">
              <div className="grid grid-cols-6 grid-rows-6 gap-3 aspect-square max-w-md mx-auto lg:max-w-none">
                {/* Main image card (3 cols x 4 rows) */}
                <div className="col-span-4 row-span-4 relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900 dark:to-brand-800 shadow-2xl group">
                  {data?.heroImage?.asset?._ref ? (
                    <SanityImage
                      source={data.heroImage}
                      alt={heading}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="grid grid-cols-3 gap-3 p-8 opacity-30">
                        {[...Array(9)].map((_, i) => (
                          <div
                            key={i}
                            className="aspect-square rounded-xl"
                            style={{background: `oklch(${0.5 + i * 0.04} 0.2 ${264 + i * 10})`}}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white text-xs uppercase tracking-widest opacity-90">
                    Selected work
                  </div>
                </div>

                {/* Year badge (2 cols x 2 rows) */}
                <div className={`col-span-2 row-span-2 rounded-3xl border border-border-default bg-surface-raised flex flex-col items-center justify-center p-4 ${locale === 'lo' ? 'font-lao' : ''}`}>
                  <span className="text-3xl lg:text-4xl font-display font-bold text-brand-500 leading-none">2024</span>
                  <span className="text-[10px] uppercase tracking-widest text-on-surface-muted mt-1">{lbl.year.split(' ')[0]}</span>
                </div>

                {/* Services (2 cols x 2 rows) */}
                <div className={`col-span-2 row-span-2 rounded-3xl bg-brand-500 text-white flex flex-col justify-between p-4`}>
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3" /></svg>
                  <div className={`text-[11px] font-medium leading-snug ${locale === 'lo' ? 'tracking-normal' : 'tracking-wide'}`}>
                    {lbl.services}
                  </div>
                </div>

                {/* Tagline strip (6 cols x 2 rows) */}
                <div className={`col-span-6 row-span-2 rounded-3xl border border-brand-200/50 dark:border-brand-700/40 bg-brand-50/60 dark:bg-brand-950/40 backdrop-blur-sm flex items-center justify-between p-5 ${locale === 'lo' ? 'font-lao' : ''}`}>
                  <span className="text-sm lg:text-base font-medium text-on-surface italic">
                    &ldquo;{lbl.tagline}&rdquo;
                  </span>
                  <div className="flex items-center gap-1 text-brand-500">
                    <span className="w-8 h-px bg-current" />
                    <span className="text-xs uppercase tracking-widest">DotDeep</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-on-surface-muted">
          <span>{tCommon('readMore') || 'scroll'}</span>
          <span className="w-px h-8 bg-border-default relative overflow-hidden">
            <span className="absolute inset-0 bg-brand-500 animate-[scrollDot_2s_ease-in-out_infinite]" />
          </span>
        </div>
      </section>

      <KineticMarquee items={tickerItems} />

      <style>{`
        @keyframes heroSlide {
          from { transform: translateY(110%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
        @keyframes scrollDot {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </>
  )
}
