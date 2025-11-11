import { Metadata } from 'next'
import { Login } from '@/components/auth/Login'

export const metadata: Metadata = {
  title: 'Sign In | TradingBot',
  description: 'Sign in to your TradingBot account',
}

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <Login />
    </div>
  )
}
