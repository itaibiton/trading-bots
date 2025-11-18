/**
 * API Route: /api/binance/account
 *
 * Fetches Binance account data with authentication.
 *
 * In development: Calls Binance API directly using .env.local keys
 * In production: Uses Supabase Edge Function with secrets
 */

import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { MainClient } from 'binance'

const isDevelopment = process.env.NODE_ENV === 'development'

async function fetchBinanceDataDirect() {
  // Get API keys from environment (testnet or live)
  const apiKey = process.env.BINANCE_TESTNET_API_KEY || process.env.BINANCE_API_KEY
  const secretKey = process.env.BINANCE_TESTNET_SECRET_KEY || process.env.BINANCE_SECRET_KEY
  const useTestnet = !!(process.env.BINANCE_TESTNET_API_KEY && process.env.BINANCE_TESTNET_SECRET_KEY)

  // Debug: Log what we're finding
  console.log('Environment check:', {
    hasTestnetKey: !!process.env.BINANCE_TESTNET_API_KEY,
    hasTestnetSecret: !!process.env.BINANCE_TESTNET_SECRET_KEY,
    hasLiveKey: !!process.env.BINANCE_API_KEY,
    hasLiveSecret: !!process.env.BINANCE_SECRET_KEY,
    testnetKeyPrefix: process.env.BINANCE_TESTNET_API_KEY?.substring(0, 10),
    useTestnet,
  })

  if (!apiKey || !secretKey) {
    throw new Error('Binance API keys not configured in .env.local')
  }

  console.log(`Calling Binance API (${useTestnet ? 'TESTNET' : 'LIVE'})...`)
  console.log('Keys being passed to MainClient:', {
    api_key: apiKey?.substring(0, 10) + '...',
    api_secret: secretKey?.substring(0, 10) + '...',
    testnet: useTestnet,
  })

  // Initialize Binance client
  const clientConfig = {
    api_key: apiKey,
    api_secret: secretKey,
    testnet: useTestnet,
  }
  console.log('MainClient config:', {
    hasApiKey: !!clientConfig.api_key,
    hasApiSecret: !!clientConfig.api_secret,
    testnet: clientConfig.testnet,
  })
  const client = new MainClient(clientConfig)

  // Fetch account information
  const accountInfo = await client.getAccountInformation()

  // Get current prices for USD valuation
  const prices = await client.get24hrChangeStatistics()

  // Create price map for quick lookup
  const priceMap: Record<string, number> = {}
  Array.isArray(prices) && prices.forEach((ticker: any) => {
    priceMap[ticker.symbol] = parseFloat(ticker.price)
  })

  // Calculate USD value for each asset
  const balancesWithUsdValue = accountInfo.balances
    .map((balance: any) => {
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
    .filter((balance: any) => balance !== null)
    .filter((balance: any) => parseFloat(balance.usdValue) > 0.01) // Filter dust (<$0.01)
    .sort((a: any, b: any) => parseFloat(b.usdValue) - parseFloat(a.usdValue)) // Sort by USD value

  // Calculate total portfolio value
  const totalBalance = balancesWithUsdValue.reduce((sum: number, balance: any) => {
    return sum + parseFloat(balance.usdValue)
  }, 0)

  // Add percentage to each balance
  const balancesWithPercentage = balancesWithUsdValue.map((balance: any) => ({
    ...balance,
    percentage: (parseFloat(balance.usdValue) / totalBalance) * 100,
  }))

  // Return account data (P&L is placeholder for now)
  return {
    connected: true,
    timestamp: new Date().toISOString(),
    balances: balancesWithPercentage,
    totalBalance: totalBalance.toFixed(2),
    unrealizedPnL: "0.00",
    realizedPnL: "0.00",
    totalPnL: "0.00",
    pnlPercentage: 0,
    canTrade: accountInfo.canTrade,
    canWithdraw: accountInfo.canWithdraw,
    canDeposit: accountInfo.canDeposit,
    updateTime: accountInfo.updateTime,
    accountType: accountInfo.accoountType, // Note: Binance SDK has typo in type
    permissions: accountInfo.permissions,
  }
}

async function fetchBinanceDataViaEdgeFunction(supabaseUrl: string, supabaseAnonKey: string) {
  const functionUrl = `${supabaseUrl}/functions/v1/get-binance-account`

  console.log('Calling Edge Function:', functionUrl)

  const response = await fetch(functionUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${supabaseAnonKey}`,
    },
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Edge Function failed')
  }

  return await response.json()
}

export async function GET() {
  try {
    // Create Supabase client with server-side auth
    const supabase = await createClient()

    // Check if user is authenticated
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    let accountData

    if (isDevelopment) {
      // Development: Call Binance API directly using .env.local keys
      console.log('Development mode: Calling Binance API directly')
      accountData = await fetchBinanceDataDirect()
    } else {
      // Production: Use Supabase Edge Function
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Supabase configuration missing')
      }

      console.log('Production mode: Calling Edge Function')
      const result = await fetchBinanceDataViaEdgeFunction(supabaseUrl, supabaseAnonKey)
      accountData = result.data
    }

    return NextResponse.json({
      success: true,
      data: accountData,
    })
  } catch (error: any) {
    console.error('Binance API error:', error)

    // Parse Binance error
    let errorMessage = 'Failed to fetch account data'
    let errorCode = 500

    if (error.code && error.msg) {
      // Binance API error
      errorMessage = `Binance Error ${error.code}: ${error.msg}`

      // Map specific error codes
      if (error.code === -2014 || error.code === -2015) {
        errorCode = 401 // Unauthorized (bad API key)
      } else if (error.code === -1003) {
        errorCode = 429 // Too many requests
      }
    } else if (error.message) {
      errorMessage = error.message
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        code: error.code,
      },
      { status: errorCode }
    )
  }
}

// Enable caching for 30 seconds to prevent excessive API calls
export const revalidate = 30
