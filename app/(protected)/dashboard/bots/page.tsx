/**
 * Bot Dashboard Page
 *
 * Displays all user's bots with filtering, sorting, and status controls.
 */

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useBots, updateBotStatus, type Bot } from '@/hooks/useBots'
import { BotCard } from '@/components/bots/BotCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Bot as BotIcon, Plus, Search, RefreshCw, Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

export default function BotsDashboard() {
  const { toast } = useToast()
  const [statusFilter, setStatusFilter] = useState<Bot['status'] | 'all'>('all')
  const [strategyFilter, setStrategyFilter] = useState<Bot['strategy_type'] | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'created_at' | 'name' | 'capital_allocated' | 'total_pnl'>('created_at')

  const { bots, isLoading, error, refresh, totalCount } = useBots({
    status: statusFilter,
    strategyType: strategyFilter,
    sortBy,
    sortOrder: sortBy === 'created_at' ? 'desc' : 'asc',
  })

  // Filter by search query (client-side)
  const filteredBots = bots.filter(bot =>
    bot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bot.trading_pair.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleStart = async (botId: string) => {
    try {
      await updateBotStatus(botId, 'active')
      toast({
        title: 'Bot started',
        description: 'Your bot is now active and will begin trading.',
      })
      refresh()
    } catch (err) {
      toast({
        title: 'Failed to start bot',
        description: err instanceof Error ? err.message : 'Unknown error',
        variant: 'destructive',
      })
    }
  }

  const handlePause = async (botId: string) => {
    try {
      await updateBotStatus(botId, 'paused')
      toast({
        title: 'Bot paused',
        description: 'Your bot is paused and will not execute trades.',
      })
      refresh()
    } catch (err) {
      toast({
        title: 'Failed to pause bot',
        description: err instanceof Error ? err.message : 'Unknown error',
        variant: 'destructive',
      })
    }
  }

  const handleStop = async (botId: string) => {
    try {
      await updateBotStatus(botId, 'stopped')
      toast({
        title: 'Bot stopped',
        description: 'Your bot has been stopped.',
      })
      refresh()
    } catch (err) {
      toast({
        title: 'Failed to stop bot',
        description: err instanceof Error ? err.message : 'Unknown error',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>My Bots</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-3xl font-bold tracking-tight">My Bots</h1>
          <p className="text-muted-foreground mt-1">
            Manage and monitor your trading bots
          </p>
        </div>
        <Button asChild>
          <Link href="/bots/create/simple">
            <Plus className="h-4 w-4 mr-2" />
            Create Bot
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search bots..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Status Tabs */}
        <Tabs
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v as Bot['status'] | 'all')}
        >
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="paused">Paused</TabsTrigger>
            <TabsTrigger value="stopped">Stopped</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Strategy Filter */}
        <Select
          value={strategyFilter}
          onValueChange={(v) => setStrategyFilter(v as Bot['strategy_type'] | 'all')}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Strategy" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Strategies</SelectItem>
            <SelectItem value="dca">DCA</SelectItem>
            <SelectItem value="grid">Grid</SelectItem>
            <SelectItem value="momentum">Momentum</SelectItem>
            <SelectItem value="mean-reversion">Mean Reversion</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select
          value={sortBy}
          onValueChange={(v) => setSortBy(v as typeof sortBy)}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="created_at">Newest</SelectItem>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="capital_allocated">Capital</SelectItem>
            <SelectItem value="total_pnl">P&L</SelectItem>
          </SelectContent>
        </Select>

        {/* Refresh */}
        <Button variant="outline" size="icon" onClick={refresh} disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="text-center py-12">
          <p className="text-destructive">{error}</p>
          <Button variant="outline" onClick={refresh} className="mt-4">
            Try Again
          </Button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && filteredBots.length === 0 && (
        <div className="text-center py-12">
          <BotIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          {bots.length === 0 ? (
            <>
              <h3 className="text-lg font-semibold">No bots yet</h3>
              <p className="text-muted-foreground mt-1 mb-4">
                Create your first trading bot to get started
              </p>
              <Button asChild>
                <Link href="/bots/create/simple">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Bot
                </Link>
              </Button>
            </>
          ) : (
            <>
              <h3 className="text-lg font-semibold">No matching bots</h3>
              <p className="text-muted-foreground mt-1">
                Try adjusting your filters or search query
              </p>
            </>
          )}
        </div>
      )}

      {/* Bot Grid */}
      {!isLoading && !error && filteredBots.length > 0 && (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredBots.map((bot) => (
              <BotCard
                key={bot.id}
                bot={bot}
                onStart={handleStart}
                onPause={handlePause}
                onStop={handleStop}
              />
            ))}
          </div>

          {/* Count */}
          <p className="text-sm text-muted-foreground text-center">
            Showing {filteredBots.length} of {totalCount} bots
          </p>
        </>
      )}
    </div>
  )
}
