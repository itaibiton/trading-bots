/**
 * Supabase Edge Function: get-binance-account
 *
 * Fetches live account data from Binance API including:
 * - Account balances (all assets)
 * - Total portfolio value in USD
 * - P&L calculations (unrealized + realized)
 * - Connection status
 *
 * Security: API keys stored in Supabase secrets (not exposed to client)
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { MainClient } from 'npm:binance@3.1.3'

// CORS headers for Next.js frontend
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface BinanceBalance {
  asset: string
  free: string
  locked: string
}

interface AccountInfoResponse {
  balances: BinanceBalance[]
  canTrade: boolean
  canWithdraw: boolean
  canDeposit: boolean
  updateTime: number
  accountType: string
  permissions: string[]
}

interface PriceResponse {
  symbol: string
  price: string
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get API keys from environment
    const apiKey = Deno.env.get('BINANCE_API_KEY')
    const secretKey = Deno.env.get('BINANCE_SECRET_KEY')

    if (!apiKey || !secretKey) {
      throw new Error('Binance API keys not configured. Please set BINANCE_API_KEY and BINANCE_SECRET_KEY in Supabase secrets.')
    }

    // Initialize Binance client (LIVE trading - NOT testnet)
    const client = new MainClient({
      api_key: apiKey,
      api_secret: secretKey,
      testnet: false, // IMPORTANT: Live trading
    })

    // Fetch account information
    console.log('Fetching Binance account info...')
    const accountInfo = await client.getAccountInformation() as AccountInfoResponse

    // Get current prices for USD valuation
    console.log('Fetching current prices...')
    const prices = await client.get24hrChangeStatistics() as PriceResponse[]

    // Create price map for quick lookup
    const priceMap: Record<string, number> = {}
    prices.forEach((ticker) => {
      priceMap[ticker.symbol] = parseFloat(ticker.price)
    })

    // Calculate USD value for each asset
    const balancesWithUsdValue = accountInfo.balances
      .map((balance) => {
        const free = parseFloat(balance.free)
        const locked = parseFloat(balance.locked)
        const total = free + locked

        // Skip if balance is zero
        if (total === 0) return null

        let usdValue = 0

        // USDT and stablecoins are 1:1 with USD
        if (['USDT', 'BUSD', 'USDC', 'TUSD', 'USDP'].includes(balance.asset)) {
          usdValue = total
        } else {
          // Try to find price for ASSET/USDT pair
          const symbol = `${balance.asset}USDT`
          const price = priceMap[symbol]

          if (price) {
            usdValue = total * price
          } else {
            // If no USDT pair, try BTC pair and convert
            const btcSymbol = `${balance.asset}BTC`
            const btcPrice = priceMap[btcSymbol]
            const btcUsdtPrice = priceMap['BTCUSDT']

            if (btcPrice && btcUsdtPrice) {
              usdValue = total * btcPrice * btcUsdtPrice
            }
          }
        }

        return {
          asset: balance.asset,
          free: balance.free,
          locked: balance.locked,
          usdValue: usdValue.toFixed(2),
        }
      })
      .filter((balance) => balance !== null) // Remove null entries
      .filter((balance) => parseFloat(balance!.usdValue) > 0.01) // Filter dust (<$0.01)
      .sort((a, b) => parseFloat(b!.usdValue) - parseFloat(a!.usdValue)) // Sort by USD value

    // Calculate total portfolio value
    const totalBalance = balancesWithUsdValue.reduce((sum, balance) => {
      return sum + parseFloat(balance!.usdValue)
    }, 0)

    // Add percentage to each balance
    const balancesWithPercentage = balancesWithUsdValue.map((balance) => ({
      ...balance!,
      percentage: (parseFloat(balance!.usdValue) / totalBalance) * 100,
    }))

    // TODO: Calculate P&L from trade history (Phase 3)
    // For now, return placeholder values
    const unrealizedPnL = "0.00"
    const realizedPnL = "0.00"
    const totalPnL = "0.00"
    const pnlPercentage = 0

    // Build response
    const response = {
      connected: true,
      timestamp: new Date().toISOString(),
      balances: balancesWithPercentage,
      totalBalance: totalBalance.toFixed(2),
      unrealizedPnL,
      realizedPnL,
      totalPnL,
      pnlPercentage,
      canTrade: accountInfo.canTrade,
      canWithdraw: accountInfo.canWithdraw,
      canDeposit: accountInfo.canDeposit,
      updateTime: accountInfo.updateTime,
      accountType: accountInfo.accountType,
      permissions: accountInfo.permissions,
    }

    console.log('Successfully fetched account data:', {
      totalBalance: response.totalBalance,
      assetCount: balancesWithPercentage.length,
    })

    return new Response(JSON.stringify({ success: true, data: response }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error: any) {
    console.error('Error fetching Binance account data:', error)

    // Parse Binance error
    let errorMessage = 'Failed to fetch account data'
    let errorCode = 500

    if (error.code && error.msg) {
      // Binance API error
      errorMessage = `Binance Error ${error.code}: ${error.msg}`

      // Map specific error codes to HTTP status codes
      if (error.code === -2014 || error.code === -2015) {
        errorCode = 401 // Unauthorized (bad API key)
      } else if (error.code === -1003) {
        errorCode = 429 // Too many requests
      }
    } else if (error.message) {
      errorMessage = error.message
    }

    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage,
        code: error.code,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: errorCode,
      }
    )
  }
})
