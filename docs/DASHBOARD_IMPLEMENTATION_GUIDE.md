# Dashboard Implementation Guide

**Step-by-step guide to implement the TradingBot Dashboard home page**

---

## Pre-Implementation Checklist

Before starting, verify:

- [x] Database migrations deployed (bots, profiles tables exist)
- [x] `/dashboard/bots` page exists and works
- [x] `BotCard` component exists at `/components/bots/BotCard.tsx`
- [x] `useBots` hook exists at `/hooks/useBots.ts`
- [x] Authentication system is working
- [ ] Read DASHBOARD_PRD.md (full requirements)
- [ ] Review DASHBOARD_VISUAL_SPEC.md (layout reference)
- [ ] Create feature branch: `feature/dashboard-home`

---

## Implementation Steps

### Step 1: Create File Structure (5 minutes)

```bash
# Create dashboard components directory
mkdir -p components/dashboard

# Create dashboard API directory
mkdir -p app/api/dashboard

# Files to create:
touch components/dashboard/StatsCard.tsx
touch components/dashboard/DashboardStats.tsx
touch components/dashboard/RecentBots.tsx
touch components/dashboard/DashboardEmptyState.tsx
touch components/dashboard/DashboardHeader.tsx
touch hooks/useDashboard.ts
touch lib/api/dashboard.ts
touch app/api/dashboard/route.ts
```

### Step 2: Build API Endpoint (1-2 hours)

**File:** `/app/api/dashboard/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { requireNormalAuth } from '@/lib/supabase/auth-utils'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const user = await requireNormalAuth()
    if (!user) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' }},
        { status: 401 }
      )
    }

    const supabase = createClient()

    // Fetch profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('display_name, paper_trading_balance')
      .eq('id', user.id)
      .single()

    if (profileError) throw profileError

    // Fetch all bots for stats
    const { data: allBots, error: botsError } = await supabase
      .from('bots')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_template', false)

    if (botsError) throw botsError

    // Calculate stats
    const activeBots = allBots.filter(b => b.status === 'active').length
    const pausedBots = allBots.filter(b => b.status === 'paused').length
    const stoppedBots = allBots.filter(b => b.status === 'stopped').length

    const totalPnl = allBots.reduce((sum, bot) => sum + (bot.total_pnl || 0), 0)
    const totalCapital = allBots.reduce((sum, bot) => sum + (bot.capital_allocated || 0), 0)
    const totalPnlPercentage = totalCapital > 0 ? (totalPnl / totalCapital) * 100 : 0

    const totalTrades = allBots.reduce((sum, bot) => sum + (bot.total_trades || 0), 0)
    const winningBots = allBots.filter(bot => bot.total_pnl > 0).length
    const winRate = allBots.length > 0 ? (winningBots / allBots.length) * 100 : 0

    // Get recent bots (active first, then by created_at)
    const recentBots = [...allBots]
      .sort((a, b) => {
        // Active bots first
        if (a.status === 'active' && b.status !== 'active') return -1
        if (a.status !== 'active' && b.status === 'active') return 1
        // Then by created_at
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      })
      .slice(0, 4)

    return NextResponse.json({
      success: true,
      data: {
        profile: {
          display_name: profile.display_name,
          paper_trading_balance: profile.paper_trading_balance
        },
        stats: {
          total_balance: profile.paper_trading_balance + totalCapital,
          active_bots_count: activeBots,
          paused_bots_count: pausedBots,
          stopped_bots_count: stoppedBots,
          total_pnl: totalPnl,
          total_pnl_percentage: totalPnlPercentage,
          win_rate: winRate,
          total_trades: totalTrades
        },
        recent_bots: recentBots
      }
    })
  } catch (error) {
    console.error('Dashboard API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'SERVER_ERROR',
          message: error instanceof Error ? error.message : 'Failed to load dashboard'
        }
      },
      { status: 500 }
    )
  }
}
```

### Step 3: Create Dashboard Hook (30 minutes)

**File:** `/hooks/useDashboard.ts`

```typescript
'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Bot } from './useBots'

export interface DashboardStats {
  total_balance: number
  active_bots_count: number
  paused_bots_count: number
  stopped_bots_count: number
  total_pnl: number
  total_pnl_percentage: number
  win_rate: number
  total_trades: number
}

export interface DashboardData {
  profile: {
    display_name: string | null
    paper_trading_balance: number
  }
  stats: DashboardStats
  recent_bots: Bot[]
}

interface UseDashboardReturn {
  data: DashboardData | null
  isLoading: boolean
  error: string | null
  refresh: () => void
}

export function useDashboard(): UseDashboardReturn {
  const [data, setData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDashboard = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/dashboard')
      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error.message)
      }

      setData(result.data)
    } catch (err) {
      console.error('Failed to fetch dashboard:', err)
      setError(err instanceof Error ? err.message : 'Failed to load dashboard')
      setData(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDashboard()
  }, [fetchDashboard])

  return {
    data,
    isLoading,
    error,
    refresh: fetchDashboard
  }
}
```

### Step 4: Build StatsCard Component (30 minutes)

**File:** `/components/dashboard/StatsCard.tsx`

```typescript
'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface StatsCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ReactNode
  loading?: boolean
  valueClassName?: string
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon,
  loading = false,
  valueClassName = ''
}: StatsCardProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-4 w-24" />
          {icon}
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-32 mb-2" />
          <Skeleton className="h-3 w-20" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="hover:border-primary/50 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="h-5 w-5 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <p className={`text-2xl font-bold ${valueClassName}`}>
          {value}
        </p>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  )
}
```

### Step 5: Build DashboardStats Component (30 minutes)

**File:** `/components/dashboard/DashboardStats.tsx`

```typescript
'use client'

import { StatsCard } from './StatsCard'
import { DollarSign, Bot, TrendingUp, TrendingDown, Target } from 'lucide-react'
import type { DashboardStats } from '@/hooks/useDashboard'

interface DashboardStatsProps {
  stats: DashboardStats | null
  loading: boolean
}

export function DashboardStatsGrid({ stats, loading }: DashboardStatsProps) {
  const isProfitable = (stats?.total_pnl || 0) >= 0

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Balance */}
      <StatsCard
        title="Total Balance"
        value={stats ? `$${stats.total_balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '$0.00'}
        subtitle="Paper trading balance"
        icon={<DollarSign />}
        loading={loading}
      />

      {/* Active Bots */}
      <StatsCard
        title="Active Bots"
        value={stats?.active_bots_count || 0}
        subtitle={stats ? `${stats.paused_bots_count} paused, ${stats.stopped_bots_count} stopped` : 'No bots yet'}
        icon={<Bot />}
        loading={loading}
        valueClassName={(stats?.active_bots_count || 0) > 0 ? 'text-green-500' : ''}
      />

      {/* Total P&L */}
      <StatsCard
        title="Total P&L"
        value={stats ? `${isProfitable ? '+' : ''}$${Math.abs(stats.total_pnl).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '$0.00'}
        subtitle={stats ? `${isProfitable ? '+' : ''}${stats.total_pnl_percentage.toFixed(2)}% return` : 'No trades yet'}
        icon={isProfitable ? <TrendingUp /> : <TrendingDown />}
        loading={loading}
        valueClassName={isProfitable ? 'text-green-500' : 'text-red-500'}
      />

      {/* Win Rate */}
      <StatsCard
        title="Win Rate"
        value={stats ? `${stats.win_rate.toFixed(0)}%` : '--'}
        subtitle={stats ? `Across ${stats.total_trades} trades` : 'No trades yet'}
        icon={<Target />}
        loading={loading}
        valueClassName={
          (stats?.win_rate || 0) >= 60 ? 'text-green-500' :
          (stats?.win_rate || 0) >= 40 ? 'text-yellow-500' :
          'text-red-500'
        }
      />
    </div>
  )
}
```

### Step 6: Build RecentBots Component (30 minutes)

**File:** `/components/dashboard/RecentBots.tsx`

```typescript
'use client'

import Link from 'next/link'
import { BotCard } from '@/components/bots/BotCard'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import type { Bot } from '@/hooks/useBots'

interface RecentBotsProps {
  bots: Bot[]
  loading: boolean
}

export function RecentBots({ bots, loading }: RecentBotsProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Bots</h2>
          <Button variant="ghost" asChild disabled>
            <span>View All Bots</span>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-64 rounded-lg border bg-muted animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (bots.length === 0) {
    return null // Empty state shown instead
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Recent Bots</h2>
        <Button variant="ghost" asChild>
          <Link href="/dashboard/bots">
            View All Bots
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {bots.map(bot => (
          <BotCard key={bot.id} bot={bot} />
        ))}
      </div>
    </div>
  )
}
```

### Step 7: Build Empty State Component (30 minutes)

**File:** `/components/dashboard/DashboardEmptyState.tsx`

```typescript
'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Bot, Plus } from 'lucide-react'

interface DashboardEmptyStateProps {
  displayName?: string | null
}

export function DashboardEmptyState({ displayName }: DashboardEmptyStateProps) {
  const firstName = displayName?.split(' ')[0] || 'there'

  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <Bot className="h-16 w-16 text-muted-foreground mb-6" />

        <h2 className="text-2xl font-bold mb-2">
          Welcome to TradingBot, {firstName}!
        </h2>

        <p className="text-muted-foreground mb-8 max-w-md">
          Create your first AI-powered trading bot in minutes with our guided setup.
        </p>

        <div className="space-y-4 mb-8 text-left">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-semibold">
              1
            </span>
            <p className="text-sm text-muted-foreground">
              Choose a strategy template or let AI guide you
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-semibold">
              2
            </span>
            <p className="text-sm text-muted-foreground">
              Configure trading parameters and risk controls
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-semibold">
              3
            </span>
            <p className="text-sm text-muted-foreground">
              Start with paper trading to learn risk-free
            </p>
          </div>
        </div>

        <Button size="lg" asChild>
          <Link href="/bots/create/simple">
            <Plus className="mr-2 h-5 w-5" />
            Create Your First Bot
          </Link>
        </Button>

        <p className="mt-4 text-sm text-muted-foreground">
          <Link href="/docs/strategies" className="hover:underline">
            Learn more about strategies →
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
```

### Step 8: Build Dashboard Header Component (20 minutes)

**File:** `/components/dashboard/DashboardHeader.tsx`

```typescript
'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

interface DashboardHeaderProps {
  displayName?: string | null
}

export function DashboardHeader({ displayName }: DashboardHeaderProps) {
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  const firstName = displayName?.split(' ')[0] || displayName || 'there'

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {getGreeting()}, {firstName}!
        </h1>
        <p className="text-muted-foreground mt-1">
          Here's an overview of your trading bots
        </p>
      </div>
      <Button asChild size="lg">
        <Link href="/bots/create/simple">
          <Plus className="mr-2 h-5 w-5" />
          Create Bot
        </Link>
      </Button>
    </div>
  )
}
```

### Step 9: Update Main Dashboard Page (20 minutes)

**File:** `/app/(protected)/dashboard/page.tsx`

Replace entire content with:

```typescript
'use client'

import { useDashboard } from '@/hooks/useDashboard'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { DashboardStatsGrid } from '@/components/dashboard/DashboardStats'
import { RecentBots } from '@/components/dashboard/RecentBots'
import { DashboardEmptyState } from '@/components/dashboard/DashboardEmptyState'
import { Button } from '@/components/ui/button'
import { RefreshCw, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function DashboardPage() {
  const { data, isLoading, error, refresh } = useDashboard()

  // Error state
  if (error && !isLoading) {
    return (
      <div className="space-y-6 p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
        <Button onClick={refresh} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </div>
    )
  }

  const hasNoBots = data?.recent_bots?.length === 0

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <DashboardHeader displayName={data?.profile.display_name} />

      {/* Stats */}
      <DashboardStatsGrid stats={data?.stats || null} loading={isLoading} />

      {/* Empty State OR Recent Bots */}
      {hasNoBots && !isLoading ? (
        <DashboardEmptyState displayName={data?.profile.display_name} />
      ) : (
        <RecentBots bots={data?.recent_bots || []} loading={isLoading} />
      )}
    </div>
  )
}
```

### Step 10: Test & Polish (1-2 hours)

1. **Manual Testing:**
   ```bash
   npm run dev
   ```
   - Visit http://localhost:3000/dashboard
   - Test as new user (no bots)
   - Create a bot, verify it appears
   - Test stats calculations
   - Test on mobile (Chrome DevTools)

2. **Check Console:**
   - No errors
   - No warnings
   - API calls succeed

3. **Visual QA:**
   - Stats cards align correctly
   - Colors match design (green/red P&L)
   - Spacing is consistent
   - Mobile responsive
   - Loading skeletons appear

4. **Polish:**
   - Add smooth transitions
   - Fix any layout issues
   - Optimize performance
   - Add error boundaries

---

## Testing Checklist

### Functional Tests
- [ ] Dashboard loads successfully
- [ ] Stats display correct values
- [ ] Recent bots show up to 4 bots
- [ ] Empty state appears for new users
- [ ] "Create Bot" button navigates
- [ ] "View All Bots" link works
- [ ] Refresh updates data

### Visual Tests
- [ ] Layout matches DASHBOARD_VISUAL_SPEC.md
- [ ] P&L is green (positive) or red (negative)
- [ ] Icons render correctly
- [ ] Typography is readable
- [ ] Spacing is consistent

### Responsive Tests
- [ ] Mobile (375px): Single column
- [ ] Tablet (768px): Two columns
- [ ] Desktop (1024px+): Four columns
- [ ] No horizontal scroll
- [ ] Touch targets ≥ 44px on mobile

### Performance Tests
- [ ] Page loads < 1 second
- [ ] No Cumulative Layout Shift (CLS = 0)
- [ ] Smooth animations
- [ ] No console errors

---

## Common Issues & Solutions

### Issue 1: Stats showing 0
**Solution:** Check database has bots with data. Add sample bots for testing.

### Issue 2: Empty state not appearing
**Solution:** Verify `data?.recent_bots?.length === 0` condition.

### Issue 3: Layout breaks on mobile
**Solution:** Test with Chrome DevTools mobile view. Check Tailwind breakpoints.

### Issue 4: API returns 401
**Solution:** Check authentication. Verify `requireNormalAuth()` is working.

### Issue 5: Stats calculation wrong
**Solution:** Double-check formulas in API endpoint. Log values to debug.

---

## Deployment

```bash
# 1. Commit changes
git add .
git commit -m "feat: implement dashboard home page with stats and recent bots"

# 2. Push to feature branch
git push origin feature/dashboard-home

# 3. Create PR
gh pr create --title "Dashboard Home Page" --body "Implements stats cards, recent bots section, and empty state for new users. Closes #[issue-number]"

# 4. After review, merge to main
# 5. Deploy to production (automatic via Vercel/etc)
```

---

## Success Criteria

After implementation, verify:
- [ ] Page load time < 1 second
- [ ] New users see empty state and can click "Create Bot"
- [ ] Returning users see stats and recent bots
- [ ] Mobile layout works correctly
- [ ] No console errors
- [ ] Stats are accurate
- [ ] All links navigate correctly

---

## Next Steps After Completion

1. **Update ROADMAP.md**
   - Mark dashboard task as complete
   - Add checkmark and timestamp

2. **Update Documentation**
   - Add screenshots to docs
   - Update user guide

3. **Monitor Metrics**
   - Track page load times
   - Monitor error rates
   - Check user engagement

4. **Iterate Based on Feedback**
   - Collect user feedback
   - Identify pain points
   - Plan improvements

---

## Estimated Time Breakdown

| Task | Time |
|------|------|
| File structure | 5 min |
| API endpoint | 1-2 hours |
| Dashboard hook | 30 min |
| StatsCard | 30 min |
| DashboardStats | 30 min |
| RecentBots | 30 min |
| EmptyState | 30 min |
| Header | 20 min |
| Main page update | 20 min |
| Testing & polish | 1-2 hours |
| **Total** | **4-6 hours** |

---

**You're ready to build! Good luck! 🚀**

For questions or issues, refer to:
- DASHBOARD_PRD.md (detailed requirements)
- DASHBOARD_VISUAL_SPEC.md (layout reference)
- DASHBOARD_SUMMARY.md (quick overview)
