/**
 * Auth Layout
 *
 * Centered layout for authentication pages (login, signup, etc.)
 * No sidebar, just centered content.
 */

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Auth | TradingBot',
  description: 'Sign in or create an account',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md px-4">
        {children}
      </div>
    </div>
  )
}
