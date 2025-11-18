'use client'

import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { MessageSquare, MonitorSmartphone, Rocket } from 'lucide-react'

import { Section } from '@/components/landing/Section'
import { Reveal } from '@/components/ui/reveal'
import { cn } from '@/lib/utils'

const STEPS = [
  {
    title: 'Tell us your goals',
    icon: MessageSquare,
    description: 'Chat with the AI guide about timelines, capital, and your comfort with risk.',
    preview: '“I want to stack Bitcoin every week while limiting drawdowns to under 5%.”',
  },
  {
    title: 'Review your bot',
    icon: MonitorSmartphone,
    description: 'TradingBot assembles the configuration, risk limits, and recommended strategy.',
    preview: 'DCA strategy · $1,000 capital · Paper trading · Stop-loss at 5% · Take profit at 10%',
  },
  {
    title: 'Deploy & monitor',
    icon: Rocket,
    description: 'Launch to paper trading instantly, then graduate to live trading with one click.',
    preview: 'Live dashboard tracks P&L, win rate, and alerts you before thresholds are breached.',
  },
]

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <Section
      eyebrow="How it works"
      title="AI guidance from first question to first trade"
      description="Answer conversational prompts and watch your configuration build in real time. Each step stays pinned so you always know what’s coming next."
    >
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          {STEPS.map((step, index) => (
            <StepCard key={step.title} step={step} index={index} activeStep={activeStep} onVisible={setActiveStep} />
          ))}
        </div>

        <Reveal className="relative">
          <div className="sticky top-24 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 text-left text-slate-200 shadow-2xl shadow-black/40">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Step preview</p>
            <div className="mt-6 min-h-[180px] space-y-4">
              <p className="text-2xl font-semibold text-white">{STEPS[activeStep].title}</p>
              <p className="text-slate-200">{STEPS[activeStep].preview}</p>
            </div>
            <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-300">
              Scroll to reveal each step—this preview stays pinned for uninterrupted storytelling.
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

type StepCardProps = {
  step: (typeof STEPS)[number]
  index: number
  activeStep: number
  onVisible: (index: number) => void
}

function StepCard({ step, index, activeStep, onVisible }: StepCardProps) {
  const { ref, inView } = useInView({ threshold: 0.6 })

  useEffect(() => {
    if (inView) {
      onVisible(index)
    }
  }, [inView, index, onVisible])

  return (
    <div
      ref={ref}
      className={cn(
        'rounded-3xl border border-white/10 p-5 transition-all duration-500',
        activeStep === index ? 'bg-white/10 shadow-2xl shadow-sky-500/20' : 'bg-white/5'
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-2xl border',
            activeStep === index ? 'border-sky-400 bg-sky-400/10' : 'border-white/10 bg-white/10'
          )}
        >
          <step.icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-lg font-semibold">{step.title}</p>
          <p className="text-sm text-slate-300">{step.description}</p>
        </div>
      </div>
    </div>
  )
}

