/**
 * Bot Detail Page
 *
 * Displays detailed information about a specific bot including:
 * - Configuration
 * - Performance metrics
 * - Risk controls
 * - Action buttons (Start/Pause/Stop)
 */

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getBot, updateBotStatus, deleteBot, type Bot } from '@/hooks/useBots'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  ArrowLeft,
  Play,
  Pause,
  Square,
  Trash2,
  TrendingUp,
  TrendingDown,
  Shield,
  Settings,
  Activity,
  DollarSign,
  Clock,
  AlertCircle,
  Loader2,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

interface BotDetailPageProps {
  params: Promise<{ id: string }>
}

const strategyLabels: Record<string, string> = {
  dca: 'Dollar Cost Averaging',
  grid: 'Grid Trading',
  momentum: 'Momentum Trading',
  'mean-reversion': 'Mean Reversion',
}

const statusColors: Record<string, string> = {
  draft: 'bg-gray-500/10 text-gray-500',
  active: 'bg-green-500/10 text-green-500',
  paused: 'bg-yellow-500/10 text-yellow-500',
  stopped: 'bg-gray-500/10 text-gray-500',
  error: 'bg-red-500/10 text-red-500',
}

export default function BotDetailPage({ params }: BotDetailPageProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [bot, setBot] = useState<Bot | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [botId, setBotId] = useState<string | null>(null)

  // Unwrap params
  useEffect(() => {
    params.then(p => setBotId(p.id))
  }, [params])

  // Fetch bot data
  useEffect(() => {
    if (!botId) return

    async function fetchBot() {
      try {
        const data = await getBot(botId!)
        if (!data) {
          setError('Bot not found')
        } else {
          setBot(data)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load bot')
      } finally {
        setIsLoading(false)
      }
    }

    fetchBot()
  }, [botId])

  const handleStatusChange = async (status: Bot['status']) => {
    if (!bot) return
    setIsUpdating(true)

    try {
      const updated = await updateBotStatus(bot.id, status)
      setBot(updated)
      toast({
        title: `Bot ${status}`,
        description: status === 'active'
          ? 'Your bot is now active and will begin trading.'
          : `Your bot has been ${status}.`,
      })
    } catch (err) {
      toast({
        title: 'Failed to update bot',
        description: err instanceof Error ? err.message : 'Unknown error',
        variant: 'destructive',
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async () => {
    if (!bot) return
    setIsUpdating(true)

    try {
      await deleteBot(bot.id)
      toast({
        title: 'Bot deleted',
        description: 'Your bot has been permanently deleted.',
      })
      router.push('/dashboard/bots')
    } catch (err) {
      toast({
        title: 'Failed to delete bot',
        description: err instanceof Error ? err.message : 'Unknown error',
        variant: 'destructive',
      })
      setIsUpdating(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error || !bot) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 mx-auto text-destructive mb-4" />
        <h2 className="text-lg font-semibold">{error || 'Bot not found'}</h2>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/dashboard/bots">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Bots
          </Link>
        </Button>
      </div>
    )
  }

  const isProfitable = bot.total_pnl >= 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard/bots">My Bots</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{bot.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Button asChild variant="ghost" size="sm" className="mb-2">
            <Link href="/dashboard/bots">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Bots
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">{bot.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <Badge className={statusColors[bot.status]}>
              {bot.status.charAt(0).toUpperCase() + bot.status.slice(1)}
            </Badge>
            {bot.trading_mode === 'paper' && (
              <Badge variant="outline">Paper Trading</Badge>
            )}
          </div>
          {bot.description && (
            <p className="text-muted-foreground mt-2">{bot.description}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {bot.status !== 'active' && (
            <Button
              onClick={() => handleStatusChange('active')}
              disabled={isUpdating}
            >
              <Play className="h-4 w-4 mr-2" />
              Start
            </Button>
          )}
          {bot.status === 'active' && (
            <Button
              variant="outline"
              onClick={() => handleStatusChange('paused')}
              disabled={isUpdating}
            >
              <Pause className="h-4 w-4 mr-2" />
              Pause
            </Button>
          )}
          {bot.status !== 'stopped' && (
            <Button
              variant="outline"
              onClick={() => handleStatusChange('stopped')}
              disabled={isUpdating}
            >
              <Square className="h-4 w-4 mr-2" />
              Stop
            </Button>
          )}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="icon" disabled={isUpdating}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Bot</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete "{bot.name}"? This action cannot be undone.
                  All trade history and logs for this bot will also be deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Error Message */}
      {bot.error_message && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
              <div>
                <p className="font-medium text-destructive">Error</p>
                <p className="text-sm text-muted-foreground">{bot.error_message}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Error count: {bot.error_count}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Performance Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total P&L</p>
                <p className={`text-2xl font-bold ${isProfitable ? 'text-green-500' : 'text-red-500'}`}>
                  {isProfitable ? '+' : ''}${bot.total_pnl.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">P&L %</p>
                <p className={`text-2xl font-bold ${isProfitable ? 'text-green-500' : 'text-red-500'}`}>
                  {isProfitable ? '+' : ''}{bot.total_pnl_percentage.toFixed(2)}%
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Trades</p>
                <p className="text-xl font-semibold">{bot.total_trades}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Win Rate</p>
                <p className="text-xl font-semibold">{bot.win_rate.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configuration Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Strategy</span>
              <span className="font-medium">{strategyLabels[bot.strategy_type]}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Trading Pair</span>
              <span className="font-medium">{bot.trading_pair}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Capital</span>
              <span className="font-medium">${bot.capital_allocated.toLocaleString()}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Risk Level</span>
              <Badge variant="outline" className="capitalize">{bot.risk_level}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Risk Controls Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Risk Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Stop Loss</span>
              <span className="font-medium text-red-500">{bot.stop_loss_percentage}%</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Take Profit</span>
              <span className="font-medium text-green-500">{bot.take_profit_percentage}%</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Max Daily Loss</span>
              <span className="font-medium">${bot.max_daily_loss.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Max Position Size</span>
              <span className="font-medium">{bot.max_position_size}%</span>
            </div>
          </CardContent>
        </Card>

        {/* Timing Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Timing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Created</span>
              <span className="font-medium">
                {new Date(bot.created_at).toLocaleDateString()}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Last Active</span>
              <span className="font-medium">
                {bot.last_active_at
                  ? new Date(bot.last_active_at).toLocaleString()
                  : 'Never'}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Next Execution</span>
              <span className="font-medium">
                {bot.next_execution_at
                  ? new Date(bot.next_execution_at).toLocaleString()
                  : 'Not scheduled'}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Last Execution</span>
              <span className="font-medium">
                {bot.last_execution_at
                  ? new Date(bot.last_execution_at).toLocaleString()
                  : 'Never'}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Strategy Parameters */}
      {bot.strategy_params && Object.keys(bot.strategy_params).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Strategy Parameters</CardTitle>
            <CardDescription>
              {strategyLabels[bot.strategy_type]} specific configuration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {Object.entries(bot.strategy_params).map(([key, value]) => (
                <div key={key} className="flex justify-between p-2 bg-muted/50 rounded">
                  <span className="text-sm text-muted-foreground capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="font-medium">{String(value)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
