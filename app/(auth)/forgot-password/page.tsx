import { Metadata } from 'next'
import { ForgotPassword } from '@/components/auth/ForgotPassword'

export const metadata: Metadata = {
  title: 'Reset Password | TradingBot',
  description: 'Reset your TradingBot account password',
}

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <ForgotPassword />
    </div>
  )
}
