/**
 * Recent Bots Component
 *
 * Displays 3-4 most recently created bots.
 * Uses existing BotCard component for consistent display.
 */

'use client'

import Link from 'next/link'
import { BotCard } from '@/components/bots/BotCard'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'
import type { Bot } from '@/hooks/useBots'

interface RecentBotsProps {
  bots: Bot[]
  isLoading?: boolean
  onStart?: (botId: string) => void
  onPause?: (botId: string) => void
  onStop?: (botId: string) => void
}

export function RecentBots({
  bots,
  isLoading = false,
  onStart,
  onPause,
  onStop,
}: RecentBotsProps) {
  // Take only first 3 bots
  const recentBots = bots.slice(0, 3)

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Recent Bots</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="p-6">
              <div className="space-y-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-24" />
                <div className="grid grid-cols-2 gap-4">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
                <Skeleton className="h-10 w-full" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Recent Bots</h2>
        <Button asChild variant="ghost" className="gap-2">
          <Link href="/dashboard/bots">
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {recentBots.map((bot) => (
          <BotCard
            key={bot.id}
            bot={bot}
            onStart={onStart}
            onPause={onPause}
            onStop={onStop}
          />
        ))}
      </div>
    </div>
  )
}
