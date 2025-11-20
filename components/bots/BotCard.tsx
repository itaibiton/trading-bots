/**
 * Bot Card Component
 *
 * Displays a bot's summary information in a card format.
 */

'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Bot as BotIcon,
  Play,
  Pause,
  Square,
  TrendingUp,
  TrendingDown,
  Activity,
  DollarSign,
  MoreVertical
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Bot } from '@/hooks/useBots'

interface BotCardProps {
  bot: Bot
  onStart?: (botId: string) => void
  onPause?: (botId: string) => void
  onStop?: (botId: string) => void
}

const strategyLabels: Record<string, string> = {
  dca: 'DCA',
  grid: 'Grid',
  momentum: 'Momentum',
  'mean-reversion': 'Mean Reversion',
}

const strategyColors: Record<string, string> = {
  dca: 'bg-green-500/10 text-green-500',
  grid: 'bg-blue-500/10 text-blue-500',
  momentum: 'bg-purple-500/10 text-purple-500',
  'mean-reversion': 'bg-orange-500/10 text-orange-500',
}

const statusColors: Record<string, string> = {
  draft: 'bg-gray-500/10 text-gray-500',
  active: 'bg-green-500/10 text-green-500',
  paused: 'bg-yellow-500/10 text-yellow-500',
  stopped: 'bg-gray-500/10 text-gray-500',
  error: 'bg-red-500/10 text-red-500',
}

const statusLabels: Record<string, string> = {
  draft: 'Draft',
  active: 'Active',
  paused: 'Paused',
  stopped: 'Stopped',
  error: 'Error',
}

export function BotCard({ bot, onStart, onPause, onStop }: BotCardProps) {
  const isProfitable = bot.total_pnl >= 0
  const formattedPnl = bot.total_pnl.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  })

  return (
    <Card className="hover:border-primary/50 transition-colors">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <BotIcon className="h-4 w-4" />
            {bot.name}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge className={strategyColors[bot.strategy_type]}>
              {strategyLabels[bot.strategy_type]}
            </Badge>
            <Badge className={statusColors[bot.status]}>
              {statusLabels[bot.status]}
            </Badge>
            {bot.trading_mode === 'paper' && (
              <Badge variant="outline" className="text-xs">
                Paper
              </Badge>
            )}
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/bots/${bot.id}`}>View Details</Link>
            </DropdownMenuItem>
            {bot.status !== 'active' && onStart && (
              <DropdownMenuItem onClick={() => onStart(bot.id)}>
                <Play className="h-4 w-4 mr-2" />
                Start
              </DropdownMenuItem>
            )}
            {bot.status === 'active' && onPause && (
              <DropdownMenuItem onClick={() => onPause(bot.id)}>
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </DropdownMenuItem>
            )}
            {bot.status !== 'stopped' && onStop && (
              <DropdownMenuItem onClick={() => onStop(bot.id)}>
                <Square className="h-4 w-4 mr-2" />
                Stop
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {/* P&L */}
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              {isProfitable ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              Total P&L
            </p>
            <p className={`text-sm font-medium ${isProfitable ? 'text-green-500' : 'text-red-500'}`}>
              {formattedPnl}
              <span className="text-xs ml-1">
                ({isProfitable ? '+' : ''}{bot.total_pnl_percentage.toFixed(2)}%)
              </span>
            </p>
          </div>

          {/* Capital */}
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <DollarSign className="h-3 w-3" />
              Capital
            </p>
            <p className="text-sm font-medium">
              ${bot.capital_allocated.toLocaleString()}
            </p>
          </div>

          {/* Trading Pair */}
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Trading Pair</p>
            <p className="text-sm font-medium">{bot.trading_pair}</p>
          </div>

          {/* Trades */}
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Activity className="h-3 w-3" />
              Trades
            </p>
            <p className="text-sm font-medium">
              {bot.total_trades}
              {bot.win_rate > 0 && (
                <span className="text-xs text-muted-foreground ml-1">
                  ({bot.win_rate.toFixed(0)}% win)
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-4">
          <Button asChild variant="outline" className="w-full">
            <Link href={`/dashboard/bots/${bot.id}`}>
              View Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
