import { Metadata } from 'next'
import { ResetPassword } from '@/components/auth/ResetPassword'

export const metadata: Metadata = {
  title: 'Set New Password | TradingBot',
  description: 'Set a new password for your TradingBot account',
}

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <ResetPassword />
    </div>
  )
}
