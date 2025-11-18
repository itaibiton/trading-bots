'use client'

import Link from 'next/link'

import { AnimatedBackground } from '@/components/ui/animated-background'
import { Button } from '@/components/ui/button'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { Reveal } from '@/components/ui/reveal'

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-24">
      <AnimatedBackground variant="particles" className="absolute inset-0 opacity-40" />
      <div className="relative z-10 px-4 md:px-6">
        <Reveal>
          <div className="mx-auto max-w-4xl rounded-[40px] border border-white/10 bg-white/5 p-12 text-center text-slate-200 shadow-2xl shadow-emerald-500/20 backdrop-blur">
            <p className="text-sm uppercase tracking-[0.5em] text-sky-400">Ready?</p>
            <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">Build your first AI trading bot for free</h2>
            <p className="mt-4 text-lg text-slate-300">
              Answer a few questions, review the configuration, and deploy with mandatory guardrails. It really takes
              five minutes.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <MagneticButton
                asChild
                size="lg"
                className="min-w-[220px] rounded-lg bg-gradient-to-r from-sky-400 via-emerald-300 to-yellow-300 text-slate-900 font-semibold"
              >
                <Link href="/auth/signup">Start Building Free</Link>
              </MagneticButton>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="min-w-[220px] rounded-lg border-white/20 bg-transparent text-white hover:bg-white/10"
              >
                <Link href="/contact">Talk to our team</Link>
              </Button>
            </div>
            <p className="mt-4 text-xs text-slate-400">No credit card required · Paper trading enabled</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

