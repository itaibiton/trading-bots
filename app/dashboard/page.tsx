'use client'

import { useAuth } from '@/contexts/AuthProvider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Bot, TrendingUp, Zap, Plus, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
        <p className="text-muted-foreground mt-2">
          {user?.email}
        </p>
      </div>

      {/* Live Trading Dashboard Link */}
      <Card className="border-primary/50 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Live Trading Dashboard</span>
            <Link href="/trading">
              <Button variant="default">
                View Dashboard
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardTitle>
          <CardDescription>
            Monitor your Binance account in real-time with live balance and P&L tracking
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Quick Stats - Placeholder for Phase 2 */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Bots</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              {/* TODO: Connect to real bot data */}
              No bots running yet
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$0.00</div>
            <p className="text-xs text-muted-foreground">
              {/* TODO: Connect to real trading data */}
              All time
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Trades</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              {/* TODO: Connect to real trading data */}
              Currently executing
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Bot Management Section - Placeholder */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Your Trading Bots</h2>
            <p className="text-muted-foreground">
              Create and manage your automated trading strategies
            </p>
          </div>
          <Button disabled>
            <Plus className="mr-2 h-4 w-4" />
            Create Bot
            {/* TODO: Implement bot creation flow in Phase 2 */}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>No bots yet</CardTitle>
            <CardDescription>
              Get started by creating your first trading bot. You'll be able to configure strategies,
              set risk parameters, and connect to crypto exchanges.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-8 text-muted-foreground">
              <div className="text-center space-y-3">
                <Bot className="h-12 w-12 mx-auto opacity-50" />
                <p className="text-sm">
                  Bot management coming in Phase 2
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Strategy Builder Section - Placeholder */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Strategy Builder</h2>
          <p className="text-muted-foreground">
            Design custom trading strategies with our visual builder
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>
              Visual strategy builder with drag-and-drop indicators, conditions, and actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-8 text-muted-foreground">
              <div className="text-center space-y-3">
                <TrendingUp className="h-12 w-12 mx-auto opacity-50" />
                <p className="text-sm">
                  {/* TODO: Implement strategy builder in Phase 2-3 */}
                  Strategy builder interface coming soon
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics - Placeholder */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Performance Metrics</h2>
          <p className="text-muted-foreground">
            Track your bot performance and trading statistics
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Analytics Dashboard</CardTitle>
            <CardDescription>
              Detailed charts and metrics for your trading performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-8 text-muted-foreground">
              <div className="text-center space-y-3">
                <Zap className="h-12 w-12 mx-auto opacity-50" />
                <p className="text-sm">
                  {/* TODO: Implement analytics dashboard in Phase 3 */}
                  Performance analytics coming soon
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
