/**
 * Portfolio Page
 *
 * Displays user's trading portfolio overview including:
 * - Asset allocation
 * - Performance summary
 * - Holdings and positions
 */

'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Wallet, TrendingUp, TrendingDown, DollarSign, Percent } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function PortfolioPage() {
  const [paperBalance, setPaperBalance] = useState<number>(1000000)
  const [allocated, setAllocated] = useState<number>(0)
  const [totalPnL, setTotalPnL] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchPortfolioData() {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (user) {
          // Fetch profile data
          const { data: profile } = await supabase
            .from('profiles')
            .select('paper_balance, paper_balance_allocated')
            .eq('id', user.id)
            .single()

          if (profile) {
            setPaperBalance(profile.paper_balance || 1000000)
            setAllocated(profile.paper_balance_allocated || 0)
          }

          // Fetch total P&L from bots
          const { data: bots } = await supabase
            .from('bots')
            .select('total_pnl')
            .eq('user_id', user.id)

          if (bots) {
            const pnl = bots.reduce((sum, bot) => sum + (bot.total_pnl || 0), 0)
            setTotalPnL(pnl)
          }
        }
      } catch (error) {
        console.error('Failed to fetch portfolio data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPortfolioData()
  }, [])

  const available = paperBalance - allocated
  const pnlPercentage = paperBalance > 0 ? (totalPnL / paperBalance) * 100 : 0
  const isProfitable = totalPnL >= 0

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
              <BreadcrumbPage>Portfolio</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl font-bold">Portfolio</h1>
        <p className="text-muted-foreground mt-1">
          Overview of your trading portfolio and performance
        </p>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-32 mb-2" />
                <Skeleton className="h-3 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
          {/* Portfolio Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Total Balance */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Wallet className="h-4 w-4" />
                  Total Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${paperBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Paper trading balance
                </p>
              </CardContent>
            </Card>

            {/* Available Balance */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Available
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  ${available.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {((available / paperBalance) * 100).toFixed(1)}% of total
                </p>
              </CardContent>
            </Card>

            {/* Allocated Balance */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Percent className="h-4 w-4" />
                  Allocated
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${allocated.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {((allocated / paperBalance) * 100).toFixed(1)}% in active bots
                </p>
              </CardContent>
            </Card>

            {/* Total P&L */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  {isProfitable ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  Total P&L
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${isProfitable ? 'text-green-500' : 'text-red-500'}`}>
                  {isProfitable ? '+' : ''}${totalPnL.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {isProfitable ? '+' : ''}{pnlPercentage.toFixed(2)}% return
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Coming Soon Section */}
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Details</CardTitle>
              <CardDescription>
                Detailed holdings, transaction history, and performance charts coming soon
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <Wallet className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Feature Under Development</h3>
              <p className="text-muted-foreground mb-4">
                Advanced portfolio analytics and detailed holdings will be available in the next update
              </p>
              <Button asChild>
                <a href="/dashboard">Back to Dashboard</a>
              </Button>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
