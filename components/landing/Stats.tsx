'use client'

import { Section } from '@/components/landing/Section'
import { Counter } from '@/components/ui/counter'
import { Reveal } from '@/components/ui/reveal'

const STATS = [
  { label: 'Average bot creation time', from: 0, to: 5, suffix: ' min' },
  { label: 'Bots deployed successfully', from: 0, to: 95, suffix: '% success' },
  { label: 'Automation coverage', from: 0, to: 24, suffix: '/7 monitoring' },
  { label: 'Cost to start', from: 0, to: 0, prefix: '$' },
]

export function Stats() {
  return (
    <Section
      eyebrow="Proof"
      title="Metrics that convert curious traders"
      description="Hard numbers from the first 1,000 bots show how quickly you can go from idea to automation."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 0.1}>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-white backdrop-blur">
              <Counter
                from={stat.from}
                to={stat.to}
                suffix={stat.suffix}
                prefix={stat.prefix}
                className="text-4xl font-bold"
              />
              <p className="mt-3 text-sm text-slate-400">{stat.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

