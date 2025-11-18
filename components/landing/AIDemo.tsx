'use client'

import { useEffect, useState } from 'react'
import { Bot, User } from 'lucide-react'

import { Section } from '@/components/landing/Section'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { Reveal } from '@/components/ui/reveal'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type Message = {
  role: 'assistant' | 'user'
  content: string
}

const SCRIPT: Message[] = [
  {
    role: 'assistant',
    content: "Hi! I'm your AI trading copilot. What's your primary goal for this bot?",
  },
  { role: 'user', content: 'I want to accumulate BTC over the next year without watching the charts all day.' },
  {
    role: 'assistant',
    content: 'Got it. How much would you like to allocate? Paper trading is on by default so you can practice risk-free.',
  },
  { role: 'user', content: "Let's start with $1,000 and see how it performs." },
  {
    role: 'assistant',
    content: 'Perfect. I recommend a BTC Dollar Cost Averaging bot with a 5% stop-loss and 10% take-profit.',
  },
]

export function AIDemo() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [visibleMessages, setVisibleMessages] = useState<Message[]>(prefersReducedMotion ? SCRIPT : [SCRIPT[0]])

  useEffect(() => {
    if (prefersReducedMotion) return

    let timeout: NodeJS.Timeout
    SCRIPT.forEach((message, index) => {
      timeout = setTimeout(() => {
        setVisibleMessages((prev) => {
          if (prev.find((existing) => existing.content === message.content)) return prev
          return [...prev, message]
        })
      }, index * 1800)
    })

    return () => clearTimeout(timeout)
  }, [prefersReducedMotion])

  return (
    <Section
      id="ai-demo"
      eyebrow="AI conversation"
      title="Bot builder that feels like texting a pro trader"
      description="Every chatbot message updates the config panel in real time. You can edit any field or hand the controls back to the AI for smart defaults."
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-2xl shadow-black/40">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 p-4">
            <AnimatedBackground variant="grid" className="absolute inset-0 opacity-20" />
            {visibleMessages.map((message) => (
              <Reveal key={message.content} y={20}>
                <div className="relative z-10 flex gap-3 py-2">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      message.role === 'assistant' ? 'bg-sky-500/20 text-sky-200' : 'bg-white/10 text-white'
                    }`}
                  >
                    {message.role === 'assistant' ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                      {message.role === 'assistant' ? 'TradingBot' : 'You'}
                    </p>
                    <p className="mt-1 text-sm text-slate-100">{message.content}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="text-sm text-slate-400">Responses animate in automatically unless reduced-motion is enabled.</p>
        </div>

        <Reveal delay={0.1}>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-2xl shadow-black/50">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Live configuration</p>
            <div className="mt-6 space-y-4 rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="flex items-center justify-between text-sm text-slate-200">
                <span>Strategy</span>
                <strong className="text-white">BTC DCA</strong>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-200">
                <span>Capital</span>
                <strong className="text-white">$1,000</strong>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-200">
                <span>Trading Mode</span>
                <strong className="text-emerald-300">Paper</strong>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-200">
                <span>Stop-loss / Take-profit</span>
                <strong className="text-white">5% / 10%</strong>
              </div>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                <p className="text-xs text-slate-400">Risk Mode</p>
                <p className="text-lg font-semibold text-white">Balanced</p>
                <p className="text-xs text-slate-400">Daily loss capped at $50</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                <p className="text-xs text-slate-400">Auto-monitoring</p>
                <p className="text-lg font-semibold text-white">24/7</p>
                <p className="text-xs text-slate-400">Realtime alerts & logs</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

