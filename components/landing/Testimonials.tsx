'use client'

import Image from 'next/image'

import { Section } from '@/components/landing/Section'
import { Reveal } from '@/components/ui/reveal'

const TESTIMONIALS = [
  {
    name: 'Lena Ortiz',
    role: 'Product Manager, NYC',
    quote:
      'I built a DCA bot during lunch and let it run on paper trading while I iterated. Having AI suggest parameters saved me hours.',
    result: '+9.2% paper gains in 30 days',
  },
  {
    name: 'Marco Pereira',
    role: 'Independent Trader, Lisbon',
    quote:
      'Grid trading used to mean spreadsheets and servers. TradingBot gave me live monitoring, alerts, and proper risk controls.',
    result: '12 active bots · zero downtime',
  },
  {
    name: 'Sophie Allen',
    role: 'Data Scientist, London',
    quote:
      'Momentum strategy with automatic stop-loss changed everything. I trust the system because it documents every decision.',
    result: 'Cut drawdowns by 40%',
  },
]

export function Testimonials() {
  return (
    <Section
      eyebrow="Social proof"
      title="Traders of every level trust TradingBot"
      description="From first-time automators to seasoned strategists."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((testimonial, index) => (
          <Reveal key={testimonial.name} delay={index * 0.1}>
            <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-6 text-left text-slate-200 shadow-lg shadow-black/30">
              <div className="flex items-center gap-3">
                <Image
                  src={`https://source.boringavatars.com/beam/80/${encodeURIComponent(testimonial.name)}?colors=0f172a,1f2937,38bdf8`}
                  alt={`${testimonial.name} avatar`}
                  width={48}
                  height={48}
                  className="rounded-full border border-white/10"
                />
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-xs text-slate-400">{testimonial.role}</p>
                </div>
              </div>
              <p className="mt-4 flex-1 text-sm text-slate-200">“{testimonial.quote}”</p>
              <p className="mt-4 text-sm font-semibold text-emerald-300">{testimonial.result}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

