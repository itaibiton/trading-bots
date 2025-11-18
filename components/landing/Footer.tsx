'use client'

import Link from 'next/link'
import { Github, Linkedin } from 'lucide-react'

import { Reveal } from '@/components/ui/reveal'

const NAV = [
  {
    title: 'Product',
    links: [
      { title: 'Features', href: '#ai-demo' },
      { title: 'Pricing', href: '#pricing' },
      { title: 'Docs', href: '/docs' },
    ],
  },
  {
    title: 'Company',
    links: [
      { title: 'About', href: '/about' },
      { title: 'Careers', href: '/careers' },
      { title: 'Press', href: '/press' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { title: 'FAQ', href: '#faq' },
      { title: 'Security', href: '/security' },
      { title: 'Contact', href: '/contact' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-slate-950 px-6 pb-12 pt-16 text-white sm:px-10 lg:px-16">
      <Reveal>
        <div className="mx-auto flex max-w-6xl flex-col gap-8 border-t border-white/10 pt-10 lg:flex-row lg:justify-between">
          <div>
            <p className="text-2xl font-semibold">TradingBot</p>
            <p className="mt-2 text-sm text-slate-400">AI-guided automation with institutional guardrails.</p>
            <div className="mt-4 flex gap-4 text-slate-400">
              <Link href="https://github.com" aria-label="GitHub" className="hover:text-white">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-white">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div className="grid flex-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {NAV.map((section) => (
              <div key={section.title}>
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">{section.title}</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <Link href={link.href} className="hover:text-white">
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} TradingBot. All rights reserved.
        </div>
      </Reveal>
    </footer>
  )
}

