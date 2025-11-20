/**
 * DCA Bot Page
 *
 * Displays and manages DCA (Dollar Cost Averaging) strategy bots.
 * Allows filtering, viewing, and creating DCA bots.
 */

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useBots, updateBotStatus } from '@/hooks/useBots'
import { BotCard } from '@/components/bots/BotCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Repeat, Plus, Search, Loader2, TrendingUp } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function DCABotPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState('')

  // Fetch only DCA strategy bots
  const { bots, isLoading, error, refresh } = useBots({
    strategyType: 'dca',
    sortBy: 'created_at',
    sortOrder: 'desc',
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
        description: 'Your DCA bot is now active.',
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
        description: 'Your DCA bot is paused.',
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
        description: 'Your DCA bot has been stopped.',
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
      {/* Page Header */}
      <div>
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>DCA Bot</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center gap-3 mb-2">
          <Repeat className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">DCA Bot</h1>
        </div>
        <p className="text-muted-foreground">
          Dollar Cost Averaging strategy - Invest fixed amounts at regular intervals
        </p>
      </div>

      {/* Strategy Info Card */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            About DCA Strategy
          </CardTitle>
          <CardDescription>
            Learn how Dollar Cost Averaging works
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm">
            <strong>How it works:</strong> DCA bots automatically buy a fixed amount of cryptocurrency at regular intervals (e.g., $100 every day),
            regardless of the price. This helps reduce the impact of volatility by spreading purchases over time.
          </p>
          <p className="text-sm">
            <strong>Best for:</strong> Long-term investors who want to build positions gradually without timing the market.
          </p>
          <p className="text-sm">
            <strong>Risk Level:</strong> Low to Medium - Consistent buying reduces exposure to single-point-in-time risk.
          </p>
        </CardContent>
      </Card>

      {/* Search & Create */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search DCA bots..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button asChild>
          <Link href="/bots/create/simple?strategy=dca">
            <Plus className="h-4 w-4 mr-2" />
            Create DCA Bot
          </Link>
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
        <Card>
          <CardContent className="text-center py-12">
            <Repeat className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            {bots.length === 0 ? (
              <>
                <h3 className="text-lg font-semibold">No DCA Bots Yet</h3>
                <p className="text-muted-foreground mt-1 mb-4">
                  Create your first DCA bot to start building positions gradually
                </p>
                <Button asChild>
                  <Link href="/bots/create/simple?strategy=dca">
                    <Plus className="h-4 w-4 mr-2" />
                    Create DCA Bot
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold">No Matching Bots</h3>
                <p className="text-muted-foreground mt-1">
                  Try adjusting your search query
                </p>
              </>
            )}
          </CardContent>
        </Card>
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

          <p className="text-sm text-muted-foreground text-center">
            Showing {filteredBots.length} DCA {filteredBots.length === 1 ? 'bot' : 'bots'}
          </p>
        </>
      )}
    </div>
  )
}
