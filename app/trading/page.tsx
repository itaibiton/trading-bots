/**
 * Trading Dashboard Page
 *
 * Displays live Binance trading data and paper trading functionality:
 * - Connection status
 * - Paper trading balance and form
 * - Trade history
 * - Real-time market data
 */

'use client'

import { useState, useEffect, useCallback } from 'react'
import { useBinanceAccount } from '@/hooks/useBinanceAccount'
import { ConnectionStatus } from '@/components/binance/ConnectionStatus'
import { CryptoTicker } from '@/components/trading/CryptoTicker'
import { TradingForm } from '@/components/trading/TradingForm'
import { PaperBalanceCard } from '@/components/trading/PaperBalanceCard'
import { TradeHistory } from '@/components/trading/TradeHistory'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { createClient } from '@/lib/supabase/client'

export default function TradingPage() {
  const {
    connectionStatus,
    accountInfo,
    loading,
    error,
    refresh,
    isRefreshing,
  } = useBinanceAccount({
    autoRefresh: true,
    refreshInterval: 30000, // 30 seconds
  })

  // Paper trading state
  const [paperBalance, setPaperBalance] = useState<number>(10000)
  const [balanceLoading, setBalanceLoading] = useState(true)
  const [tradeRefreshTrigger, setTradeRefreshTrigger] = useState(0)

  // Fetch paper balance from profile
  const fetchPaperBalance = useCallback(async () => {
    setBalanceLoading(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('paper_balance')
          .eq('id', user.id)
          .single()

        if (profile) {
          setPaperBalance(profile.paper_balance || 10000)
        }
      }
    } catch (err) {
      console.error('Failed to fetch paper balance:', err)
    } finally {
      setBalanceLoading(false)
    }
  }, [])

  // Load paper balance on mount
  useEffect(() => {
    fetchPaperBalance()
  }, [fetchPaperBalance])

  // Handle trade completion - refresh balance and history
  const handleTradeComplete = () => {
    fetchPaperBalance()
    setTradeRefreshTrigger(prev => prev + 1)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Trading</h1>
        <p className="text-muted-foreground mt-2">
          Paper trade with real market data from Binance
        </p>
      </div>

      {/* Connection Status */}
      <ConnectionStatus
        status={connectionStatus}
        onRefresh={refresh}
        isRefreshing={isRefreshing}
      />

      {/* Error Alert */}
      {error && !loading && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Real-Time Market Overview */}
      <CryptoTicker />

      {/* Main Content - Two Column Layout */}
      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        {/* Left Column: Trading Form & History */}
        <div className="space-y-6">
          {/* Paper Balance Card */}
          <PaperBalanceCard
            balance={paperBalance}
            loading={balanceLoading}
            onRefresh={fetchPaperBalance}
          />

          {/* Trade History */}
          <TradeHistory refreshTrigger={tradeRefreshTrigger} />
        </div>

        {/* Right Column: Trading Form */}
        <div className="lg:sticky lg:top-6">
          <TradingForm
            paperBalance={paperBalance}
            onTradeComplete={handleTradeComplete}
          />
        </div>
      </div>

      {/* Auto-refresh Info */}
      <div className="text-center text-xs text-muted-foreground">
        Market prices refresh every 10 seconds
      </div>
    </div>
  )
}
