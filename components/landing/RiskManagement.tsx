'use client'

import { Gauge, LifeBuoy, Lock, ShieldCheck } from 'lucide-react'

import { Section } from '@/components/landing/Section'
import { Reveal } from '@/components/ui/reveal'

const FEATURES = [
  {
    title: 'Mandatory stop-loss & take-profit',
    description: 'Every bot enforces hard exits so a single candle never wipes your account.',
    Icon: Lock,
  },
  {
    title: 'Position & daily loss caps',
    description: 'Limit exposure per trade and per day. TradingBot pauses bots before limits are breached.',
    Icon: Gauge,
  },
  {
    title: 'Paper trading by default',
    description: 'Start with $10k virtual funds. Graduate to live markets only when you are ready.',
    Icon: LifeBuoy,
  },
  {
    title: 'Compliance & audit logs',
    description: 'Every decision is stored with timestamped rationales for transparent oversight.',
    Icon: ShieldCheck,
  },
]

export function RiskManagement() {
  return (
    <Section
      eyebrow='Risk management'
      title="Safety-first by design"
      description="We treat automation like mission-critical software. Guardrails are baked in—not optional—and every user benefits from institutional-grade protections."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {FEATURES.map((feature, index) => (
          <Reveal key={feature.title} delay={index * 0.1}>
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-6 text-left text-slate-200 shadow-lg shadow-black/30">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/40 bg-emerald-400/10 text-emerald-200">
                  <feature.Icon className="h-6 w-6" />
                </div>
                <p className="text-lg font-semibold text-white">{feature.title}</p>
              </div>
              <p className="mt-3 text-sm text-slate-300">{feature.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

