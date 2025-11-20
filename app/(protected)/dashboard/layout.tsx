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
  return <>{children}</>
}
