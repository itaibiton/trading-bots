'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Bot, TrendingUp, Zap, Plus, ExternalLink, RefreshCcw } from 'lucide-react'

import { useAuth } from '@/contexts/AuthProvider'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

type DashboardBot = {
  id: string
  name: string
  strategy_type: string
  status: 'draft' | 'active' | 'paused' | 'stopped' | 'error'
  trading_mode: 'paper' | 'live'
  trading_pair: string
  capital_allocated: number
  risk_level: 'low' | 'medium' | 'high'
  total_pnl: number | null
  total_pnl_percentage: number | null
  created_at: string
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [bots, setBots] = useState<DashboardBot[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    let isMounted = true

    async function fetchBots() {
      if (!user?.id) {
        setBots([])
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)

      const supabase = createClient()
      const { data, error: fetchError } = await supabase
        .from('bots')
        .select(
          'id,name,strategy_type,status,trading_mode,trading_pair,capital_allocated,risk_level,total_pnl,total_pnl_percentage,created_at'
        )
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (!isMounted) return

      if (fetchError) {
        setError(fetchError.message)
        setBots([])
      } else {
        setBots(data || [])
      }

      setLoading(false)
    }

    fetchBots()

    return () => {
      isMounted = false
    }
  }, [user?.id, refreshKey])

  const stats = useMemo(() => {
    const activeBots = bots.filter((bot) => bot.status === 'active').length
    const totalCapital = bots.reduce((sum, bot) => sum + Number(bot.capital_allocated || 0), 0)
    const totalProfit = bots.reduce((sum, bot) => sum + Number(bot.total_pnl || 0), 0)

    return {
      activeBots,
      totalCapital,
      totalProfit,
    }
  }, [bots])

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)

  const formatPercentage = (value: number) =>
    new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(value / 100)

  const handleRefresh = () => setRefreshKey((key) => key + 1)

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
          <p className="text-muted-foreground mt-2">
            {user?.email}
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCcw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Link href="/bots/create/simple">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Bot
            </Button>
          </Link>
        </div>
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

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Bots</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? <Skeleton className="h-7 w-16" /> : stats.activeBots}
            </div>
            <p className="text-xs text-muted-foreground">
              Running right now
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Capital Allocated</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? <Skeleton className="h-7 w-24" /> : formatCurrency(stats.totalCapital)}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all bots
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? <Skeleton className="h-7 w-24" /> : formatCurrency(stats.totalProfit)}
            </div>
            <p className="text-xs text-muted-foreground">
              Lifetime realized P&L
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Bot Management Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Your Trading Bots</h2>
            <p className="text-muted-foreground">
              Create and manage your automated trading strategies
            </p>
          </div>
        </div>

        {error && (
          <Card className="border-destructive/50 bg-destructive/5">
            <CardHeader>
              <CardTitle className="text-destructive">Unable to load bots</CardTitle>
              <CardDescription className="text-destructive">
                {error}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" onClick={handleRefresh}>
                Try again
              </Button>
            </CardContent>
          </Card>
        )}

        {!error && (
          <Card>
            <CardHeader>
              <CardTitle>
                {bots.length
                  ? `You have ${bots.length} ${bots.length > 1 ? 'bots' : 'bot'}`
                  : 'No bots yet'}
              </CardTitle>
              <CardDescription>
                {bots.length
                  ? 'Keep an eye on performance, capital allocation, and risk settings.'
                  : 'Get started by creating your first trading bot. You can configure strategies and risk controls from the AI builder.'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="rounded-lg border p-4">
                      <Skeleton className="h-5 w-48" />
                      <Skeleton className="mt-2 h-4 w-64" />
                      <div className="mt-4 grid gap-2 md:grid-cols-3">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : bots.length === 0 ? (
                <div className="flex items-center justify-center py-10 text-muted-foreground">
                  <div className="text-center space-y-3">
                    <Bot className="h-12 w-12 mx-auto opacity-50" />
                    <p className="text-sm">
                      No bots found yet. Use the AI builder to create your first automated strategy.
                    </p>
                    <Link href="/bots/create/simple">
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Start building
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {bots.map((bot) => (
                    <div key={bot.id} className="rounded-lg border p-4 shadow-sm">
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-xl font-semibold">{bot.name}</h3>
                            <Badge variant="outline" className="text-xs uppercase">
                              {bot.strategy_type}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {bot.trading_pair} • {bot.trading_mode === 'paper' ? 'Paper Trading' : 'Live Trading'}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant={bot.status === 'active' ? 'default' : 'secondary'}>
                            {bot.status}
                          </Badge>
                          <Badge variant="outline">
                            Risk: {bot.risk_level}
                          </Badge>
                        </div>
                      </div>

                      <div className="mt-4 grid gap-4 md:grid-cols-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Capital allocated</p>
                          <p className="text-lg font-semibold">
                            {formatCurrency(Number(bot.capital_allocated) || 0)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total profit</p>
                          <p className={`text-lg font-semibold ${Number(bot.total_pnl || 0) >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                            {formatCurrency(Number(bot.total_pnl || 0))}
                            {bot.total_pnl_percentage !== null && (
                              <span className="text-sm text-muted-foreground ml-2">
                                {formatPercentage(Number(bot.total_pnl_percentage || 0))}
                              </span>
                            )}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Created</p>
                          <p className="text-lg font-semibold">
                            {new Date(bot.created_at).toLocaleDateString(undefined, {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
