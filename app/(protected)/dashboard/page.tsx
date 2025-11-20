/**
 * Dashboard Page
 *
 * Main landing page after login.
 * Shows overview stats, recent bots, or empty state for new users.
 */

'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useBots, updateBotStatus } from '@/hooks/useBots'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { QuickStats } from '@/components/dashboard/QuickStats'
import { RecentBots } from '@/components/dashboard/RecentBots'
import { EmptyDashboard } from '@/components/dashboard/EmptyDashboard'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { toast } from 'sonner'

interface UserProfile {
  paper_balance: number
}

export default function DashboardPage() {
  const { bots, isLoading: botsLoading, refresh } = useBots({
    sortBy: 'created_at',
    sortOrder: 'desc',
  })

  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [userName, setUserName] = useState<string | undefined>()
  const [isLoadingProfile, setIsLoadingProfile] = useState(true)

  // Fetch user profile and paper balance
  useEffect(() => {
    async function fetchProfile() {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
          toast.error('Not authenticated')
          return
        }

        setUserName(user.email)

        const { data, error } = await supabase
          .from('profiles')
          .select('paper_balance')
          .eq('id', user.id)
          .single()

        if (error) {
          console.error('Failed to fetch profile:', error)
          // Use default values if profile doesn't exist yet
          setProfile({
            paper_balance: 1000000,
          })
        } else {
          setProfile(data)
        }
      } catch (error) {
        console.error('Error fetching profile:', error)
        toast.error('Failed to load profile data')
      } finally {
        setIsLoadingProfile(false)
      }
    }

    fetchProfile()
  }, [])

  // Calculate stats
  const totalBots = bots.length
  const activeBots = bots.filter((b) => b.status === 'active').length
  const totalPnL = bots.reduce((sum, b) => sum + (b.total_pnl || 0), 0)
  const paperBalance = profile?.paper_balance || 1000000

  // Bot action handlers
  const handleStart = async (botId: string) => {
    try {
      await updateBotStatus(botId, 'active')
      toast.success('Bot started successfully')
      refresh()
    } catch (error) {
      console.error('Failed to start bot:', error)
      toast.error('Failed to start bot')
    }
  }

  const handlePause = async (botId: string) => {
    try {
      await updateBotStatus(botId, 'paused')
      toast.success('Bot paused successfully')
      refresh()
    } catch (error) {
      console.error('Failed to pause bot:', error)
      toast.error('Failed to pause bot')
    }
  }

  const handleStop = async (botId: string) => {
    try {
      await updateBotStatus(botId, 'stopped')
      toast.success('Bot stopped successfully')
      refresh()
    } catch (error) {
      console.error('Failed to stop bot:', error)
      toast.error('Failed to stop bot')
    }
  }

  const isLoading = botsLoading || isLoadingProfile

  return (
    <>
      {/* Header with Breadcrumb */}
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Home</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
        {/* Dashboard Header */}
        <DashboardHeader
          userName={userName}
        />

        {/* Quick Stats - Always Show */}
        <QuickStats
          paperBalance={paperBalance}
          totalBots={totalBots}
          activeBots={activeBots}
          totalPnL={totalPnL}
          isLoading={isLoading}
        />

        {/* Conditional Content: Empty State or Recent Bots */}
        {!isLoading && totalBots === 0 ? (
          <EmptyDashboard />
        ) : (
          <RecentBots
            bots={bots}
            isLoading={isLoading}
            onStart={handleStart}
            onPause={handlePause}
            onStop={handleStop}
          />
        )}
      </div>
    </>
  )
}
