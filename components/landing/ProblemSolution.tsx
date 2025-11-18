'use client'

import { ArrowRight } from 'lucide-react'

import { Section } from '@/components/landing/Section'
import { Reveal } from '@/components/ui/reveal'

export function ProblemSolution() {
  return (
    <Section
      eyebrow="Why TradingBot"
      title="We solved the hardest parts of algorithmic trading"
      description="Most bot platforms demand code, infrastructure, and a high tolerance for risk. TradingBot wraps powerful automation in an AI-first experience that keeps beginners safe and gives pros leverage."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_auto_1fr]">
        <Reveal className="rounded-3xl border border-white/10 bg-white/5 p-8 text-left text-slate-200 backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">Traditional Way</p>
          <ul className="mt-6 space-y-4 text-slate-300">
            <li>Manual coding or expensive freelancers</li>
            <li>No guardrails—easy to blow up accounts</li>
            <li>Servers, cron jobs, and brittle scripts</li>
            <li>Limited visibility into performance</li>
          </ul>
        </Reveal>

        <Reveal className="hidden h-full items-center justify-center lg:flex">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10">
            <ArrowRight className="h-8 w-8 text-sky-400" />
          </div>
        </Reveal>

        <Reveal className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-left text-emerald-50">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-200">TradingBot Way</p>
          <ul className="mt-6 space-y-4">
            <li>Conversational AI asks the right questions</li>
            <li>Mandatory stop-loss, caps, and paper trading</li>
            <li>Deploy to managed infrastructure in one click</li>
            <li>Live dashboards, alerts, and audit logs</li>
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}

