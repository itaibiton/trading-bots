'use client'

import { type ReactNode } from 'react'

import { Reveal } from '@/components/ui/reveal'
import { cn } from '@/lib/utils'

interface SectionProps {
  title: string
  description?: string
  children: ReactNode
  id?: string
  eyebrow?: string
  className?: string
}

export function Section({ title, description, eyebrow, children, id, className }: SectionProps) {
  return (
    <section id={id} className={cn('py-16 md:py-24', className)}>
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <Reveal>
          <div className="mb-12 text-center">
            {eyebrow ? (
              <p className="text-sm uppercase tracking-[0.4em] text-slate-400">{eyebrow}</p>
            ) : null}
            <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
            {description ? (
              <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">{description}</p>
            ) : null}
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  )
}


