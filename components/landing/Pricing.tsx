'use client'

import { Check } from 'lucide-react'

import { Section } from '@/components/landing/Section'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { Reveal } from '@/components/ui/reveal'

const PLANS = [
  {
    name: 'Paper',
    price: '$0',
    tagline: 'Build and test with virtual capital.',
    features: ['AI bot builder', 'Paper trading with $10k virtual balance', 'Risk controls & alerts'],
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$29',
    tagline: 'Go live with managed infrastructure.',
    features: ['Everything in Paper', 'Live exchange connections', 'Priority alerting'],
    highlight: true,
  },
  {
    name: 'Team',
    price: 'Custom',
    tagline: 'Collaboration, audit logs, support SLAs.',
    features: ['Multi-user workspaces', 'Compliance exports', 'Dedicated success manager'],
    highlight: false,
  },
]

export function Pricing() {
  return (
    <Section
      id="pricing"
      eyebrow="Pricing"
      title="Start free. Scale when you’re ready."
      description="No lock-in, no surprises. Upgrade only when you need live trading."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {PLANS.map((plan, index) => (
          <Reveal key={plan.name} delay={index * 0.1}>
            <div
              className={`flex h-full flex-col rounded-3xl border p-6 ${
                plan.highlight
                  ? 'border-sky-400/60 bg-sky-500/10 shadow-2xl shadow-sky-500/20'
                  : 'border-white/10 bg-white/5'
              }`}
            >
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{plan.name}</p>
              <p className="mt-4 text-4xl font-semibold text-white">{plan.price}</p>
              <p className="mt-2 text-sm text-slate-300">{plan.tagline}</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-200">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-300" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <MagneticButton
                  className={
                    plan.highlight
                      ? 'w-full rounded-lg bg-sky-500 text-white'
                      : 'w-full rounded-lg border-white/20 bg-transparent'
                  }
                  variant={plan.highlight ? 'default' : 'outline'}
                  asChild
                >
                  <a href="/auth/signup">Start Free</a>
                </MagneticButton>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

