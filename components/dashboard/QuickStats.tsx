/**
 * Quick Stats Component - Redesigned
 *
 * Displays 4 key metrics with:
 * - Unified heights and consistent design
 * - Single color scheme (primary theme)
 * - Micro-interactions and visual feedback
 * - Progress indicators and contextual data
 */

'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { DollarSign, Bot as BotIcon, Activity, TrendingUp, TrendingDown } from 'lucide-react'
import { Sparkline } from './Sparkline'
import { AnimatedCounter } from './AnimatedCounter'
import {
  generateTrendData,
  calculatePercentageChange,
  formatPercentage
} from './utils'
import { useMemo } from 'react'

interface QuickStatsProps {
  paperBalance: number
  totalBots: number
  activeBots: number
  totalPnL: number
  isLoading?: boolean
}

export function QuickStats({
  paperBalance,
  totalBots,
  activeBots,
  totalPnL,
  isLoading = false,
}: QuickStatsProps) {
  // Generate trend data
  const paperBalanceTrend = useMemo(
    () => generateTrendData(paperBalance, 14, 'up'),
    [paperBalance]
  )

  const totalBotsTrend = useMemo(
    () => generateTrendData(totalBots, 7, 'stable'),
    [totalBots]
  )

  const activeBotsTrend = useMemo(
    () => generateTrendData(activeBots, 7, 'up'),
    [activeBots]
  )

  const pnlTrend = useMemo(
    () => generateTrendData(Math.abs(totalPnL), 30, totalPnL >= 0 ? 'up' : 'down'),
    [totalPnL]
  )

  // Calculate trend percentages
  const balanceChange = useMemo(() => {
    if (paperBalanceTrend.length < 8) return 0
    const weekAgo = paperBalanceTrend[paperBalanceTrend.length - 8].value
    return calculatePercentageChange(weekAgo, paperBalance)
  }, [paperBalanceTrend, paperBalance])

  const activeBotChange = useMemo(() => {
    if (activeBotsTrend.length < 2) return 0
    const yesterday = activeBotsTrend[activeBotsTrend.length - 2].value
    return calculatePercentageChange(yesterday, activeBots)
  }, [activeBotsTrend, activeBots])

  const pnlChange = useMemo(() => {
    if (pnlTrend.length < 8) return 0
    const weekAgo = pnlTrend[pnlTrend.length - 8].value
    return calculatePercentageChange(weekAgo, Math.abs(totalPnL))
  }, [pnlTrend, totalPnL])

  const isProfitable = totalPnL >= 0
  const activePercentage = totalBots > 0 ? (activeBots / totalBots) * 100 : 0

  // Define stats with unified color scheme
  const stats = [
    {
      id: 'paper-balance',
      label: 'Paper Balance',
      value: paperBalance,
      icon: DollarSign,
      trend: balanceChange,
      chart: {
        type: 'area' as const,
        data: paperBalanceTrend,
      },
      formatValue: (val: number) => `$${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      subtitle: 'Last 14 days',
      contextInfo: 'Virtual trading balance',
    },
    {
      id: 'total-bots',
      label: 'Total Bots',
      value: totalBots,
      icon: BotIcon,
      trend: null,
      chart: {
        type: 'bar' as const,
        data: totalBotsTrend,
      },
      formatValue: (val: number) => val.toString(),
      subtitle: 'All strategies',
      contextInfo: `${activeBots} active`,
      progress: totalBots > 0 ? (activeBots / totalBots) * 100 : 0,
    },
    {
      id: 'active-bots',
      label: 'Active Bots',
      value: activeBots,
      icon: Activity,
      trend: activeBotChange,
      chart: {
        type: 'line' as const,
        data: activeBotsTrend,
      },
      formatValue: (val: number) => val.toString(),
      subtitle: 'Currently trading',
      contextInfo: `${activePercentage.toFixed(0)}% of total`,
      progress: activePercentage,
    },
    {
      id: 'total-pnl',
      label: 'Total P&L',
      value: totalPnL,
      icon: isProfitable ? TrendingUp : TrendingDown,
      trend: pnlChange,
      chart: {
        type: 'area' as const,
        data: pnlTrend,
      },
      formatValue: (val: number) => {
        const prefix = val < 0 ? '-$' : '$'
        return `${prefix}${Math.abs(val).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      },
      subtitle: 'All time',
      contextInfo: isProfitable ? 'In profit' : 'Currently negative',
      // P&L keeps green/red for universal convention
      isPnL: true,
    },
  ]

  // Loading state
  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-8 rounded-lg" />
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-7 w-28 mb-2" />
              <Skeleton className="h-3 w-20 mb-3" />
              <Skeleton className="h-[60px] w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        const TrendIcon = stat.trend !== null
          ? (stat.trend >= 0 ? TrendingUp : TrendingDown)
          : null

        // Use primary color for all except P&L (which uses green/red)
        const isPnL = stat.isPnL
        const chartColor = isPnL
          ? (isProfitable ? 'hsl(142, 71%, 45%)' : 'hsl(0, 84%, 60%)')
          : 'hsl(var(--primary))'

        const iconColor = isPnL
          ? (isProfitable ? 'text-green-500' : 'text-red-500')
          : 'text-primary'

        const iconBg = isPnL
          ? (isProfitable ? 'bg-green-500/10' : 'bg-red-500/10')
          : 'bg-primary/10'

        const valueColor = isPnL
          ? (isProfitable ? 'text-green-500' : 'text-red-500')
          : ''

        return (
          <div
            key={stat.id}
            style={{
              animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
            }}
          >
            <Card className="group hover:shadow-lg hover:border-primary/50 transition-all duration-300 overflow-hidden relative h-full">
              {/* Subtle gradient background */}
              <div className="absolute inset-0 opacity-[0.03] bg-gradient-to-br from-primary to-transparent" />

              <CardHeader className="pb-3 relative">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                  <div
                    className={`p-2 rounded-lg ${iconBg} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`h-4 w-4 ${iconColor} group-hover:animate-pulse`} />
                  </div>
                </div>
              </CardHeader>

              <CardContent className="relative pb-4">
                {/* Value and Trend */}
                <div className="space-y-1 mb-3">
                  {/* Animated counter - REDUCED from text-3xl to text-2xl */}
                  <div className={`text-2xl font-bold ${valueColor}`}>
                    {stat.id === 'paper-balance' || stat.id === 'total-pnl' ? (
                      <AnimatedCounter
                        value={Math.abs(stat.value)}
                        prefix={stat.value < 0 ? '-$' : '$'}
                        decimals={2}
                        duration={1.5}
                      />
                    ) : (
                      <AnimatedCounter
                        value={stat.value}
                        duration={1.2}
                      />
                    )}
                  </div>

                  {/* Context info - shows on all cards */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{stat.contextInfo}</span>
                    {/* Trend indicator */}
                    {stat.trend !== null && TrendIcon && (
                      <div className="flex items-center gap-0.5">
                        <TrendIcon
                          className={`h-3 w-3 ${
                            stat.trend >= 0 ? 'text-green-500' : 'text-red-500'
                          }`}
                        />
                        <span
                          className={`font-medium ${
                            stat.trend >= 0 ? 'text-green-500' : 'text-red-500'
                          }`}
                        >
                          {formatPercentage(stat.trend)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress bar for applicable cards */}
                {stat.progress !== undefined && (
                  <div className="mb-3">
                    <div className="h-1 bg-primary/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-1000 ease-out"
                        style={{ width: `${stat.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Sparkline chart - UNIFIED to 60px */}
                <div className="h-[60px] mb-2">
                  <Sparkline
                    data={stat.chart.data}
                    color={chartColor}
                    type={stat.chart.type}
                    showGradient={stat.chart.type === 'area'}
                  />
                </div>

                {/* Subtitle */}
                <div className="text-xs text-muted-foreground">
                  {stat.subtitle}
                </div>
              </CardContent>
            </Card>
          </div>
        )
      })}
    </div>
  )
}
