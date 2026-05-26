'use client'

import {useTranslations} from 'next-intl'
import ScrollReveal from '@/app/components/ScrollReveal'

const quotes = {
  en: {
    eyebrow: 'Our intention',
    body: 'Every design starts with intention, to help others feel and understand the value we communicate.',
    author: 'DotDeep Studio',
  },
  th: {
    eyebrow: 'ความตั้งใจของพวกเรา',
    body: 'ทุกการออกแบบ เริ่มต้นจากความตั้งใจ เพื่อให้ผู้อื่นรับรู้และเข้าใจคุณค่าที่เราสื่อสารออกไป',
    author: 'DotDeep Studio',
  },
  lo: {
    eyebrow: 'ຄວາມຕັ້ງໃຈຂອງພວກເຮົາ',
    body: 'ທຸກການອອກແບບ ເລີ່ມຈາກຄວາມຕັ້ງໃຈ ທີ່ຢາກໃຫ້ຄົນອື່ນຮັບຮູ້ ແລະ ເຂົ້າໃຈໃນຄຸນຄ່າທີ່ເຮົາສື່ອອກໄປ',
    author: 'DotDeep Studio',
  },
} as const

export default function QuoteSection({locale}: {locale: string}) {
  const l = locale as 'en' | 'th' | 'lo'
  const q = quotes[l] || quotes.en
  useTranslations('common') // ensure provider hookup

  return (
    <section className="relative py-28 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-mesh pointer-events-none" />
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <ScrollReveal>
          <p className={`text-xs uppercase tracking-[0.3em] text-brand-500 mb-8 ${locale === 'lo' ? 'font-lao tracking-normal text-sm normal-case' : ''}`}>
            ✦ &nbsp;{q.eyebrow}&nbsp; ✦
          </p>
        </ScrollReveal>
        <ScrollReveal delay={150}>
          <blockquote
            className={`text-fluid-2xl lg:text-fluid-3xl leading-[1.15] tracking-tight text-on-surface ${
              locale === 'lo' ? 'font-lao leading-[1.4]' : 'font-display'
            }`}
          >
            <span className="text-brand-500/40 text-6xl leading-none align-top">&ldquo;</span>
            {q.body}
            <span className="text-brand-500/40 text-6xl leading-none align-bottom">&rdquo;</span>
          </blockquote>
        </ScrollReveal>
        <ScrollReveal delay={300}>
          <div className="mt-10 flex items-center justify-center gap-3 text-on-surface-muted">
            <span className="w-8 h-px bg-current" />
            <span className="text-xs uppercase tracking-[0.3em]">{q.author}</span>
            <span className="w-8 h-px bg-current" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
