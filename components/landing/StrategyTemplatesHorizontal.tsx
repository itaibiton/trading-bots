'use client'

import { useEffect, useRef } from 'react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Reveal } from '@/components/ui/reveal'
import { gsap } from '@/lib/gsap'
import { strategies as STRATEGY_DATA } from '@/lib/mock-data/strategies'

const STRATEGIES = STRATEGY_DATA.slice(0, 4)

const RISK_COPY: Record<string, string> = {
  low: 'Low risk',
  medium: 'Balanced risk',
  high: 'Higher risk',
}

export function StrategyTemplatesHorizontal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const scroller = scrollerRef.current

    if (!container || !scroller) return

    const ctx = gsap.context(() => {
      const maxScroll = scroller.scrollWidth - container.clientWidth
      if (maxScroll <= 0) return

      gsap.to(scroller, {
        x: () => -(scroller.scrollWidth - container.clientWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${scroller.scrollWidth - container.clientWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <section className="relative py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <Reveal>
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-400">Strategy templates</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Choose a proven starting point</h2>
            <p className="mt-4 text-lg text-slate-300">
              Scroll horizontally to preview risk levels, capital requirements, and performance guardrails.
            </p>
          </div>
        </Reveal>
      </div>
      <div ref={containerRef} className="relative h-[80vh] overflow-hidden md:h-screen">
        <div className="sticky top-0 flex h-full items-center">
          <div className="w-full overflow-hidden">
            <div ref={scrollerRef} className="flex w-max gap-8 px-4 md:px-6">
              {STRATEGIES.map((strategy, index) => (
                <Reveal key={strategy.id} delay={index * 0.1}>
                  <Card className="w-[320px] shrink-0 rounded-3xl border border-white/10 bg-white/5 p-1 text-left text-slate-200 backdrop-blur md:w-[400px]">
                    <CardHeader className="space-y-4 rounded-3xl bg-slate-950/40 p-6">
                      <div className="flex items-center justify-between">
                        <span className="text-5xl">{strategy.icon}</span>
                        <Badge variant="outline" className="border-white/30 text-slate-100">
                          {RISK_COPY[strategy.risk] ?? 'Balanced risk'}
                        </Badge>
                      </div>
                      <CardTitle className="text-2xl font-semibold text-white">{strategy.fullName}</CardTitle>
                      <CardDescription className="text-slate-300">{strategy.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 p-6">
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                        <p className="text-xs uppercase tracking-wide text-slate-400">Default guardrails</p>
                        <ul className="mt-3 space-y-2">
                          <li className="flex justify-between text-slate-200">
                            <span>Daily loss cap</span>
                            <span>{strategy.maxDrawdown}%</span>
                          </li>
                          <li className="flex justify-between text-slate-200">
                            <span>Win rate</span>
                            <span>{strategy.winRate}%</span>
                          </li>
                          <li className="flex justify-between text-slate-200">
                            <span>Recommended capital</span>
                            <span>${strategy.recommendedCapital.toLocaleString()}</span>
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-1 text-sm text-slate-300">
                        <p className="text-xs uppercase tracking-wide text-slate-400">Highlights</p>
                        <p>Expected return · {strategy.expectedReturn}% annually</p>
                        <p>Supports {strategy.supportedPairs.slice(0, 2).join(', ')} + more</p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-2 p-6 pt-0 text-xs text-slate-400">
                      <p className="text-slate-200">Customize every parameter before going live.</p>
                      <p>Built-in stop-loss, take-profit, and logging come standard.</p>
                    </CardFooter>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


