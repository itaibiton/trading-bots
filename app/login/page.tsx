import { Suspense } from 'react'
import { Metadata } from 'next'
import { Login } from '@/components/auth/Login'

export const metadata: Metadata = {
  title: 'Sign In | TradingBot',
  description: 'Sign in to your TradingBot account',
}

function LoginContent() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <Login />
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  )
}
