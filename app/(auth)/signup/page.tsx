import { Metadata } from 'next'
import { Signup } from '@/components/auth/Signup'

export const metadata: Metadata = {
  title: 'Sign Up | TradingBot',
  description: 'Create your TradingBot account',
}

export default function SignupPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <Signup />
    </div>
  )
}
