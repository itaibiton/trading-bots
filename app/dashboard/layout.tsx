import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard | TradingBot',
  description: 'Manage your automated trading bots',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  )
}
