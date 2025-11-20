import { Metadata } from 'next'
import { ResetPassword } from '@/components/auth/ResetPassword'

export const metadata: Metadata = {
  title: 'Set New Password | TradingBot',
  description: 'Set a new password for your TradingBot account',
}

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="mb-4 w-full max-w-md rounded-md border border-yellow-300 bg-yellow-50 p-4">
        <p className="text-sm text-yellow-800">
          <strong>Security Notice:</strong> You are in password recovery mode.
          Please complete the password reset to access your account.
        </p>
      </div>
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold">TradingBot</h1>
        <p className="text-sm text-muted-foreground">Password Reset</p>
      </div>
      <ResetPassword />
    </div>
  )
}
