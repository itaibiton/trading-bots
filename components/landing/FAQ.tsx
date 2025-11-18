'use client'

import { Section } from '@/components/landing/Section'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Reveal } from '@/components/ui/reveal'

const FAQS = [
  {
    question: 'Is my money safe?',
    answer:
      'Bots default to paper trading. When you go live, API keys stay encrypted in Supabase and risk controls enforce stop-loss, take-profit, and daily loss caps.',
  },
  {
    question: 'Do I need to code?',
    answer:
      'No. TradingBot asks conversational questions and configures everything automatically. You can still edit any field if you prefer manual control.',
  },
  {
    question: 'What is paper trading?',
    answer:
      'Paper trading simulates live markets with $10k virtual funds so you can validate performance before risking capital.',
  },
  {
    question: 'Can I customize strategies?',
    answer:
      'Yes. Adjust capital allocation, indicators, stop-loss/take-profit, and dozens of advanced parameters per strategy template.',
  },
  {
    question: 'Which exchanges do you support?',
    answer: 'Binance support is live today. Coinbase Advanced Trade and Kraken are on the roadmap.',
  },
  {
    question: 'How much does it cost?',
    answer:
      'Paper trading is free forever. Upgrade to Pro once you want live execution and real-time alerting—no hidden fees.',
  },
]

export function FAQ() {
  return (
    <Section
      id="faq"
      eyebrow="FAQ"
      title="Everything you need to know"
      description="Still unsure? Reach out and we’ll walk you through your first bot."
    >
      <div className="mx-auto max-w-3xl">
        <Accordion type="single" collapsible className="space-y-4">
          {FAQS.map((faq, index) => (
            <Reveal key={faq.question} delay={index * 0.05}>
              <AccordionItem
                value={`faq-${index}`}
                className="rounded-2xl border border-white/10 px-4 text-white data-[state=open]:bg-white/5"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-white">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-slate-300">{faq.answer}</AccordionContent>
              </AccordionItem>
            </Reveal>
          ))}
        </Accordion>
      </div>
    </Section>
  )
}

