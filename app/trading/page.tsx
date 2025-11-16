/**
 * Trading Dashboard Page
 *
 * Displays live Binance trading data:
 * - Connection status
 * - Account balance (all assets)
 * - P&L (Profit & Loss)
 * - Real-time updates every 30 seconds
 */

'use client'

import { useBinanceAccount } from '@/hooks/useBinanceAccount'
import { ConnectionStatus } from '@/components/binance/ConnectionStatus'
import { AccountBalanceCard } from '@/components/binance/AccountBalanceCard'
import { PnLCard } from '@/components/binance/PnLCard'
import { CryptoTicker } from '@/components/trading/CryptoTicker'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Wallet, TrendingUp, AlertCircle } from 'lucide-react'
import { formatCurrency } from '@/lib/binance/utils'
import { Alert, AlertDescription } from '@/components/ui/alert'

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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Binance Live Trading</h1>
        <p className="text-muted-foreground mt-2">
          Monitor your Binance account in real-time
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

      {/* Quick Stats */}
      {!loading && accountInfo && (
        <div className="grid gap-4 md:grid-cols-3">
          {/* Total Balance */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(accountInfo.totalBalance)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Across {accountInfo.balances.length} assets
              </p>
            </CardContent>
          </Card>

          {/* Total P&L */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total P&L</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {formatCurrency(accountInfo.totalPnL)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {accountInfo.pnlPercentage >= 0 ? '+' : ''}
                {accountInfo.pnlPercentage.toFixed(2)}% all time
              </p>
            </CardContent>
          </Card>

          {/* Account Type */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Account Type</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">
                {accountInfo.accountType}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {accountInfo.permissions.join(', ')}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Real-Time Market Overview */}
      <CryptoTicker />

      {/* Main Content - Two Column Layout */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Left Column: Account Balance */}
        <AccountBalanceCard
          totalBalance={accountInfo?.totalBalance || '0'}
          balances={accountInfo?.balances || []}
          loading={loading}
        />

        {/* Right Column: P&L */}
        <PnLCard
          totalPnL={accountInfo?.totalPnL || '0'}
          unrealizedPnL={accountInfo?.unrealizedPnL || '0'}
          realizedPnL={accountInfo?.realizedPnL || '0'}
          pnlPercentage={accountInfo?.pnlPercentage || 0}
          loading={loading}
        />
      </div>

      {/* Trading Permissions */}
      {!loading && accountInfo && (
        <Card>
          <CardHeader>
            <CardTitle>Account Permissions</CardTitle>
            <CardDescription>Your Binance API key capabilities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <div
                  className={`h-3 w-3 rounded-full ${
                    accountInfo.canTrade ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                />
                <span className="text-sm">Trading</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`h-3 w-3 rounded-full ${
                    accountInfo.canWithdraw ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                />
                <span className="text-sm">Withdraw</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`h-3 w-3 rounded-full ${
                    accountInfo.canDeposit ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                />
                <span className="text-sm">Deposit</span>
              </div>
            </div>

            {!accountInfo.canWithdraw && (
              <p className="text-xs text-muted-foreground mt-4">
                <strong>Security Recommendation:</strong> Withdrawal permission is disabled for safety.
                This is the recommended configuration for trading bots.
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Auto-refresh Info */}
      <div className="text-center text-xs text-muted-foreground">
        Data automatically refreshes every 30 seconds
      </div>
    </div>
  )
}
